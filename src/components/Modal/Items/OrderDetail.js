import React from "react";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";

export default function OrderDetail({
  taskInfo,
  setTaskInfo,
  idSelectedOrder,
}) {
  return (
    <>
      <div
        className={`${
          taskInfo == "orderDetail" ? "w-[70%]" : "w-0"
        } flex items-center justify-center duration-300 transition-all overflow-hidden`}
      >
        <div className="w-[90%] h-[90%]">
          <div
            className="mt-4 pb-4 flex items-center cursor-pointer"
            onClick={() => {
              setTaskInfo("orders");
            }}
          >
            <ChevronLeftIcon className="w-5 h-5 xsm:w-3 xsm:h-3 cursor-pointer" />
            <h1 className="font-medium xsm:text-sm">Order detail</h1>
          </div>
          <div className="w-full h-[90%] flex flex-col gap-2 overflow-auto">
            <div className="grid grid-cols-2 xxsm:grid-cols-1 xxsm:gap-2">
              <div className="border-r-[1px] border-solid border-[#BBB7A8]">
                <h2 className="font-medium xsm:text-sm">Dia chi nguoi nhan:</h2>
                <p className="text-sm">{idSelectedOrder?.name}</p>
                <p className="text-sm">{idSelectedOrder?.address}</p>
                <p className="text-sm">Điện thoại: 0975330387</p>
              </div>
              <div className="pl-2 xxsm:p-0">
                <h2 className="font-medium xsm:text-sm">
                  Hinh thuc thanh toan:
                </h2>
                <p className="text-sm">Thanh toán tiền mặt khi nhận hàng</p>
              </div>
            </div>
            <div className="flex w-full flex-col border-[1px] border-solid border-[#BBB7A8] p-2 gap-2 rounded-lg">
              <div className="w-full flex border-b-[1px] border-solid border-[#BBB7A8]">
                <div className="w-[65%]">
                  <p className="text-[#787878] xsm:text-sm">San pham</p>
                </div>
                <div className="w-[35%]">
                  <p className="text-[#787878] xsm:text-sm">Thanh tien</p>
                </div>
              </div>
              <div className="w-full flex flex-col gap-2">
                {idSelectedOrder?.cartItems?.map((val, index) => {
                  return (
                    <div className="w-full flex" key={index}>
                      <div className="w-[65%] flex xxsm:flex-col items-center gap-2">
                        <div className="w-[20%] xxsm:w-[50%]">
                          <img
                            src={val?.img}
                            alt="product1"
                            className="w-full"
                          />
                        </div>
                        <div>
                          <p className="sm:text-sm">{val.name}</p>
                          <p className="text-sm">
                            So luong: x{val.cartQuantity}
                          </p>
                        </div>
                      </div>
                      <div className="w-[35%] flex items-center xxsm:items-end">
                        <p className="sm:text-sm">{val.price}$</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="w-full text-right">
              <p className="text-[#787878] xsm:text-sm">
                Tong cong:{" "}
                <span className="text-[#ee4d2d] text-xl xsm:text-sm">
                  {idSelectedOrder?.total}$
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
