import React, { useMemo, useState } from "react";
import { MapPinIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import {
  userAddressSelector,
  userCartSelector,
  userOrderAddressSelector,
} from "../../App/Selectors";
import { clearCart, conFirmOrder } from "../../App/UserSlice";
import { setOpenToogle } from "../../App/ToogleSlice";
import { v4 as uuid } from "uuid";

export default function CreateOrdersModal() {
  const [disableCloseButton, setDisableCloseButton] = useState(true);
  const cartItems = useSelector(userCartSelector);
  const userAddress = useSelector(userAddressSelector);
  const orderAddress = useSelector(userOrderAddressSelector);
  const dispatch = useDispatch();

  const onConfirmOrder = () => {
    dispatch(
      conFirmOrder({
        name: userAddress[orderAddress].name,
        phoneNumber: userAddress[orderAddress].phoneNumber,
        address: userAddress[orderAddress].address,
        cartItems: cartItems,
        status: "pending",
        total: getTotalPrice,
      })
    );

    setDisableCloseButton(false);
    setTimeout(() => {
      dispatch(setOpenToogle(""));
      dispatch(clearCart());
      setDisableCloseButton(true);
    }, 4000);
  };

  const getTotalPrice = useMemo(() => {
    const total = cartItems.reduce((total, cur) => {
      return total + cur.price * cur.cartQuantity;
    }, 0);
    return total;
  }, [cartItems]);

  const updateSelectedOrderAddress = () => {
    dispatch(setOpenToogle("updateAddress"));
  };

  return (
    <>
      <div className="w-[60%] lg:w-[80%] md:w-full h-[95%] bg-slate-50 rounded-xl overflow-hidden shadow-lg shadow-slate-400 flex justify-center items-center p-5">
        <div className="w-full relative h-full flex items-center flex-col justify-between">
          <div
            className="absolute right-0 top-0 cursor-pointer"
            onClick={() => {
              disableCloseButton && dispatch(setOpenToogle(""));
            }}
          >
            X
          </div>
          <div className="flex w-full gap-2">
            <div className="w-[10%] flex items-center">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/nikestore-61243.appspot.com/o/asset%2Fimg%2Fnike-black-logo.png?alt=media&token=dcb29101-60e0-4053-a286-63ee01e2804d"
                alt="order-nike-logo"
              />
            </div>
            <h1 className="text-lg font-medium w-full text-left">Order</h1>
          </div>
          <div className="w-full border-t-[1px] border-slate-300 pt-3">
            <div className="w-full flex justify-between items-center px-3">
              <div className="flex">
                <div>
                  <MapPinIcon className="w-5 h-5 xsm:w-4 xsm:h-4 fill-[#ee4d2d]" />
                </div>
                <div>
                  <div className="flex gap-3 items-center">
                    <p className="text-[#ee4d2d] xsm:text-sm">
                      Customer infomation:
                    </p>
                    {orderAddress == 0 && (
                      <div className="border-[1px] border-[#ee4d2d] p-0.5">
                        <p className="text-[#ee4d2d] boder-[1px] text-sm">
                          Default
                        </p>
                      </div>
                    )}
                  </div>
                  {userAddress.length > 0 && (
                    <>
                      <h2 className="font-medium sm:text-sm">
                        {userAddress[orderAddress].name} |{" "}
                        {userAddress[orderAddress].phoneNumber}
                      </h2>
                      <p className="sm:text-sm">
                        {userAddress[orderAddress].address}
                      </p>
                    </>
                  )}
                </div>
              </div>
              <div>
                <button
                  className="text-blue-600 sm:text-sm"
                  onClick={updateSelectedOrderAddress}
                >
                  Edit
                </button>
              </div>
            </div>
          </div>

          <div className="w-full flex justify-center h-[55vh] bg-slate-50 border-t-[1px] border-slate-400 pt-3 flex-col gap-2">
            <div className="w-full px-3 xsm:hidden">
              <div className="w-ful flex">
                <div className="w-[60%] flex">
                  <div className="w-[80%] sm:text-sm">Product</div>
                  <div className="w-[20%] sm:text-sm">size</div>
                </div>
                <div className="w-[40%] flex justify-center text-center">
                  <div className="w-[30%] sm:text-sm">price</div>
                  <div className="w-[30%] sm:text-sm">number</div>
                  <div className="w-[30%] sm:text-sm">total</div>
                </div>
              </div>
            </div>

            <div className="px-3 xxsm:px-0 w-full h-full flex flex-col overflow-y-auto scroll-smooth gap-3 scroll-hidden">
              {cartItems?.map((val, index) => {
                return (
                  <div
                    className="w-full h-[25%] flex bg-[#e2dfdb] rounded-lg"
                    key={index}
                  >
                    <div className="w-[60%] flex">
                      <div className="w-[80%] flex items-center gap-3 p-4">
                        <div className="w-[20%] xxsm:w-[60%] rounded overflow-hidden">
                          <img
                            src={val.img}
                            alt={`order/item${index}`}
                            className="w-full"
                          />
                        </div>
                        <p className="sm:text-sm xxsm:hidden">{val.name}</p>
                      </div>
                      <div className="w-[20%] xxsm:w-[10%] flex items-center">
                        <p className="sm:text-sm">{val.size}</p>
                      </div>
                    </div>
                    <div className="w-[40%] xxsm:w-[50%] flex justify-center items-center text-center">
                      <div className="w-[30%] xxsm:w-[25%] sm:text-sm">
                        ${val.price}
                      </div>
                      <div className="w-[30%] xxsm:w-[25%] sm:text-sm">
                        {val.cartQuantity}
                      </div>
                      <div className="w-[30%] xxsm:w-[25%] sm:text-sm">
                        ${val.price * val.cartQuantity}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex justify-between w-full items-center border-t-[1px] border-slate-300 pt-3 px-3">
            <p className="text-sm">Total payment:</p>
            <div className="flex gap-3 items-center justify-center">
              <h1 className="text-[#ee4d2d] text-lg">${getTotalPrice}</h1>
              <button
                className="bg-[#ee4d2d] p-1 text-sm rounded active:scale-90 duration-75 transition-all"
                onClick={onConfirmOrder}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
