import React from "react";
import {
  TruckIcon,
  TrashIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline";
import SquarePen from "../../../assets/SquarePen.png";

export default function OrderItems() {
  return (
    <>
      <div className="w-full flex flex-col gap-2 border-[1px] border-solid border-[#BBB7A8] p-4 rounded-lg mb-4">
        <div className="w-full flex justify-between border-b-[1px] border-solid border-[#BBB7A8] pb-2">
          <div className="p-1 flex gap-1 text-[#26aa99] text-sm">
            <TruckIcon className="w-5 h-5" />
            <p className="xsm:text-sm">Giao hang thanh cong</p>
          </div>
          <div className="p-1 cursor-pointer flex gap-1">
            <p className="text-sm font-medium">Edit</p>
            <img src={SquarePen} alt="editOrderIcon" className="w-5 h-5" />
          </div>
        </div>
        <div className="w-full flex xxsm:flex-col gap-2 p-2 border-b-[1px] border-solid border-[#BBB7A8]">
          <div className="w-[20%] xxsm:w-full h-auto flex items-center">
            <img
              src="https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/158d90c1-67fa-438d-94e0-8cf0196c9653/air-max-bella-tr-5-womens-training-shoes-tLCg4B.png"
              alt="product1"
              className="w-full"
            />
          </div>
          <div className="w-[80%]">
            <div className="flex gap-1 items-center">
              <p className="font-medium text-sm">Ma don hang:</p>
              <p className="text-sm">XX000999</p>
            </div>
            <div className="flex gap-1">
              <p className="font-medium text-sm">Dia chi:</p>
              <p className="text-sm">14 Khuê Mỹ Đông 10</p>
            </div>
            <p className="text-sm overflow-hidden w-full">
              Phường Khuê Mỹ, Quận Ngũ Hành Sơn, Đà Nẵng
            </p>
          </div>
        </div>
        <div className="w-full flex justify-end items-center text-[#ee4d2d]">
          <div className="flex cursor-pointer gap-1">
            <div className="text-sm font-medium">Cancel</div>
            <TrashIcon className="w-5 h-5" />
          </div>
        </div>
      </div>
    </>
  );
}
