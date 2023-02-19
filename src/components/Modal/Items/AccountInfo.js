import React from "react";
import {
  UserIcon,
  PencilIcon,
  EnvelopeIcon,
  FaceSmileIcon,
  DevicePhoneMobileIcon,
} from "@heroicons/react/24/outline";
import SquarePen from "../../../assets/SquarePen.png";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userDataSelector } from "../../../App/Selectors";
import { toast } from "react-hot-toast";
import { userChangeInfo } from "../../../App/UserSlice";

export default function AccountInfo({ taskInfo }) {
  const dispatch = useDispatch();
  const userData = useSelector(userDataSelector);
  const [curInputValue, setCurInputValue] = useState({
    type: "",
    curValue: "",
  });
  const [newInputValue, setNewInputValue] = useState("");
  const [checkInputText, setCheckInputText] = useState();
  const [inputCheckEmailPhone, setInputCheckEmailPhone] = useState("");

  const changeSecurity = (val) => {
    let checkGmail = val.indexOf("@");
    let newVal = "";
    if (checkGmail !== -1) {
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

  const selectedInput = (e) => {
    const keyInput = e.target.id;
    setCheckInputText(keyInput);
    let seLectedObj = document.getElementById(`${keyInput}Input`);
    if (seLectedObj && seLectedObj.value) {
      setCurInputValue({ type: keyInput, curValue: seLectedObj.value });
      setNewInputValue(seLectedObj.value);
    }
  };

  useEffect(() => {
    if (checkInputText == "phoneNumber") {
      setCurInputValue({
        type: checkInputText,
        curValue: userData.phoneNumber,
      });
      setNewInputValue(userData.phoneNumber);
    } else if (checkInputText == "email") {
      setCurInputValue({ type: checkInputText, curValue: userData.email });
      setNewInputValue(userData.email);
    }
  }, [checkInputText]);

  const handleOnChangeInput = (e) => {
    setNewInputValue(e.target.value);
  };

  const checkValidate = (charNumber) => {
    let validateResult = false;
    let format;
    if (curInputValue.type == "displayName") {
      format = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    } else {
      format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    }

    if (
      newInputValue.length > 6 &&
      newInputValue.length < charNumber &&
      !format.test(newInputValue) &&
      curInputValue.type !== "phoneNumber"
    ) {
      validateResult = true;
    } else if (
      newInputValue.length == charNumber &&
      !format.test(newInputValue) &&
      curInputValue.type == "phoneNumber" &&
      !isNaN(Number(newInputValue))
    ) {
      validateResult = true;
    }
    return validateResult;
  };

  const checkValidateEmail = () => {
    let validateValue = false;
    let checkFormat = String(newInputValue)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );

    if (checkFormat && newInputValue.includes("@gmail.com")) {
      validateValue = true;
    }
    return validateValue;
  };

  const onCheckValueEmailPhone = (e) => {
    setInputCheckEmailPhone("");
    if (
      (checkInputText === "emailSelected" &&
        userData.email !== inputCheckEmailPhone) ||
      (checkInputText === "phoneSelected" &&
        userData.phoneNumber !== inputCheckEmailPhone)
    ) {
      return toast.error("OOP! Your input not correct!", { duration: 2000 });
    }

    return setCheckInputText(e.target.id);
  };

  const dispatchChangeValue = (charNumber, toastValue) => {
    if (checkValidate(charNumber)) {
      return dispatch(
        userChangeInfo({
          key: curInputValue.type,
          value: newInputValue,
          toast: toastValue,
        })
      );
    }
    setCurInputValue({
      type: "",
      curValue: "",
    });
    setNewInputValue("");
    return toast.error("OOP! Please check you Infor again!", {
      duration: 2000,
    });
  };

  const onChangeGengerRadio = (e) => {
    dispatch(
      userChangeInfo({
        key: "gender",
        value: e.target.value,
        toast: "Gender changed successfully!",
      })
    );
  };

  useEffect(() => {
    if (
      checkInputText == "filter" &&
      curInputValue.curValue !== newInputValue
    ) {
      switch (curInputValue.type) {
        case "displayName":
          dispatchChangeValue(13, "Displayname changed sucessfully!");
          break;
        case "phoneNumber":
          dispatchChangeValue(10, "Phone number changed sucessfully!");
          break;
        case "email":
          checkValidateEmail()
            ? dispatch(
                userChangeInfo({
                  key: curInputValue.type,
                  value: newInputValue,
                  toast: "Email changed successfully",
                })
              )
            : toast.error("OOP! Please check you Infor again!", {
                duration: 2000,
              });
          break;
        default:
          break;
      }
    }
  }, [checkInputText]);

  useEffect(() => {
    if (
      checkInputText &&
      checkInputText !== "filter" &&
      checkInputText !== "emailSelected" &&
      checkInputText !== "phoneSelected" &&
      checkInputText !== "closeModalConfirm"
    ) {
      const length = document.getElementById(`${checkInputText}Input`).value
        .length;
      document
        .getElementById(`${checkInputText}Input`)
        .setSelectionRange(length, length);
      document.getElementById(`${checkInputText}Input`).focus();
    }
  }, [checkInputText]);

  return (
    <>
      <div
        className={`${
          taskInfo === "accountInfo"
            ? "w-[70%] overflow-auto"
            : "w-0 overflow-hidden"
        }  flex justify-center items-center duration-300 transition-all relative`}
      >
        <div
          className={`absolute w-full h-full top-0 left-0 flex justify-center items-center overflow-hidden`}
          id="filter"
          onClick={selectedInput}
        ></div>
        <div
          className={`${
            checkInputText === "emailSelected" ||
            checkInputText === "phoneSelected"
              ? "w-full h-full z-[40]"
              : "w-0 h-0"
          } flex items-center justify-center absolute top-0 left-0 duration-300 transition-all overflow-hidden`}
        >
          <div
            className={` ${
              checkInputText === "emailSelected" ||
              checkInputText === "phoneSelected"
                ? "w-[60%] h-[30%]"
                : "w-0 h-0"
            } bg-white shadow-lg shadow-slate-500 rounded-lg overflow-hidden relative flex flex-col justify-center items-center gap-3 duration-300 transition-all`}
          >
            <div
              className="absolute top-2 right-3 cursor-pointer"
              onClick={selectedInput}
              id="closeModalConfirm"
            >
              X
            </div>
            <div className="flex items-center flex-col">
              <h1 className="text-sm">Please Input</h1>
              <h1 className="font-medium xxsm:text-sm">
                Current {checkInputText === "emailSelected" ? "Email" : "Phone"}
              </h1>
            </div>
            <input
              type="text"
              placeholder={`Current ${
                checkInputText === "emailSelected" ? "Email" : "Phone"
              }...`}
              className="text-sm p-1 border-slate-400 border-[1px] border-solid rounded sm:p-0 sm:w-[70%]"
              value={inputCheckEmailPhone}
              onChange={(e) => setInputCheckEmailPhone(e.target.value)}
            />
            <button
              className="bg-blue-400 p-2 rounded-lg text-sm text-white active:scale-90 duration-75 transition-all"
              id={
                checkInputText === "emailSelected"
                  ? "email"
                  : checkInputText === "phoneSelected"
                  ? "phoneNumber"
                  : ""
              }
              onClick={onCheckValueEmailPhone}
            >
              Confirm
            </button>
          </div>
        </div>

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
                  type="text"
                  id="userNameInput"
                  disabled={true}
                  value={userData.userName}
                  className={`w-[70%] underline-offset-4 underline text-blue-500 bg-white p-1 focus:outline-[#F3C193]`}
                />
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
                  type="text"
                  disabled={!(checkInputText === "displayName")}
                  value={
                    checkInputText === "displayName"
                      ? newInputValue
                      : userData.displayName
                  }
                  onChange={handleOnChangeInput}
                  id="displayNameInput"
                  className={`w-[70%] underline underline-offset-4 text-blue-500 bg-white p-1 focus:outline-[#F3C193] ${
                    checkInputText === "displayName" ? "z-[30]" : ""
                  }`}
                />
                <div className="cursor-pointer z-[30]">
                  <img
                    src={SquarePen}
                    alt=""
                    className="w-5 h-5 xxsm:w-8"
                    id="displayName"
                    onClick={selectedInput}
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
                type="text"
                disabled={!(checkInputText === "email")}
                id="emailInput"
                value={
                  checkInputText === "email"
                    ? newInputValue
                    : changeSecurity(userData.email)
                }
                onChange={handleOnChangeInput}
                className={`w-[70%] underline-offset-4 underline text-blue-500 bg-white p-1 focus:outline-[#F3C193] ${
                  checkInputText === "email" ? "z-[30]" : ""
                }`}
              />
              <div className="cursor-pointer z-[30]">
                <img
                  src={SquarePen}
                  alt=""
                  className="w-5 h-5 xxsm:w-8"
                  id="emailSelected"
                  onClick={selectedInput}
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
                  checked={userData.gender === "male"}
                  onChange={onChangeGengerRadio}
                  className="z-[30]"
                />
                <label>male</label>
              </div>
              <div className="items-center flex gap-2 xsm:text-sm xsm:gap-1">
                <input
                  type="radio"
                  value="female"
                  checked={userData.gender === "female"}
                  onChange={onChangeGengerRadio}
                  className="z-[30]"
                />
                <label>female</label>
              </div>
              <div className="items-center flex gap-2 xsm:text-sm xsm:gap-1">
                <input
                  type="radio"
                  value="other"
                  checked={userData.gender === "other"}
                  onChange={onChangeGengerRadio}
                  className="z-[30]"
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
                type="text"
                disabled={checkInputText === "phoneNumber" ? false : true}
                id="phoneNumberInput"
                value={
                  checkInputText === "phoneNumber"
                    ? newInputValue
                    : changeSecurity(userData.phoneNumber)
                }
                onChange={handleOnChangeInput}
                className={`w-[70%] underline-offset-4 underline text-blue-500 bg-white p-1 focus:outline-[#F3C193] ${
                  checkInputText === "phoneNumber" ? "z-[30]" : ""
                }`}
              />
              <div className="cursor-pointer z-[30]">
                <img
                  src={SquarePen}
                  alt=""
                  className="w-5 h-5 xxsm:w-8"
                  id="phoneSelected"
                  onClick={selectedInput}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
