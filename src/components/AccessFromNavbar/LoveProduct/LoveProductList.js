import { HeartIcon } from "@heroicons/react/24/outline";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setOpenToogle } from "../../../redux/reducers/ToogleSlice";
import * as thunk from "../../../Thunk/userThunk";

export default function LoveProductList({ item }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onRemoveFromLoveProduct = () => {
    dispatch(
      thunk.removeFromLoveProduct({
        typeId: item.typeId,
      })
    );
  };
  return (
    <>
      <div className="w-full p-x-3 py-2 cursor-pointer z-0 relative">
        <div
          className="absolute top-0 left-0 w-[80%] h-full z-[250]"
          onClick={() => {
            dispatch(setOpenToogle(""));
            navigate(
              `/productdetail/${item.catalog}/${item.productId}/${item.typeId}`
            );
          }}
        ></div>

        <div className="flex justify-between items-center bg-[#e2dfdb] p-3 rounded-xl z-0">
          <div className="flex gap-3 items-center z-20">
            <div className="w-[25%] rounded overflow-hidden hover:scale-105 duration-75 transition-all">
              <img
                src={item.img}
                alt={`loveProduct/img-1/${item.typeId}`}
                className="w-full"
              />
            </div>
            <div>
              <h1 className="text-base font-medium">{item.name}</h1>
              <p className="text-sm">{item.forGender}'s shoes</p>
            </div>
          </div>
          <div>
            <button
              className="active:scale-90 z-20"
              onClick={onRemoveFromLoveProduct}
            >
              <HeartIcon className="w-6 h-6 lg:h-5 lg:w-5 fill-white stroke-none" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
