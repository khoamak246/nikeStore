import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { userPasswordSelector } from "../../../redux/selectors/Selectors";
import * as thunk from "../../../Thunk/userThunk";

export default function Password({ taskInfo, setDisableToggle }) {
  const dispatch = useDispatch();
  const userPassword = useSelector(userPasswordSelector);
  const [inputChangePassword, setInputChangePassword] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    taskInfo !== "password" &&
      setInputChangePassword({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
  }, [taskInfo]);

  const handleOnChangeInput = (e) => {
    let name = e.target.name;
    setInputChangePassword({ ...inputChangePassword, [name]: e.target.value });
  };

  const onClickCancel = () => {
    setInputChangePassword({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  const onClickSave = () => {
    let format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    for (const val of Object.entries(inputChangePassword)) {
      if (format.test(val[1])) {
        return toast.error(
          "OOP! Your input shouldn't have special character!",
          { duration: 2000 }
        );
      } else if (val[1].length <= 6) {
        return toast.error("OOP! Your password need at least 7 character!", {
          duration: 2000,
        });
      } else if (val[1].length >= 20) {
        return toast.error("OOP! Your password too long!", { duration: 2000 });
      }
    }

    if (inputChangePassword.currentPassword !== userPassword) {
      return toast.error("OOP! Your current password not correct!", {
        duration: 2000,
      });
    } else if (
      inputChangePassword.confirmPassword !== inputChangePassword.newPassword
    ) {
      return toast.error("OOP! Your confirm password seems wrong!", {
        duration: 2000,
      });
    } else if (
      inputChangePassword.currentPassword == inputChangePassword.newPassword
    ) {
      return toast.error("OOP! Your new password don't have change!", {
        duration: 2000,
      });
    }
    setDisableToggle(false);
    setTimeout(() => {
      setInputChangePassword({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setDisableToggle(true);
    }, 2000);

    return dispatch(thunk.userChangePassword(inputChangePassword.newPassword));
  };

  return (
    <>
      <div
        className={`${
          taskInfo == "password" ? "w-[70%]" : "w-0"
        }  flex flex-col justify-center items-center overflow-hidden transition-all duration-300`}
      >
        <div className="w-[90%] h-[90%] flex flex-col gap-4">
          <h1 className="border-b-[1px] border-solid border-[#BBB7A8] pb-4 mt-4 font-medium sm:text-sm">
            Password
          </h1>
          <div className="w-full flex gap-2">
            <div className="w-full flex items-center justify-between border-b-[1px] border-solid border-[#BBB7A8] pb-4">
              <label className="font-medium sm:text-sm">
                Current Password:
              </label>
              <div className="flex items-center gap-2 sm:text-sm w-[60%]">
                <input
                  type="password"
                  value={userPassword}
                  disabled={true}
                  className="bg-transparent w-full"
                />
              </div>
            </div>
          </div>
          <div className="w-full flex gap-2">
            <div className="w-full flex items-center justify-between border-b-[1px] border-solid border-[#BBB7A8] pb-4">
              <label className="font-medium sm:text-sm">
                Current password:
              </label>
              <div className="flex items-center gap-2 w-[60%]">
                <input
                  type="text"
                  className="text-sm p-0.5 w-full"
                  placeholder="Current passowrd..."
                  name="currentPassword"
                  value={inputChangePassword.currentPassword}
                  onChange={handleOnChangeInput}
                  spellCheck={false}
                />
              </div>
            </div>
          </div>
          <div className="w-full flex gap-2">
            <div className="w-full flex items-center justify-between border-b-[1px] border-solid border-[#BBB7A8] pb-4">
              <label className="font-medium sm:text-sm">New Password:</label>
              <div className="flex items-center gap-2 w-[60%]">
                <input
                  type="text"
                  className="text-sm p-0.5 w-full"
                  placeholder="New password..."
                  name="newPassword"
                  value={inputChangePassword.newPassword}
                  onChange={handleOnChangeInput}
                  spellCheck={false}
                />
              </div>
            </div>
          </div>
          <div className="w-full flex gap-2">
            <div className="w-full flex items-center justify-between border-b-[1px] border-solid border-[#BBB7A8] pb-4">
              <label className="font-medium sm:text-sm">
                Confirm Password:
              </label>
              <div className="flex items-center gap-2 w-[60%]">
                <input
                  type="text"
                  className="text-sm w-full p-0.5"
                  placeholder="Confirm password..."
                  name="confirmPassword"
                  value={inputChangePassword.confirmPassword}
                  onChange={handleOnChangeInput}
                  spellCheck={false}
                />
              </div>
            </div>
          </div>
          <div className="w-full flex gap-2 justify-center items-center">
            <button
              className="border-none box-border w-[30%] bg-[#F8A34F] rounded-3xl py-2 sm:text-sm active:scale-90 duration-75 transition-all"
              onClick={onClickSave}
            >
              Save
            </button>
            <button
              className="border-[1px] box-border border-black bg-transparent w-[30%] py-2 rounded-3xl sm:text-sm active:scale-90 duration-75 transition-all"
              onClick={onClickCancel}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
