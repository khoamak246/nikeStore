import React from "react";
import {
  UserIcon,
  PencilIcon,
  EnvelopeIcon,
  FaceSmileIcon,
  DevicePhoneMobileIcon,
} from "@heroicons/react/24/outline";
import SquarePen from "../../../assets/SquarePen.png";
import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { userDataSelector } from "../../../App/Selectors";

export default function AccountInfo({ taskInfo }) {
  const userData = useSelector(userDataSelector);
  const [checkRadio, setCheckRadio] = useState("other");
  const [checkInputText, setCheckInputText] = useState("");
  const ref = useRef(null);
  const handleOnChangeRaioInput = (e) => {
    setCheckRadio(e.target.value);
  };

  const changeSecurity = (val) => {
    let checkGmail = val.indexOf("@");
    let newVal = "";
    if (checkGmail != -1) {
      for (let i = 0; i <= checkGmail - 1; i++) {
        newVal += "*";
      }
      newVal += "@gmail.com";
    } else {
      for (let i = 0; i < val.length; i++) {
        i < val.length - 3 ? (newVal += "*") : (newVal += val[i]);
      }
    }
    return newVal;
  };

  const handleOnChangeInputText = (e) => {
    ref.current = document.getElementById(`${e.target.id}Input`);
    setCheckInputText(e.target.id);
  };
  useEffect(() => {
    ref.current.focus();
  }, [checkInputText]);

  return (
    <>
      <div
        className={`${
          taskInfo == "accountInfo"
            ? "w-[70%] overflow-auto"
            : "w-0 overflow-hidden"
        }  flex justify-center items-center duration-300 transition-all`}
      >
        <div className="w-[90%] h-[90%] flex flex-col gap-4">
          <h1 className="border-b-[1px] border-solid border-[#BBB7A8] pb-4 font-medium xsm:text-sm">
            Account Informations
          </h1>
          <div className="border-b-[1px] border-solid border-[#BBB7A8] pb-4">
            <div className="flex gap-1">
              <UserIcon className="w-5 h-5" />
              <h1 className="font-medium xsm:text-sm">Username:</h1>
            </div>
            <div className="flex mt-1">
              <div className="w-full flex gap-20 pl-6 xsm:text-sm">
                <input
                  ref={ref}
                  type="text"
                  id="userNameInput"
                  disabled={checkInputText === "userName" ? false : true}
                  value={userData.userName}
                  className="w-[70%] underline-offset-4 underline text-blue-500 bg-white p-1 focus:outline-[#F3C193]"
                />
                <div
                  className="cursor-pointer"
                  onClick={handleOnChangeInputText}
                >
                  <img
                    src={SquarePen}
                    alt=""
                    className="w-5 h-5 xxsm:w-8"
                    id="userName"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="border-b-[1px] border-solid border-[#BBB7A8] pb-4">
            <div className="flex gap-1">
              <PencilIcon className="w-5 h-5" />
              <h1 className="font-medium xsm:text-sm">Name:</h1>
            </div>
            <div className="flex mt-1">
              <div className="w-full flex gap-20 pl-6 xsm:text-sm">
                <input
                  ref={ref}
                  type="text"
                  disabled={checkInputText === "name" ? false : true}
                  value={userData.displayName}
                  id="nameInput"
                  className="w-[70%] underline underline-offset-4 text-blue-500 bg-white p-1 focus:outline-[#F3C193]"
                />
                <div
                  className="cursor-pointer"
                  onClick={handleOnChangeInputText}
                >
                  <img
                    src={SquarePen}
                    alt=""
                    className="w-5 h-5 xxsm:w-8"
                    id="name"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="border-b-[1px] border-solid border-[#BBB7A8] pb-4">
            <div className="flex gap-1">
              <EnvelopeIcon className="w-5 h-5" />
              <h1 className="font-medium xsm:text-sm">Email:</h1>
            </div>
            <div className="flex w-full gap-20 pl-6 mt-1 xsm:text-sm">
              <input
                ref={ref}
                type="text"
                disabled={checkInputText === "email" ? false : true}
                id="emailInput"
                value={changeSecurity(userData.email)}
                className="w-[70%] underline-offset-4 underline text-blue-500 bg-white p-1 focus:outline-[#F3C193]"
              />
              <div className="cursor-pointer" onClick={handleOnChangeInputText}>
                <img
                  src={SquarePen}
                  alt=""
                  className="w-5 h-5 xxsm:w-8"
                  id="email"
                />
              </div>
            </div>
          </div>
          <div className="border-b-[1px] border-solid border-[#BBB7A8] pb-4">
            <div className="flex gap-1">
              <FaceSmileIcon className="w-5 h-5" />
              <h1 className="font-medium xsm:text-sm">Gender</h1>
            </div>
            <div className="flex xxsm:flex-col justify-between w-[70%] pl-6 mt-1 xsm:gap-1">
              <div className="items-center flex gap-2 xsm:text-sm xsm:gap-1">
                <input
                  type="radio"
                  value="male"
                  checked={userData.gender == "male"}
                  onChange={handleOnChangeRaioInput}
                />
                <label>male</label>
              </div>
              <div className="items-center flex gap-2 xsm:text-sm xsm:gap-1">
                <input
                  type="radio"
                  value="female"
                  checked={userData.gender === "female"}
                  onChange={handleOnChangeRaioInput}
                />
                <label>female</label>
              </div>
              <div className="items-center flex gap-2 xsm:text-sm xsm:gap-1">
                <input
                  type="radio"
                  value="other"
                  checked={userData.gender === "other"}
                  onChange={handleOnChangeRaioInput}
                />
                <label>other</label>
              </div>
            </div>
          </div>
          <div className="w-full">
            <div className="flex gap-1">
              <DevicePhoneMobileIcon className="w-5 h-5" />
              <h1 className="font-medium xsm:text-sm">Phone number:</h1>
            </div>
            <div className="w-full flex gap-20 pl-6 mt-1 xsm:text-sm">
              <input
                ref={ref}
                type="text"
                disabled={checkInputText === "phone" ? false : true}
                id="phoneInput"
                value={changeSecurity(userData.phoneNumber)}
                className="w-[70%] underline-offset-4 underline text-blue-500 bg-white p-1 focus:outline-[#F3C193]"
              />
              <div className="cursor-pointer" onClick={handleOnChangeInputText}>
                <img
                  src={SquarePen}
                  alt=""
                  className="w-5 h-5 xxsm:w-8"
                  id="phone"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
