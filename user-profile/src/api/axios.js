import axios from "axios";


export const apiservice = (base,value) => axios.create({
    baseURL: base,
    headers: {
      Authorization : `Bearer `+ value, //process.env.REACT_APP_SUB_KEY
    },
  });
  




export default apiservice;