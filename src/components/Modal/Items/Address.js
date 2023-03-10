import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { userAddressSelector } from "../../../redux/selectors/Selectors";
import { setOpenToogle } from "../../../redux/reducers/ToogleSlice";
import SquarePen from "../../../assets/SquarePen.png";

export default function Address({ taskInfo }) {
  const userAddress = useSelector(userAddressSelector);
  const dispatch = useDispatch();
  const onSeenAddress = () => {
    dispatch(setOpenToogle("seenAddress"));
  };
  return (
    <>
      <div
        className={`${
          taskInfo == "address" ? " w-[70%]" : "w-0"
        } flex justify-center items-center overflow-hidden duration-300 transition-all`}
      >
        <div className="w-[90%] h-[90%] flex flex-col gap-4">
          <h1 className="mt-4 font-medium pb-4 xsm:text-sm">Address</h1>
          {userAddress?.map((val, index) => {
            return (
              <div
                className="w-full flex justify-between items-center border-[1px] border-solid border-[#BBB7A8] p-4 rounded-lg"
                key={val.id}
              >
                <div className="flex flex-col w-full">
                  <p className=" font-medium xsm:text-sm">{val.name}</p>
                  <p className="text-sm text-[#D1B192] xsm:text-sm">
                    {val.phoneNumber}
                  </p>
                  <p className="text-sm text-[#D1B192] xsm:text-sm w-[80%]">
                    {val.address}
                  </p>
                </div>
                <div className="cursor-pointer" onClick={onSeenAddress}>
                  <img
                    src={SquarePen}
                    alt="changeAddressIcon"
                    className="w-5 h-5 xsm:w-8"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
