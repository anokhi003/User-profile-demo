import apiservice from "../../api/axios";
import { message } from "../../component/Toast";
import { getCookie } from "../../utils/cookies";
import { CHECK_AUTH, LOGIN_SUCCESS, SIGN_UP_USER } from "./types";

export const checkAuth = () => (dispatch) => {
  const checkCookies = getCookie("token");
  if (checkCookies) {
    dispatch({
      type: CHECK_AUTH,
      payload: true,
    });
  }
};
export const loginUser = (data ,navigate) => (dispatch) => {
  apiservice(process.env.REACT_APP_API_URL)
    .post("/auth/login", data)
    .then((res) => {
      if (res.status !== 200) {
        message(res.data.message, { type: "success" });
      } else {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: res.data.data,
        });
        navigate(`/${res.data.data.userdetail.id}`)
        message(res.data.message, { type: "success" });
      }
    })
    .catch((err) => {
      message(err?.response?.data.message, { type: "error" });
    });
};
export const signUpUser = (data,navigate) => (dispatch) => {
  apiservice(process.env.REACT_APP_API_URL)
    .post("/auth/signup", data)
    .then((res) => {
      if (res.status !== 201) {
        message(res.data.message, { type: "error" });
      } else {
        dispatch({
          type: SIGN_UP_USER,
          payload: res.message,
        });
        message(res.data.message, { type: "success" });
        navigate("/");
      }
    })
    .catch((err) => {
      message(err.response.data.message, { type: "error" });
    });
};
export const handleVerification = (value, data, nevigate) => {
  apiservice(process.env.REACT_APP_API_URL, value)
    .post("/user/verify", data)
    .then((res) => {
      if (res.status !== 201) {
        message(res.data.message, { type: "error" });
      } else {
        message(res.data.message, { type: "success" });
        nevigate("/login");
      }
    })
    .catch((err) => {
      message(err.response.data.message, { type: "error" });
    });
};
export const handleResetPassword = (email,navigate) => {
  apiservice(process.env.REACT_APP_API_URL)
  .get(`/auth/resetPassword/${email}`)
  .then((res) => {
    if (res.status !== 201) {
      message(res.data.message, { type: "error" });
    } else {
      message(res.data.message, { type: "success" });
      navigate("/");
    }
  })
  .catch((err) => {
    message(err.response.data.message, { type: "error" });
  });
}
