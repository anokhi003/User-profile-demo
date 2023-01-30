import { eraseCookie, setCookie } from "../../utils/cookies";
import {
  CHECK_AUTH,
  LOGIN_SUCCESS,
  SIGN_UP_USER,
  LOGOUT_SUCCESS,
} from "./types";

const initialState = {
  isAuthenticated: false,
  isLoading: false,
  isError: false,
  isEmailregister: false,
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case CHECK_AUTH:
      return {
        ...state,
        isAuthenticated: action.payload,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem('user', JSON.stringify(action.payload.userdetail));
      localStorage.setItem('token', JSON.stringify(action.payload.token));

      setCookie("token", action.payload.token, 1);
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
      };
    case SIGN_UP_USER:
      return {
        ...state,
        isEmailregister: true,
      };
    case LOGOUT_SUCCESS:
      eraseCookie("token");
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};
export default auth;
