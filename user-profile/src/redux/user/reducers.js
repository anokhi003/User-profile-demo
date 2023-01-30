import { GET_USER_DATA } from "./types";

const initialState = {
    userData : {},
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_DATA:
        const data = localStorage.getItem("user");
      return {
        ...state,
        userData: action.payload.data,
      };

    default:
      return state;
  }
};
export default user;
