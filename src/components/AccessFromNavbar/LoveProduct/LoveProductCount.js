import React from "react";
import { ChevronDoubleLeftIcon } from "@heroicons/react/24/outline";
import { useSelector, useDispatch } from "react-redux";
import { userLoveProductSelector } from "../../../redux/selectors/Selectors";
import { setOpenToogle } from "../../../redux/reducers/ToogleSlice";

export default function LoveProductCount() {
  const loveProduct = useSelector(userLoveProductSelector);
  const dispatch = useDispatch();
  const onChaneToogleSate = () => {
    dispatch(setOpenToogle(""));
  };
  return (
    <div className="bg-white h-11 flex items-center justify-between p-0 sticky top-0 left-0 right-0 w-full">
      <div className="flex justify-between accent-pink-300 gap-3 w-full">
        <div className="grid items-center cursor-pointer">
          <ChevronDoubleLeftIcon
            id="backScreen"
            className="w-5 h-5 text-slate-900 hover:text-orange-500 stoke-[2]"
            onClick={onChaneToogleSate}
          />
        </div>
        <div className="flex gap-2 items-center justify-items-center">
          <h1 className="text-base font-medium text-slate-900 lg:text-sm md:text-[0.7rem]">
            Love products{" "}
          </h1>
          <h1 className="shadow-md bg-gradient-to-b from-amber-500 to-orange-500 rounded px-1 py-0.5 font-normal text-xs md:text-[0.5rem]">
            {loveProduct.length}
          </h1>
        </div>
      </div>
    </div>
  );
}
