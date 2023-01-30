import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { handleResetPassword, signUpUser } from "../redux/auth/action";

function SingUp(props) {
  const [email, setEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignUp = (event) => {
    event.preventDefault();
    
    let error = true;
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!email.match(mailformat)) {
      setErrorMsg("email formate invalid.");
      error = false;
    }
    if (error) {
      setErrorMsg("");
      const data = {
        email: email,
      };
      if (props.value === "signUp") {
        dispatch(signUpUser(data,navigate));
      } else {
        dispatch(handleResetPassword(email, navigate));
      }
    }
  };

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-purple-700 underline">
          {props.value === "signUp" ? "Sign in" : "Reset password"}
        </h1>
        <form className="mt-6" onSubmit={handleSignUp}>
          <div className="mb-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-800"
            >
              Email
            </label>
            <input
              value={email}
              type="email"
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              onChange={(e) => setEmail(e.target.value)}
            />
            <p className="text-red">{errorMsg}</p>
          </div>
          <div className="mt-6">
            <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
              {props.value === "signUp" ? "Sign Up" : "Sent email"}
            </button>
          </div>
        </form>

        <p className="mt-8 text-xs font-light text-center text-gray-700">
          Do have an account?
          <NavLink
            to="/login"
            className="font-medium text-purple-600 hover:underline"
          >
            Login
          </NavLink>
        </p>
      </div>
    </div>
  );
}

export default SingUp;
