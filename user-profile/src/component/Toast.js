import { toast } from "react-toastify";

export function message(title, args = {}) {
  
  toast(title, {
    position: "top-center",
    type: "info",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    ...args,
  });
}