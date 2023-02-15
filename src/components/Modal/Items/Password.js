import React from "react";
import SquarePen from "../../../assets/SquarePen.png";

export default function Password() {
  return (
    <>
      <div className="w-[70%] flex flex-col justify-center items-center">
        <div className="w-[90%] h-[90%] flex flex-col gap-4">
          <h1 className="border-b-[1px] border-solid border-[#BBB7A8] pb-4 mt-4 font-medium sm:text-sm">
            Password
          </h1>
          <div className="w-full flex gap-2">
            <div className="w-full flex items-center justify-between border-b-[1px] border-solid border-[#BBB7A8] pb-4">
              <label className="font-medium sm:text-sm">
                Current Password:
              </label>
              <div className="flex items-center gap-2 sm:text-sm">
                <input type="text" />
                <img
                  src={SquarePen}
                  alt="changePassword-Icon1"
                  className="w-5 h-5"
                />
              </div>
            </div>
          </div>
          <div className="w-full flex gap-2">
            <div className="w-full flex items-center justify-between border-b-[1px] border-solid border-[#BBB7A8] pb-4">
              <label className="font-medium sm:text-sm">New Password:</label>
              <div className="flex items-center gap-2 sm:text-sm">
                <input type="text" />
                <img
                  src={SquarePen}
                  alt="changePassword-Icon1"
                  className="w-5 h-5"
                />
              </div>
            </div>
          </div>
          <div className="w-full flex gap-2">
            <div className="w-full flex items-center justify-between border-b-[1px] border-solid border-[#BBB7A8] pb-4">
              <label className="font-medium sm:text-sm">
                Confirm Password:
              </label>
              <div className="flex items-center gap-2 sm:text-sm">
                <input type="text" />
                <img
                  src={SquarePen}
                  alt="changePassword-Icon1"
                  className="w-5 h-5"
                />
              </div>
            </div>
          </div>
          <div className="w-full flex gap-2 justify-center items-center">
            <button className="border-none box-border w-[30%] bg-[#F8A34F] rounded-3xl py-2 sm:text-sm">
              Save
            </button>
            <button className="border-[1px] box-border border-black bg-transparent w-[30%] py-2 rounded-3xl sm:text-sm">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
