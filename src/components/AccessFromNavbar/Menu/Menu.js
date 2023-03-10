import React, { useMemo } from "react";
import {
  ArrowRightOnRectangleIcon,
  HomeIcon,
  BookmarkSquareIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/solid";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import PersonalInfo from "../../Modal/PersonalInfo";
import { useDispatch, useSelector } from "react-redux";
import {
  toogleStateSelector,
  userAvatarSelector,
  userDisplayNameSelector,
} from "../../../redux/selectors/Selectors";
import { setOpenToogle } from "../../../redux/reducers/ToogleSlice";
import { setUserLogout } from "../../../redux/reducers/UserSlice";
import { useNavigate } from "react-router-dom";

export default function Menu() {
  const navigate = useNavigate();
  const userDisplayName = useSelector(userDisplayNameSelector);
  const userAvatar = useSelector(userAvatarSelector);
  const tootgleSate = useSelector(toogleStateSelector);
  const dispatch = useDispatch();

  const onChangeToogleState = (e) => {
    dispatch(setOpenToogle(e.target.id));
  };

  const onSignOut = () => {
    dispatch(setUserLogout());
    dispatch(setOpenToogle(""));
    navigate("/login");
  };

  const displayAvatar = useMemo(() => {
    let sortName = userDisplayName.split(" ");
    return sortName[sortName.length - 1][0];
  }, [userDisplayName]);

  return (
    <>
      <div className={`flex nike-container justify-end overflow-hidden`}>
        <div
          className={`${
            tootgleSate == "menu"
              ? "h-auto px-3 py-5 transition-all duration-500"
              : "h-0"
          } w-[30%] md:w-[60%] top-[9vh] flex flex-col gap-5 bg-white shadow-md shadow-slate-400 fixed z-[100] rounded-lg overflow-hidden`}
        >
          <div
            className="w-full shadow-lg shadow-[#606770] rounded-lg overflow-hidden cursor-pointer"
            id="menuModalContainer"
            onClick={onChangeToogleState}
          >
            <div
              className="w-full flex items-center gap-2 py-2 pl-3 hover:bg-[#F2F3F5] group"
              id="menuModalContainer"
            >
              <div
                className="inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-[#e4e6eb] rounded-full group-hover:scale-105 transition-all duration-250 xxsm:hidden"
                id="menuModalContainer"
              >
                {userAvatar.length > 0 ? (
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/nikestore-61243.appspot.com/o/asset%2Fimg%2Fhightlightimg.png?alt=media&token=d00c7765-e7fa-4791-9b58-bd875a6ed7e7"
                    alt=""
                    className="object-contain w-full h-full"
                  />
                ) : (
                  <span
                    className=" text-gray-600 dark:text-gray-300 font-semibold"
                    id="menuModalContainer"
                  >
                    {displayAvatar}
                  </span>
                )}
              </div>
              <p
                className="xxsm:text-[0.6rem] group-hover:text-[1.1rem] transition-all duration-250 xxsm:text-sm"
                id="menuModalContainer"
              >
                {userDisplayName}
              </p>
            </div>
            <div className="w-full xxsm:text-[0.6rem] xxsm:p-1 xxsm-hover:bg-[#e4e6eb] xxsm-hover: border-t-2 pl-3 hover:bg-[#e4e6eb] hover:text-[1.1rem] transition-all duration-250 py-3">
              <p id="menuModalContainer">Personal infomation</p>
            </div>
          </div>

          <div className="hidden sm:flex items-center justify-between w-full xxsm:text-sm p-3 hover:bg-[#F2F3F5] hover:py-[0.8rem] transition-all duration-250 py-2 rounded-lg group">
            <div className="flex gap-2 items-center group-hover:scale-110 transition-all duration-250">
              <div className="rounded-full bg-[#e4e6eb] p-2">
                <HomeIcon className="w-6 h-6" />
              </div>
              <p>Home</p>
            </div>
            <div className="group-hover:scale-110 transition-all duration-250 xxsm:hidden">
              <ChevronRightIcon className="w-6 h-6" />
            </div>
          </div>

          <div className="hidden sm:flex items-center justify-between w-full xxsm:text-sm p-3 hover:bg-[#F2F3F5] hover:py-[0.8rem] transition-all duration-250 py-2 rounded-lg group">
            <div className="flex gap-2 items-center group-hover:scale-110 transition-all duration-250">
              <div className="rounded-full bg-[#e4e6eb] p-2">
                <BookmarkSquareIcon className="w-6 h-6" />
              </div>
              <p>Category</p>
            </div>
            <div className="group-hover:scale-110 transition-all duration-250">
              <ChevronRightIcon className="w-6 h-6 xxsm:hidden" />
            </div>
          </div>

          <div className="hidden sm:flex items-center justify-between w-full xxsm:text-sm p-3 hover:bg-[#F2F3F5] hover:py-[0.8rem] transition-all duration-250 py-2 rounded-lg group">
            <div className="flex gap-2 items-center group-hover:scale-110 transition-all duration-250">
              <div className="rounded-full bg-[#e4e6eb] p-2 ">
                <InformationCircleIcon className="w-6 h-6" />
              </div>
              <p>About</p>
            </div>
            <div className="group-hover:scale-110 transition-all duration-250">
              <ChevronRightIcon className="w-6 h-6 xxsm:hidden" />
            </div>
          </div>

          <div
            className="flex items-center justify-between w-full xxsm:text-sm p-3 hover:bg-[#F2F3F5] hover:py-[0.8rem] transition-all duration-250 py-2 rounded-lg group cursor-pointer"
            onClick={onSignOut}
          >
            <div className="flex gap-2 items-center group-hover:scale-110 transition-all duration-250">
              <div className="rounded-full bg-[#e4e6eb] p-2">
                <ArrowRightOnRectangleIcon className="w-6 h-6" />
              </div>
              <button>Sign Out</button>
            </div>
            <div className="group-hover:scale-110 transition-all duration-250">
              <ChevronRightIcon className="w-6 h-6 xxsm:hidden" />
            </div>
          </div>
        </div>
      </div>
      <PersonalInfo />
    </>
  );
}
