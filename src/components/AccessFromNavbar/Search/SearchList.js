import React from "react";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { useDispatch } from "react-redux";
import { setOpenToogle } from "../../../App/ToogleSlice";
import { useNavigate } from "react-router-dom";

export default function SearchList({ val }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div
      className="w-full border-t-[1px] border-solid border-slate-300 p-2 flex items-center cursor-pointer hover:scale-95 duration-200 transition-all"
      onClick={() => {
        dispatch(setOpenToogle(""));
        setTimeout(() => {
          navigate(
            `/productdetail/${val.catalog}/${val.productId}/${val.typeId}`
          );
        }, 300);
      }}
    >
      <div className="flex items-center gap-3">
        <img src={val.img} alt="" className="w-[20%]" />
        <div>
          <h1 className="font-medium sm:text-sm">{val.name}</h1>
          <p className="text-sm text-[#757575]">{val.forGender}'s Shoes</p>
          <p className="text-sm text-[#757575]">${val.price}</p>
        </div>
      </div>
      <div className="sm:hidden">
        <ChevronRightIcon className="w-5 h-5" />
      </div>
    </div>
  );
}
