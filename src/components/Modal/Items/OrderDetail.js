import React from "react";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";

export default function OrderDetail() {
  return (
    <>
      <div className="w-[70%] flex items-center justify-center">
        <div className="w-[90%] h-[90%]">
          <div className="mt-4 pb-4 flex items-center">
            <ChevronLeftIcon className="w-5 h-5 xsm:w-3 xsm:h-3 cursor-pointer" />
            <h1 className="font-medium xsm:text-sm">Order detail</h1>
          </div>
          <div className="w-full h-[90%] flex flex-col gap-2 overflow-auto">
            <div className="grid grid-cols-2 xxsm:grid-cols-1 xxsm:gap-2">
              <div className="border-r-[1px] border-solid border-[#BBB7A8]">
                <h2 className="font-medium xsm:text-sm">Dia chi nguoi nhan:</h2>
                <p className="text-sm">Mai Anh Khoa</p>
                <p className="text-sm">
                  Dia chi: 30 Ngõ 1, Đình Thôn, Phường Mỹ Đình 1, Quận Nam Từ
                  Liêm, Hà Nội, Việt Nam
                </p>
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
                <div className="w-full flex">
                  <div className="w-[65%] flex xxsm:flex-col items-center gap-2">
                    <div className="w-[20%] xxsm:w-[50%]">
                      <img
                        src="https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/158d90c1-67fa-438d-94e0-8cf0196c9653/air-max-bella-tr-5-womens-training-shoes-tLCg4B.png"
                        alt="product1"
                        className="w-full"
                      />
                    </div>
                    <div>
                      <p className="sm:text-sm">Day la ten san pham</p>
                      <p className="text-sm">So luong: x1</p>
                    </div>
                  </div>
                  <div className="w-[35%] flex items-center xxsm:items-end">
                    <p className="sm:text-sm">156$</p>
                  </div>
                </div>

                <div className="w-full flex">
                  <div className="w-[65%] flex xxsm:flex-col items-center gap-2">
                    <div className="w-[20%] xxsm:w-[50%]">
                      <img
                        src="https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/158d90c1-67fa-438d-94e0-8cf0196c9653/air-max-bella-tr-5-womens-training-shoes-tLCg4B.png"
                        alt="product1"
                        className="w-full"
                      />
                    </div>
                    <div>
                      <p className="sm:text-sm">Day la ten san pham</p>
                      <p className="text-sm">So luong: x1</p>
                    </div>
                  </div>
                  <div className="w-[35%] flex xxsm:items-end items-center">
                    <p className="sm:text-sm">156$</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full text-right">
              <p className="text-[#787878] xsm:text-sm">
                Tong cong:{" "}
                <span className="text-[#ee4d2d] text-xl xsm:text-sm">312$</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
