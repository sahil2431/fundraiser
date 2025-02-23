import "./App.css";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import { ToastContainer } from "react-toastify";

import Layout from "./Layout";
import { Home, Dashboard, Transactions, Donation } from "./pages";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/firebase";
import { login, logout } from "./features/authSlice";
import { Loader2 } from "lucide-react";
function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<Home />} />
        <Route path="/donate/:referralCode" element={<Donation />} />
        <Route path="/" element={<Layout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="transactions" element={<Transactions />} />
        </Route>
      </Route>
    )
  );

  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.authUser);

  useEffect(() => {
    const authentiction = onAuthStateChanged(auth, (user) => {
      
      if (user) {
        user.getIdToken().then((idToken) => {
          dispatch(
            login({
              uid: user.uid,
              displayName: user.displayName,
              email: user.email,
              photoURL: user.photoURL,
            })
          );
        });
      } else {
        dispatch(logout());
      }
    });

    return () => authentiction();
  }, []);

  if (isLoading) {
    return <Loader2 className="mx-auto mt-10 animate-spin" size={64} />;
  }

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={true}
        theme="dark"
      />
    </>
  );
}

export default App;
