import React from "react";
import { useSelector } from "react-redux";
import { userOrderListSelector } from "../../../App/Selectors";
import OrderItems from "./OrderItems";

export default function Orders({ taskInfo, setTaskInfo }) {
  const userOrders = useSelector(userOrderListSelector);
  console.log(userOrders);
  return (
    <>
      <div
        className={`${
          taskInfo == "orders" ? "w-[70%]" : "w-0"
        }  flex flex-col justify-center items-center duration-300 transition-all overflow-hidden`}
      >
        <div className="w-[90%] h-[90%]">
          <h1 className="pb-4 mt-4 font-medium xsm:text-sm">Orders</h1>
          <div className="w-full h-[95%] overflow-auto">
            {userOrders?.map((val, index) => {
              return (
                <OrderItems key={val.id} item={val} setTaskInfo={setTaskInfo} />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
