import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toogleStateSelector } from "../../App/Selectors";
import { setOpenToogle } from "../../App/ToogleSlice";
import { Rating } from "../ProductDetail-Component";

export default function CommentModal() {
  const toogleState = useSelector(toogleStateSelector);
  const dispatch = useDispatch();
  const onChangeToogleState = () => {
    dispatch(setOpenToogle(""));
  };
  return (
    <div
      className={`${
        toogleState == "review" ? "max-h-full" : "max-h-0"
      } fixed top-0 left-0 bg-black bg-opacity-50 w-full h-full z-[250] flex justify-center items-center transition-all duration-200 overflow-hidden`}
    >
      <div
        className={`w-[70%] h-[90% bg-white rounded-lg flex justify-center items-center md:w-full md:h-full transition-all duration-300`}
      >
        <div className="flex flex-col w-full justify-center items-center gap-10">
          <div className="w-full flex justify-between">
            <div className="w-full">
              <h1
                className={`text-center w-full font-medium text-3xl sm:text-xl xsm:text-[1rem]`}
              >
                Comment
              </h1>
              <h2
                className={`text-center w-full text-xl sm:text-[1rem] xsm:text-sm`}
              >
                Leave your comment to help us grow more
              </h2>
            </div>
            <div className="pr-3 cursor-pointer" onClick={onChangeToogleState}>
              <p>X</p>
            </div>
          </div>
          <div className="w-[52%] flex flex-col gap-4">
            <div>
              <p className="xsm:text-sm">Tittle:</p>
              <input
                type="text"
                placeholder="Your tittle here..."
                className="w-full border-slate-400 border-[1px] rounded p-1"
              />
            </div>
            <div>
              <p className="xsm:text-sm">Rating:</p>
              <div className="flex w-full">
                <Rating size="4" />
              </div>
            </div>
            <div className="pb-3">
              <p className={`xsm:text-sm`}>Descriptions:</p>
              <textarea
                cols="30"
                rows="10"
                placeholder="Your descriptions here..."
                className={`w-full p-1 border-slate-400 border-[1px] rounded`}
              ></textarea>
              <button
                className={`w-full text-center border-none bg-slate-700 text-white rounded xsm:text-sm`}
                onClick={onChangeToogleState}
              >
                Confirm!
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
