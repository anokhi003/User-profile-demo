import React, { Fragment } from "react";
import Lottie from "lottie-react";
import animationData from "../assets/loginanimation.json";
import { NavLink } from "react-router-dom";
function WaitingPage() {
  return (
    <Fragment>
      <div className="h-screen p-5">
      <h3 className="md:text-3xl text-2xl  font-semibold text-center text-purple-700 my-3"> Set your password using sent verification link.</h3>
        <div className="lg:w-1/3 md:w-2/3 w-full p-5 mx-auto">
          <Lottie animationData={animationData} loop={true} />
        </div>
        <NavLink
              to={`/login`}
              className="mx-auto flex items-center justify-center w-1/3 px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
            > Login
            </NavLink>
      </div>
    </Fragment>
  );
}

export default WaitingPage;
