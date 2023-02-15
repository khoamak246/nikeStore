import React, { useMemo } from "react";
import { ChevronDoubleLeftIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import { toogleStateSelector, userCartSelector } from "../../../App/Selectors";
import { setOpenToogle } from "../../../App/ToogleSlice";

export default function ItemCount() {
  const cartItems = useSelector(userCartSelector);
  const toogleState = useSelector(toogleStateSelector);
  const dispatch = useDispatch();
  const onChangeToogleState = () => {
    dispatch(setOpenToogle(""));
  };
  const totalQuantity = useMemo(() => {
    const totalNumberItems = cartItems.reduce((total, cur) => {
      return total + cur.cartQuantity;
    }, 0);
    return totalNumberItems;
  }, [cartItems]);
  return (
    <>
      <div
        className={`${
          toogleState == "cart" ? "w-full" : "w-0"
        } bg-white h-11 flex items-center justify-between px-3 sticky top-0 left-0 right-0 transition-all duration-1000`}
      >
        <div className="flex items-center accent-pink-300 gap-3">
          <div className="grid items-center cursor-pointer">
            <ChevronDoubleLeftIcon
              id="backScreenLikeModalIcon"
              className="w-5 h-5 text-slate-900 hover:text-orange-500 stoke-[2]"
              onClick={onChangeToogleState}
            />
          </div>
          <div className="grid items-center">
            <h1 className="text-base font-medium text-slate-900">
              Your Cart{" "}
              <span className="bg-theme-cart rounded px-1 py-0.5 text-slate-100 font-normal text-xs">
                ({totalQuantity} items)
              </span>
            </h1>
          </div>
        </div>
        <div className="flex items-center">
          <button
            type="button"
            className="rounded bg-theme-cart active:scale-90 p-0.5"
            id="closeModalCart"
            onClick={onChangeToogleState}
          >
            <XMarkIcon className="w-5 h-5 text-white stoke-[2]]" />
          </button>
        </div>
      </div>
    </>
  );
}
