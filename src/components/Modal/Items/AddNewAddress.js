import React from "react";
import { useSelector } from "react-redux";
import { toogleStateSelector } from "../../../App/Selectors";

export default function AddNewAddress({ inputNewAddress, setInputNewAddress }) {
  const { name, phoneNumber, address } = inputNewAddress;
  const toogleState = useSelector(toogleStateSelector);
  return (
    <>
      <div
        className={`${
          toogleState == "addAddress" || toogleState == "editAddress"
            ? "w-full"
            : "w-0"
        } duration-75 transition-all overflow-hidden ease-in-out`}
      >
        <div className="flex flex-col gap-2 justify-center">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            placeholder="name..."
            value={name}
            className="p-2 border-[1px] border-solid border-slate-400 rounded text-sm focus:outline-[#ee4d2d]"
            onChange={(e) => {
              setInputNewAddress({ ...inputNewAddress, name: e.target.value });
            }}
          />
        </div>
        <div className="flex flex-col gap-2 justify-center">
          <label htmlFor="phoneNumber">Phone number:</label>
          <input
            type="number"
            id="phoneNumber"
            value={phoneNumber}
            placeholder="phone number..."
            className="p-2 border-[1px] border-solid border-slate-400 rounded text-sm focus:outline-[#ee4d2d]"
            onChange={(e) =>
              setInputNewAddress({
                ...inputNewAddress,
                phoneNumber: e.target.value,
              })
            }
          />
        </div>
        <div className="flex flex-col gap-2 justify-center">
          <label htmlFor="address">Address:</label>
          <textarea
            cols="30"
            rows="5"
            value={address}
            placeholder="address..."
            id="address"
            className="p-2 border-[1px] border-solid border-slate-400 rounded text-sm focus:outline-[#ee4d2d] resize-none"
            onChange={(e) =>
              setInputNewAddress({
                ...inputNewAddress,
                address: e.target.value,
              })
            }
          ></textarea>
        </div>
      </div>
    </>
  );
}
