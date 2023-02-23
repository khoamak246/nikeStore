import React from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setOpenToogle } from "../../redux/reducers/ToogleSlice";

export default function CustomToast({ title, text, action, value, btn, id }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div
      className={`${
        id.visible ? "animate-enter" : "animate-leave"
      } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
    >
      <div className="flex-1 w-0 p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0 pt-0.5">
            <img
              className="h-10 w-15 rounded-full animate-bounce"
              src="https://firebasestorage.googleapis.com/v0/b/nikestore-61243.appspot.com/o/asset%2Ficon%2FScreenshot_1.png?alt=media&token=60a401fe-0c59-44b5-a1d5-8f8a7366ab8c"
              alt="notification-icon"
            />
          </div>
          <div className="ml-3 flex-1">
            <p className="text-sm font-medium text-gray-900">{title}</p>
            <p className="mt-1 text-[0.7rem] text-gray-500">{text}</p>
          </div>
        </div>
      </div>
      <div className="flex border-l border-gray-200">
        <button
          onClick={() => {
            if (action) {
              dispatch(action(value));
            } else {
              dispatch(setOpenToogle(""));
              navigate(value);
            }

            return toast.dismiss(id.id);
          }}
          className="active:scale-90 w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium focus:outline-none duration-75 transition-all"
        >
          {btn}
        </button>
      </div>
    </div>
  );
}
