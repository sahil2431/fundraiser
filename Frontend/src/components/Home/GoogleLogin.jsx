import React from "react";
import {
  setPersistence,
  GoogleAuthProvider,
  signInWithPopup,
  browserLocalPersistence,
} from "firebase/auth";
import { auth } from "../../config/firebase";
import { useSelector, useDispatch } from "react-redux";
import { authUser } from "../../features/authSlice";

const GoogleLogin = () => {
  const { user } = useSelector((state) => state.authUser);

  const dispatch = useDispatch();
  // Google login handler
  const handleLogin = async () => {
    await setPersistence(auth, browserLocalPersistence);
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const idToken = await result?.user?.getIdToken();
        
        dispatch(authUser({idToken}));
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(errorCode, errorMessage, email, credential);
      });
  };
  return (
    <div>
      <div className="flex flex-col items-center space-y-4">
        <button
          onClick={handleLogin}
          className="w-[400px] py-3 px-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md transition duration-300 transform hover:scale-110 dark:bg-gray-800"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default GoogleLogin;
