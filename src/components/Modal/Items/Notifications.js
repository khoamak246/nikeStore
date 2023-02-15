import React from "react";
import {
  TruckIcon,
  CurrencyDollarIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import UpdateOrderNotification from "./UpdateOrderNotification";
import { useSelector } from "react-redux";
import { userNotificationSelector } from "../../../App/Selectors";

export default function Notifications({ taskInfo }) {
  const userNotification = useSelector(userNotificationSelector);
  return (
    <>
      <div
        className={`${
          taskInfo == "notifications" ? "w-[70%]" : "w-0"
        }  flex flex-col justify-center items-center duration-300 transition-all overflow-hidden`}
      >
        <div className="w-[90%] h-[90%]">
          <h1 className="font-medium mt-4 pb-4 xsm:text-sm">Notifications</h1>
          <div className="w-full h-[96%] overflow-auto">
            {userNotification?.map((val, index) => {
              return val.type == "updateOrder" ? (
                <UpdateOrderNotification
                  key={val.id}
                  id={val.id}
                  status={val.status}
                  createdAt={val.createdAt}
                />
              ) : (
                ""
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
