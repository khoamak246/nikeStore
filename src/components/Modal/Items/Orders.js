import React from "react";
import OrderItems from "./OrderItems";

export default function Orders() {
  return (
    <>
      <div className="w-[70%] flex flex-col justify-center items-center">
        <div className="w-[90%] h-[90%]">
          <h1 className="pb-4 mt-4 font-medium xsm:text-sm">Orders</h1>
          <div className="w-full h-[95%] overflow-auto">
            <OrderItems />
            <OrderItems />
          </div>
        </div>
      </div>
    </>
  );
}
