import React, { useEffect, useState } from 'react';
import Login from '../components/Login';
import SignUp from '../components/SignUp';
import { useNavigate } from 'react-router-dom';

function AuthPage() {
  const [isSignUpShow, setComponent] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (loggedIn) {
      navigate("/home");
    }
  },);

  const showLogin = () => setComponent(false);
  const showSignUp = () => setComponent(true);

  return (
    <div className="mt-[70px] w-[800px] m-auto border-l-4 h-[400px] py-2.5 px-2">
      <h1 className="text-3xl text-black hover:underline">
        Welcome to The Employee Portal
      </h1>

      <div className="gap-2 flex ml-5 mt-3 justify-start items-center">
        <button
          className="px-3 py-0.5 text-[16px] font-semibold rounded-[15px] bg-gray-300 hover:bg-gray-600 hover:text-white"
          onClick={showLogin}
        >
          Login
        </button>
        <span>Or</span>
        <button
          className="px-3 py-0.5 text-[16px] font-semibold rounded-[15px] bg-gray-300 hover:bg-gray-600 hover:text-white"
          onClick={showSignUp}
        >
          SignUp
        </button>
      </div>

      {isSignUpShow ? <SignUp /> : <Login />}
    </div>
  );
}

export default AuthPage;
