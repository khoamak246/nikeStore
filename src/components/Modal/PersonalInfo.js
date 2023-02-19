import React, { useState } from "react";
import {
  UserCircleIcon,
  GlobeAsiaAustraliaIcon,
  ShoppingCartIcon,
  BellAlertIcon,
  StarIcon,
} from "@heroicons/react/24/solid";
import AccountInfo from "./Items/AccountInfo";
import Password from "./Items/Password";
import Address from "./Items/Address";
import Notifications from "./Items/Notifications";
import Orders from "./Items/Orders";
import OrderDetail from "./Items/OrderDetail";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { toogleStateSelector } from "../../App/Selectors";
import { setOpenToogle } from "../../App/ToogleSlice";

export default function PersonalInfo() {
  const [disableToogle, setDisableToggle] = useState(true);
  const [taskInfo, setTaskInfo] = useState("accountInfo");
  const [idSelectedOrder, setIdSelectedOrder] = useState();
  const toogleState = useSelector(toogleStateSelector);
  const dispatch = useDispatch();
  const onChangeToogleState = () => {
    if (disableToogle) {
      dispatch(setOpenToogle(""));
      setTaskInfo("accountInfo");
    }
  };
  return (
    <>
      <div
        className={`${
          toogleState == "menuModalContainer" ? "h-full" : "h-0"
        } fixed bg-black w-full  bg-opacity-50 top-0 left-0 z-[250] duration-300 transition-all`}
      >
        <div className="flex w-full h-full justify-center items-center">
          <div
            className={`bg-white w-[60%] md:w-[80%] sm:w-full flex overflow-hidden relative ${
              toogleState ? "h-[90%] sm:h-full" : "h-0"
            } duration-500 transition-all rounded-lg`}
          >
            <div className="w-[30%] xxsm:w-[20%] bg-slate-100">
              <div className="flex flex-col gap-6">
                <p className="w-full text-sm text-[#BBB7A8] py-2 pl-4 xsm:text-[0.6rem]">
                  {window.innerWidth <= 280
                    ? "P.Infor"
                    : "Personal Informations"}
                </p>
                <div
                  className={`${
                    taskInfo == "accountInfo"
                      ? "bg-opacity-100"
                      : "bg-opacity-0"
                  } w-full flex items-center gap-2 cursor-pointer bg-slate-300 py-2 pl-4 duration-300 transition-all`}
                  onClick={() => {
                    setTaskInfo("accountInfo");
                  }}
                >
                  <UserCircleIcon className="w-7 h-7 xsm:w-5 xsm:h-5" />
                  <p className="xsm:text-[0.6rem] xxsm:hidden">My account</p>
                </div>
                <div
                  className={`${
                    taskInfo == "password" ? "bg-opacity-100" : "bg-opacity-0"
                  } w-full flex items-center gap-2 cursor-pointer py-2 pl-4 bg-slate-300 duration-300 transition-all`}
                  onClick={() => {
                    setTaskInfo("password");
                  }}
                >
                  <StarIcon className="w-7 h-7 xsm:w-5 xsm:h-5" />
                  <p className="xsm:text-[0.6rem] xxsm:hidden">Password</p>
                </div>
                <div
                  className={`${
                    taskInfo == "address" ? "bg-opacity-100" : "bg-opacity-0"
                  } w-full flex gap-2 items-center cursor-pointer py-2 pl-4 bg-slate-300 duration-300 transition-all`}
                  onClick={() => {
                    setTaskInfo("address");
                  }}
                >
                  <GlobeAsiaAustraliaIcon className="w-7 h-7 xsm:w-5 xsm:h-5" />
                  <p className="xsm:text-[0.6rem] xxsm:hidden">Address</p>
                </div>
                <div
                  className={`${
                    taskInfo == "orders" || taskInfo == "orderDetail"
                      ? "bg-opacity-100"
                      : "bg-opacity-0"
                  } w-full flex gap-2 items-center cursor-pointer py-2 pl-4 bg-slate-300 duration-300 transition-all`}
                  onClick={() => {
                    setTaskInfo("orders");
                  }}
                >
                  <ShoppingCartIcon className="w-7 h-7 xsm:w-5 xsm:h-5" />
                  <p className="xsm:text-[0.6rem] xxsm:hidden">Orders</p>
                </div>
                <div
                  className={`${
                    taskInfo == "notifications"
                      ? "bg-opacity-100"
                      : "bg-opacity-0"
                  } w-full flex gap-2 items-center cursor-pointer py-2 pl-4 bg-slate-300 duration-300 transition-all`}
                  onClick={() => {
                    setTaskInfo("notifications");
                  }}
                >
                  <BellAlertIcon className="w-7 h-7 xsm:w-5 xsm:h-5" />
                  <p className="xsm:text-[0.6rem] xxsm:hidden">Notifications</p>
                </div>
              </div>
            </div>
            <div
              className="absolute top-2 right-6 cursor-pointer z-[50]"
              onClick={onChangeToogleState}
            >
              X
            </div>
            <AccountInfo taskInfo={taskInfo} />
            <Password taskInfo={taskInfo} setDisableToggle={setDisableToggle} />
            <Address taskInfo={taskInfo} />
            <Orders
              taskInfo={taskInfo}
              setTaskInfo={setTaskInfo}
              setIdSelectedOrder={setIdSelectedOrder}
            />
            <OrderDetail
              taskInfo={taskInfo}
              setTaskInfo={setTaskInfo}
              idSelectedOrder={idSelectedOrder}
            />
            <Notifications taskInfo={taskInfo} />
          </div>
        </div>
      </div>
    </>
  );
}
