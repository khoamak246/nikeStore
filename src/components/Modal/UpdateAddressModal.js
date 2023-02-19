import React, { useRef } from "react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { toogleStateSelector, userAddressSelector } from "../../App/Selectors";
import { setOpenToogle } from "../../App/ToogleSlice";
import { addNewAddress, editAddress } from "../../App/UserSlice";
import AddNewAddress from "./Items/AddNewAddress";
import AddressList from "./Items/AddressList";

export default function UpdateAddressModal() {
  const indexEditAddress = useRef();
  const [inputNewAddress, setInputNewAddress] = useState({
    name: "",
    phoneNumber: "",
    address: "",
  });
  const toogleState = useSelector(toogleStateSelector);
  const userAddress = useSelector(userAddressSelector);
  const dispatch = useDispatch();

  const onChangeToogleState = () => {
    toogleState == "addAddress" || toogleState == "editAddress"
      ? dispatch(setOpenToogle("updateAddress"))
      : toogleState == "changePersonalAddress" ||
        toogleState == "changePersonalAddAddress"
      ? dispatch(setOpenToogle("seenAddress"))
      : toogleState == "seenAddress"
      ? dispatch(setOpenToogle("menuModalContainer"))
      : dispatch(setOpenToogle(""));

    setInputNewAddress({
      name: "",
      phoneNumber: "",
      address: "",
    });
  };

  const onGetValueEditAddress = (index) => {
    setInputNewAddress(userAddress[index]);
    indexEditAddress.current = index;
    if (toogleState == "seenAddress") {
      dispatch(setOpenToogle("changePersonalAddress"));
    } else {
      dispatch(setOpenToogle("editAddress"));
    }
  };

  const onAddAddress = () => {
    for (const val of Object.entries(inputNewAddress)) {
      if (val[1].trim().length == 0) {
        return toast.error("OOP! You forgot input something");
      } else if (
        val[0].trim() == "phoneNumber" &&
        val[1].trim().length !== 10
      ) {
        return toast.error("OOP! Error type phone number!");
      }
    }
    dispatch(addNewAddress(inputNewAddress));
    if (toogleState == "addAddress") {
      dispatch(setOpenToogle("updateAddress"));
    } else {
      dispatch(setOpenToogle("seenAddress"));
    }
  };

  const onEditAddress = () => {
    for (const val of Object.entries(inputNewAddress)) {
      if (val[1].trim().length == 0) {
        return toast.error("OOP! You forgot input something");
      } else if (val[0].trim() == "phoneNumber" && val[1].trim().length > 10) {
        return toast.error("OOP! Error type phone number!");
      }
    }
    const temp = {
      ...inputNewAddress,
      id: userAddress[indexEditAddress.current].id,
    };
    dispatch(editAddress(temp));
    if (toogleState == "editAddress") {
      dispatch(setOpenToogle("updateAddress"));
    } else {
      dispatch(setOpenToogle("menuModalContainer"));
    }
  };

  const onUpdateOrderForm = () => {
    if (toogleState == "updateAddress") {
      dispatch(setOpenToogle("order"));
    } else {
      dispatch(setOpenToogle("menuModalContainer"));
    }
  };

  const onClickConfirm = () => {
    if (
      toogleState == "addAddress" ||
      toogleState == "changePersonalAddAddress"
    ) {
      onAddAddress();
    } else if (
      toogleState == "editAddress" ||
      toogleState == "changePersonalAddress"
    ) {
      onEditAddress();
    } else if (toogleState == "updateAddress" || toogleState == "seenAddress") {
      onUpdateOrderForm();
    }

    setInputNewAddress({
      name: "",
      phoneNumber: "",
      address: "",
    });
  };

  return (
    <>
      <div
        className={`${
          toogleState == "addAddress" ||
          toogleState == "updateAddress" ||
          toogleState == "editAddress" ||
          toogleState == "seenAddress" ||
          toogleState == "changePersonalAddress" ||
          toogleState == "changePersonalAddAddress"
            ? "max-h-full"
            : "max-h-0"
        } fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-[250] transition-all duration-300 overflow-hidden ease-in-out`}
      >
        <div
          className={`${
            toogleState == "addAddress" ||
            toogleState == "updateAddress" ||
            toogleState == "editAddress" ||
            toogleState == "seenAddress" ||
            toogleState == "changePersonalAddress" ||
            toogleState == "changePersonalAddAddress"
              ? "max-h-full"
              : "max-h-0"
          } bg-white w-[40%] md:w-[60%] sm:w-full h-[80%] sm:h-full sm:rounded-none  flex justify-center items-center rounded-xl p-5 transition-all duration-500 overflow-hidden ease-in-out`}
        >
          <div className="w-full h-full relative flex flex-col gap-3">
            <div
              className="absolute top-0 right-0 cursor-pointer"
              onClick={onChangeToogleState}
            >
              X
            </div>
            <h1 className="border-b-[1px] border-slate-400 pb-3">
              Customer address
            </h1>
            <div className="w-full flex">
              <AddNewAddress
                inputNewAddress={inputNewAddress}
                setInputNewAddress={setInputNewAddress}
              />

              <AddressList onGetValueEditAddress={onGetValueEditAddress} />
            </div>
            <div className="absolute bottom-0 right-0 flex gap-2 border-t-[1px] border-slate-400 w-full justify-end pt-3 xxsm:border-none">
              <button
                type="button"
                className="border-[1px] border-slate-400 py-2 px-3 rounded active:scale-90 duration-75 transition-all xxsm:hidden"
                onClick={onChangeToogleState}
              >
                Cancel
              </button>
              <button
                type="button"
                className="bg-[#ee4d2d] text-white py-2 px-3 rounded active:scale-90 duration-75 transition-all"
                onClick={onClickConfirm}
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
