import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axios";
import { auth } from "../config/firebase";
import { toast } from "react-toastify";

export const authUser = createAsyncThunk("auth", async (data) => {
  const response = await axiosInstance.post("/user/auth",
     data,
     {
      headers: {
        Authorization: `Bearer ${data.idToken}`
      }
     }
    )
     
     ;
  return response.data;
});
const initialState = {
  user: {
    uid : "",
    displayName : "",
    email : "",
    photoURL : "",
  },
  isLoggedIn: false,
  isLoading: false,
  error: null,
  referralCode: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.isLoading = false;
      state.error = null;
      state.user.displayName = action.payload.displayName
      ;
      state.user.email = action.payload.email;
      state.user.photoURL = action.payload.photoURL;
      state.user.uid = action.payload.uid;
    },

    logout: (state) => {
      auth.signOut();
      state.isLoggedIn = false;
      state.isLoading = false;
      state.error = null;
      state.user = {
        uid: "",
        displayName: "",
        email: "",
        photoURL: "",
      };
    },
    setReferralCode : (state , action) => {
      state.referralCode = action.payload.referralCode
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(authUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(authUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.referralCode = action.payload.user.referralCode;
        state.user.displayName = action.payload.user.displayName;
        state.user.email = action.payload.user.email;
        state.user.photoURL = action.payload.user.photoURL;
        state.user.uid = action.payload.user.uid;
        toast.success("Login successful");
      })
      .addCase(authUser.rejected, (state, action) => {
        state.isLoading = false;
        auth.signOut();
        state.error = action.error.message;
        state.isLoggedIn = false;
        state.user = null;
        toast.error('Login failed');
      })
  },
});

export const { setReferralCode,login, logout } = authSlice.actions;

export default authSlice.reducer;
