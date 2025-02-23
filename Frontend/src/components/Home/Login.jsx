import React, { useEffect } from "react";
import GoogleLogin from "./GoogleLogin";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const { isLoggedIn } = useSelector((state) => state.authUser);

  const navigate = useNavigate();
  // Google login handler
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/dashboard");
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className="flex justify-center h-[70vh] w-[100vw] p-10 transition-colors">
      <div>
        <h1 className="text-4xl font-bold text-center mt-12 mb-28">
          Login to continue
        </h1>
        <GoogleLogin />
      </div>
    </div>
  );
};

export default Login;
