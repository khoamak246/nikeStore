import React from "react";
import { PlusIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import {
  toogleStateSelector,
  userAddressSelector,
  userOrderAddressSelector,
} from "../../../redux/selectors/Selectors";
import { setOpenToogle } from "../../../redux/reducers/ToogleSlice";
import { toast } from "react-hot-toast";
import { setEditOrderAddress } from "../../../redux/reducers/UserSlice";

export default function AddressList({ onGetValueEditAddress }) {
  const userAddress = useSelector(userAddressSelector);
  const toogleState = useSelector(toogleStateSelector);
  const orderAddress = useSelector(userOrderAddressSelector);
  const dispatch = useDispatch();
  const onChangeToogleState = () => {
    if (userAddress.length >= 3) {
      return toast.error("OOP! You have too much address in current list!", {
        duration: 1500,
      });
    }

    if (toogleState == "updateAddress") {
      return dispatch(setOpenToogle("addAddress"));
    } else {
      return dispatch(setOpenToogle("changePersonalAddAddress"));
    }
  };

  const onSelectInputRadio = (index) => {
    dispatch(setEditOrderAddress(index));
  };

  return (
    <>
      <div
        className={`${
          toogleState == "updateAddress" || toogleState == "seenAddress"
            ? "w-full"
            : "w-0"
        } duration-75 transition-all ease-in-out overflow-hidden flex flex-col gap-3`}
      >
        {userAddress?.map((val, index) => {
          return (
            <div
              className="w-full flex justify-between gap-3 items-center border-b-[1px] border-slate-300 pb-3"
              key={index}
            >
              <div className="flex gap-3">
                <div>
                  <input
                    type="radio"
                    className="accent-[#ee4d2d]"
                    checked={index == orderAddress}
                    onChange={() => {
                      onSelectInputRadio(index);
                    }}
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2 xsm:relative">
                    <h2>
                      <span className="text-[#ee4d2d] font-medium">
                        {val.name}
                      </span>{" "}
                      |{" "}
                      <span className="text-sm font-medium">
                        {val.phoneNumber}
                      </span>
                    </h2>
                    {index == 0 && (
                      <div className="text-[0.7rem] text-[#ee4d2d] border-[1px] border-[#ee4d2d] p-0.5 xsm:absolute xsm:top-12 xsm:right-3 xxsm:top-6">
                        Default
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-[#b1aeae]">{val.address}</p>
                </div>
              </div>
              <button
                type="button"
                className="text-blue-600"
                onClick={() => {
                  onGetValueEditAddress(index);
                }}
              >
                Edit
              </button>
            </div>
          );
        })}
        <div>
          <button
            type="button"
            className="flex gap-2 border-[1px] border-slate-400 p-2 active:scale-90 duration-75 transition-all rounded xxsm:mt-[0.2rem]"
            onClick={onChangeToogleState}
          >
            <PlusIcon className="w-5 h-5 stroke-[2]" /> Add address
          </button>
        </div>
      </div>
    </>
  );
}
