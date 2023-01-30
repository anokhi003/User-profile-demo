import apiservice from "../../api/axios";
import { message } from "../../component/Toast";
import { GET_USER_DATA } from "./types";

export const SaveUserDetail = (data) => (dispatch) => {
  const token = localStorage.getItem('token')
 
    apiservice(process.env.REACT_APP_API_URL ,token)
      .post("/user/adduserdetail", data)
      .then((res) => {
        if (res.status !== 201) {
          message(res.data.message, { type: "success" });
        } else {
          dispatch({
            type: GET_USER_DATA,
            payload: res.data,
          });
          message(res.data.message, { type: "success" });
        }
      })
      .catch((err) => {
        message(err.response.data.message, { type: "error" });
      });
  };

  export const getUserDetails = (id) => (dispatch) => {
    const token = localStorage.getItem('token')
    apiservice(process.env.REACT_APP_API_URL ,token)
      .get(`/user/detail?id=${id}`)
      .then((res) => {
        if (res.status !== 200) {
          message(res.data.message, { type: "success" });
        } else {
          dispatch({
            type: GET_USER_DATA,
            payload: res.data,
          })
        }
      })
      .catch((err) => {
        message(err.response.data.message, { type: "error" });
      });
  }