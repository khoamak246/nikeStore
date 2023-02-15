import React from "react";
import SquarePen from "../../../assets/SquarePen.png";

export default function Address() {
  return (
    <>
      <div className="w-[70%] flex justify-center items-center">
        <div className="w-[90%] h-[90%] flex flex-col gap-4">
          <h1 className="mt-4 font-medium pb-4 xsm:text-sm">Address</h1>
          <div className="w-full flex justify-between items-center border-[1px] border-solid border-[#BBB7A8] p-4 rounded-lg">
            <div className="flex flex-col">
              <p className=" font-medium xsm:text-sm">Mai Anh Khoa</p>
              <p className="text-sm text-[#D1B192] xsm:text-sm">
                (+84) 975330387
              </p>
              <p className="text-sm text-[#D1B192] xsm:text-sm">
                14 Khuê Mỹ Đông 10
              </p>
              <p className="text-sm text-[#D1B192] xsm:text-sm">
                Phường Khuê Mỹ, Quận Ngũ Hành Sơn, Đà Nẵng
              </p>
            </div>
            <div className="cursor-pointer">
              <img
                src={SquarePen}
                alt="changeAddressIcon"
                className="w-5 h-5 xsm:w-8"
              />
            </div>
          </div>
          <div className="w-full flex justify-between items-center border-[1px] border-solid border-[#BBB7A8] p-4 rounded-lg">
            <div className="flex flex-col">
              <p className=" font-medium xsm:text-sm">Mai Anh Khoa</p>
              <p className="text-sm text-[#D1B192] xsm:text-sm">
                (+84) 975330387
              </p>
              <p className="text-sm text-[#D1B192] xsm:text-sm">
                14 Khuê Mỹ Đông 10
              </p>
              <p className="text-sm text-[#D1B192] xsm:text-sm">
                Phường Khuê Mỹ, Quận Ngũ Hành Sơn, Đà Nẵng
              </p>
            </div>
            <div className="cursor-pointer">
              <img
                src={SquarePen}
                alt="changeAddressIcon"
                className="w-5 h-5 xsm:w-8"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
