import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getUserDetails, SaveUserDetail } from "../redux/user/action";

function AddUserInfo() {
  const dispatch = useDispatch();
  
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.user);
  const params = useParams();
  const [userDetail, setUserDetail] = useState({});
  useEffect(() => {
    dispatch(getUserDetails(params.userId));
  }, []);
  useEffect(() => {
    setUserDetail(userData);
  }, [userData]);
  const [image, setImage] =  useState("")

  const handleSubmit = (event) => {
    event.preventDefault();
    const form_data = new FormData();
    form_data.append("firstName",userDetail.firstName)
    form_data.append("lastName",userDetail.lastName)
    form_data.append("birthDate",userDetail.birthDate)
    form_data.append("gender",userDetail.gender)
    form_data.append("image",image[0])
    dispatch(SaveUserDetail(form_data))
 clearAll()
 navigate(`/${params.userId}`)

  }
  const clearAll = () => {
setUserDetail({
  firstName : "",
  lastName:"",
  birthDate: "",
  gender: "",
})
  }
  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-purple-700 underline">
          Personal Information
        </h1>
        <form className="mt-6" onSubmit={handleSubmit}>
          <div className="mb-2 flex items-center justify-between">
            <label
              htmlFor="firstName"
              className="block text-sm font-semibold text-gray-800"
            > First Name
            </label>
            <input
            name="firstName"
              type="text"
              value={userDetail.firstName}
              onChange={(e) => setUserDetail({...userDetail,[e.target.name] : e.target.value})}
              className="block w-4/5 px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          
          <div className="mb-2 flex items-center justify-between">
            <label
              htmlFor="lastName"
              className="block text-sm font-semibold text-gray-800"
            > Last Name
            </label>
            <input
            name="lastName"
              type="text"
              value={userDetail.lastName}
              onChange={(e) => setUserDetail({...userDetail,[e.target.name] : e.target.value})}
              className="block w-4/5 px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2 flex items-center justify-between">
            <div
              className="block text-sm font-semibold text-gray-800"
            > Gender
            </div>
            <div className="flex justify-start block w-4/5 px-4 py-2 mt-2 ">
              <div className="form-check form-check-inline">
                <input  onChange={(e) => setUserDetail({...userDetail,gender : e.target.value})}
                className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                 type="radio" name="inlineRadioOptions" id="male" value="male" checked={userDetail?.gender === 'male'} />
                <label className="form-check-label inline-block text-gray-800" htmlFor="male">Male</label>
              </div>
              <div className="form-check form-check-inline">
                <input onChange={(e) => setUserDetail({...userDetail,gender : e.target.value})} 
                className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                 type="radio" name="inlineRadioOptions" id="female" value="female" checked={userDetail?.gender === 'female'}/>
                <label className="form-check-label inline-block text-gray-800" htmlFor="female">Female</label>
              </div>
            </div>
          </div>
          <div className="mb-2 flex items-center justify-between">
            <label
              htmlFor="birthDate"
              className="block text-sm font-semibold text-gray-800"
            > Date of Brith 
            </label>
            <input
            name="birthDate"
              type="date"
              value={userDetail.birthDate}
              onChange={(e) => setUserDetail({...userDetail,[e.target.name] : e.target.value})}
              className="block w-4/5 px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2 flex items-center justify-between">
            <label
              htmlFor="birthDate"
              className="block text-sm font-semibold text-gray-800"
            > Profile Picture
            </label>
            <input
            name="image"
              type="file"
              onChange={(e) => setImage(e.target.files)}
              className="block w-4/5 px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mt-6">
            <button type="submit" className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddUserInfo;
