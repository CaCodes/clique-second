import { hideToast } from "../redux/slices/toastSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Toast() {
  const [showToast, setShowToast] = useState(false);
  const { status, message } = useSelector((state) => state.toast);
  const dispatch = useDispatch();
  useEffect(() => {
    if (message && message !== "" && message !== null) {
      setShowToast(true);
      switch (status) {
        case "success":
          toast.success(message);
          break;
        case "error":
          toast.error(message);
          break;
        default:
          toast(message);
          break;
      }
      setTimeout(() => {
        setShowToast(false);
        dispatch(hideToast());
      }, 5000);
    } else setShowToast(false);
    return () => clearTimeout(5000);
  }, [message, status, dispatch]);

  return (
    <div className="toast">
      <ToastContainer autoClose={5000} />
    </div>
  );
}
