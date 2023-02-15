import React, { useMemo, useState } from "react";
import ItemCount from "./ItemCount";
import SideListEmty from "./SideListEmty";
import SideListItem from "./SideListItem";
import { useSelector, useDispatch } from "react-redux";
import {
  toogleStateSelector,
  userAddressSelector,
  userCartSelector,
} from "../../../App/Selectors";
import CreateOrdersModal from "../../Modal/CreateOrdersModal.js";
import { setOpenToogle } from "../../../App/ToogleSlice";
import { toast } from "react-hot-toast";
import CustomToast from "../../ToastNotification/CustomToast";
import { setEditOrderAddress } from "../../../App/UserSlice";

export default function Cart() {
  const cartItems = useSelector(userCartSelector);
  const toogleState = useSelector(toogleStateSelector);
  const userAddress = useSelector(userAddressSelector);
  const dispatch = useDispatch();

  const onCheckOut = () => {
    if (userAddress.length == 0) {
      toast.custom((t) => (
        <CustomToast
          title="OOP! You don't have location yet!"
          text="Press to add your location and shopping now"
          action={setOpenToogle}
          value="addAddress"
          btn="Add"
          id={t}
        />
      ));
    } else {
      dispatch(setEditOrderAddress(0));
      dispatch(setOpenToogle("order"));
    }
  };

  const getSubTotalPrice = useMemo(() => {
    const subTotal = cartItems.reduce((total, cur) => {
      return total + cur.price * cur.cartQuantity;
    }, 0);
    return subTotal;
  }, [cartItems]);

  return (
    <>
      <div
        className={`fixed top-0 left-0 right-0 bottom-0 blur-effect-theme ${
          toogleState == "cart" || toogleState == "order"
            ? "w-full h-screen"
            : "w-0 h-0"
        }  opacity-100 z-[250] overflow-hidden`}
      >
        <div
          className={`${
            toogleState == "order" ? "w-full h-screen" : "w-0"
          } duration-1000 transition-all flex absolute right-0 justify-center items-center overflow-hidden`}
        >
          <CreateOrdersModal />
        </div>
        <div
          className={`blur-effect-theme ${
            toogleState == "cart" ? "h-screen w-full" : "h-0 w-0"
          } max-w-xl absolute right-0 duration-700 transition-all flex flex-col items-end overflow-hidden`}
        >
          <ItemCount />
          {cartItems?.length == 0 ? (
            <SideListEmty />
          ) : (
            <div className="w-full">
              <div
                className={`w-full flex flex-col gap-5 overflow-y-scroll  scroll-smooth scroll-hidden ${
                  toogleState == "cart" ? "h-[81vh] p-5" : "h-0 p-0"
                } transition-all duration-1000`}
              >
                {cartItems?.map((item, index) => {
                  return <SideListItem key={index} item={item} />;
                })}
              </div>
              <div className="fixed bottom-0 bg-white w-full px-5 py-2 grid items-center">
                <div className="flex items-center justify-between">
                  <h1 className="text-base font-semibold uppercase">
                    SubTotal
                  </h1>
                  <h1 className="text-base text-[#ee4d2d] font-medium px-1 py-0.5">
                    ${getSubTotalPrice}
                  </h1>
                </div>
                <div className="grid items-center gap-2">
                  <p className="text-sm font-medium text-center">
                    Taxes and shipping will Caculate At Shipping
                  </p>
                  <button
                    type="button"
                    className="button-theme bg-theme-cart text-white bg-gradient-to-b from-amber-500 to-orange-500"
                    onClick={onCheckOut}
                  >
                    Check Out
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
