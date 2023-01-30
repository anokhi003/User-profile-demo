import React, { Fragment, useEffect, useState } from "react";
import moment from 'moment';
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../redux/user/action";
import { NavLink, useParams } from "react-router-dom";
import { AiFillEdit } from "react-icons/ai";
import userProfile from "../assets/images/profile.png";
function HomePage() {
  const { userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const params = useParams();
  const [userDetail, setUserdetail] = useState({});
  useEffect(() => {
    dispatch(getUserDetails(params.userId));
  }, []);
  useEffect(() => {
    setUserdetail(userData);
  }, [userData]);
  return (
    <Fragment>
      <div className="h-screen">
        <div className="md:w-1/2 w-2/3 mx-auto my-6 rounded-sm bg-white p-3">
          <div className="w-[100px] h-[100px] mx-auto my-3 rounded-full">
            <img
              src={userProfile}
              alt="prifile"
              className="object-cover w-[100px] h-[100px] rounded-full"
            />
          </div>
          <h1 className="text-3xl font-semibold text-center text-purple-700 underline">
            Welcome {userDetail?.firstName}
          </h1>
              <div className="m-2 grid grid-cols-3 gap-4">
                <div className="col-span-1 text-purple-800"> Name : </div>
                <p className="col-span-2">
                  {userDetail?.firstName} {userDetail?.lastName}
                </p>
                <div className="col-span-1 text-purple-800"> Email-Id : </div>
                <p className="col-span-2">
                  {userDetail?.email} 
                </p>
                <div className="col-span-1 text-purple-800"> Gender : </div>
                <p className="col-span-2">
                  {userDetail?.gender}
                </p>
                <div className="col-span-1 text-purple-800"> Date of Birth : </div>
                <p className="col-span-2">
                  {moment(userDetail?.dateOfBirth).format('MM-DD-YYYY')}
                </p>
              </div>
          

          <div className="mt-6">
            <NavLink
              to={`/edit/${params.userId}`}
              className="mx-auto flex items-center justify-center w-1/3 px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
            >
              <AiFillEdit className="mr-2" />
              Edit Profile
            </NavLink>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default HomePage;
