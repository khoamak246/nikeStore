import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import React from "react";
import emptybag from "../../../assets/emptybag.png";
import { useSelector, useDispatch } from "react-redux";
import { toogleStateSelector } from "../../../App/Selectors";
import { setOpenToogle } from "../../../App/ToogleSlice";

export default function SideListEmty() {
  const toogleState = useSelector(toogleStateSelector);
  const dispatch = useDispatch();
  const onChangeToogleState = () => {
    dispatch(setOpenToogle(""));
  };
  return (
    <>
      <div className="flex items-center justify-center flex-col h-screen w-full px-11 text-center gap-7">
        <img
          src={emptybag}
          alt="emtybag/img"
          className={`${
            toogleState == "cart" ? "scale-100 duration-1000" : "scale-0"
          } w-40 lg:w-36 sm:w-28 h-auto object-fill transition-all hover:scale-110`}
        />
        <button
          type="button"
          className={`${
            toogleState == "cart" ? "scale-x-100" : "scale-x-0"
          } button-theme bg-gradient-to-b from-amber-500 to-orange-500 shadow-lg shadow-orange-500 flex items-center justify-items-center text-slate-900 py-2 gap-3 text-sm px-5 font-semibold active:scale-110 duration-1000 transition-all`}
          onClick={onChangeToogleState}
        >
          <ArrowLeftIcon className={`w-5 h-5 text-slate-900`} />
          <span>Back to Nike store</span>
        </button>
      </div>
    </>
  );
}
