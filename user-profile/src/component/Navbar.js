import React from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { LOGOUT_SUCCESS } from "../redux/auth/types";

function Navbar() {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch({
      type: LOGOUT_SUCCESS,
    });
  };
  return (
    <div className="flex p-2 bg-purple-700">
      <NavLink to="/" className="mr-2 text-white font-bold text-xl">
        <div>Logo</div>{" "}
      </NavLink>
      <div className="absolute right-0 pr-5">
        <NavLink
          to="/login"
          className="mr-3 text-white  text-xl"
          onClick={handleLogout}
        >
          Logout
        </NavLink>
        <NavLink to="/dashboard" className="text-white  text-xl">
          Dashboard
        </NavLink>
      </div>
    </div>
  );
}

export default Navbar;
