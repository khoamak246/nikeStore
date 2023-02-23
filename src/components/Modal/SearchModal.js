import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toogleStateSelector } from "../../redux/selectors/Selectors";
import { setOpenToogle } from "../../redux/reducers/ToogleSlice";

function SearchModal() {
  const toogleState = useSelector(toogleStateSelector);
  const dispatch = useDispatch();
  const onChangeToogleState = () => {
    dispatch(setOpenToogle(""));
  };
  return (
    <>
      <div
        className={`${
          window.innerWidth <= 375
            ? `fixed top-0 left-0 ${
                toogleState == "search" ? "h-[30%]" : "h-0"
              }  w-full bg-white flex justify-end z-[250] duration-300 transition-all overflow-hidden`
            : "w-0 h-0 overflow-hidden"
        }`}
      >
        <div className="w-full flex justify-center gap-1 pt-3">
          <div className="w-[70%] h-[15%] flex justify-betweenm items-center px-1 border-solid border-[1px] border-black rounded-3xl overflow-hidden">
            <input
              type="text"
              placeholder="Enter product..."
              className="text-[0.6rem] py-1 pl-1 outline-none w-[95%] h-full items-center"
            />
            <div>
              <MagnifyingGlassIcon className="w-3 h-3 cursor-pointer" />
            </div>
          </div>
          <div className="flex items-center h-[15%]">
            <p
              className="text-[0.6rem] cursor-pointer"
              onClick={onChangeToogleState}
            >
              Cancel
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default SearchModal;
