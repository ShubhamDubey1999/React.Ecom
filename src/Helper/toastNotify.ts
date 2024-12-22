import { toast, TypeOptions } from "react-toastify";

const toastNotify = (message: string, type: TypeOptions = "success") => {
  toast(message, {
    position: "top-right",
    type: type,
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });
};

export default toastNotify;
