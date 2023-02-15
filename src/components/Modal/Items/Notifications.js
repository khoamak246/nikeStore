import React from "react";
import {
  TruckIcon,
  CurrencyDollarIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

export default function Notifications() {
  return (
    <>
      <div className="w-[70%] flex flex-col justify-center items-center">
        <div className="w-[90%] h-[90%]">
          <h1 className="font-medium mt-4 pb-4 xsm:text-sm">Notifications</h1>
          <div className="w-full h-[96%] overflow-auto">
            <div className="w-full flex flex-col gap-2 border-[1px] border-solid border-[#BBB7A8] p-4 rounded-lg mb-4 group">
              <div className="w-full flex xxsm:flex-col xxsm:items-end justify-between border-b-[1px] border-solid border-[#BBB7A8] pb-2">
                <div className="p-1 flex gap-1 text-[#26aa99] text-sm xxsm:text-end">
                  <TruckIcon className="w-5 h-5 xxsm:hidden" />
                  <p>Giao hang thanh cong</p>
                </div>
                <div className="p-1 group-hover:hidden">
                  <p className="text-sm text-[#ee4d2d]">COMPLETED</p>
                </div>
                <div className="p-1 hidden group-hover:block cursor-pointer">
                  <TrashIcon className="w-0 h-0 group-hover:w-5 group-hover:h-5 duration-500 transition-all text-[#ee4d2d]" />
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
              <div className="w-full flex gap-1 justify-end items-center">
                <CurrencyDollarIcon className="w-5 h-5 text-[#ee4d2d]" />
                <div className="flex gap-1 items-center">
                  <p className="text-sm">Thanh tien:</p>
                  <p className="text-[#ee4d2d] text-xl xxsm:text-sm">156 $</p>
                </div>
              </div>
            </div>

            <div className="w-full flex flex-col gap-2 border-[1px] border-solid border-[#BBB7A8] p-4 rounded-lg mb-4 group">
              <div className="w-full flex xxsm:flex-col xxsm:items-end justify-between border-b-[1px] border-solid border-[#BBB7A8] pb-2">
                <div className="p-1 flex gap-1 text-[#26aa99] text-sm xxsm:text-end">
                  <TruckIcon className="w-5 h-5 xxsm:hidden" />
                  <p>Giao hang thanh cong</p>
                </div>
                <div className="p-1 group-hover:hidden">
                  <p className="text-sm text-[#ee4d2d]">COMPLETED</p>
                </div>
                <div className="p-1 hidden group-hover:block cursor-pointer">
                  <TrashIcon className="w-0 h-0 group-hover:w-5 group-hover:h-5 duration-500 transition-all text-[#ee4d2d]" />
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
              <div className="w-full flex gap-1 justify-end items-center">
                <CurrencyDollarIcon className="w-5 h-5 text-[#ee4d2d]" />
                <div className="flex gap-1 items-center">
                  <p className="text-sm">Thanh tien:</p>
                  <p className="text-[#ee4d2d] text-xl xxsm:text-sm">156 $</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
