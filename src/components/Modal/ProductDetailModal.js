import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toogleStateSelector } from "../../App/Selectors";
import { setOpenToogle } from "../../App/ToogleSlice";
export default function ProductDetailModal({ toogle, setToogle, info }) {
  const { name, price, avatar, detail, show } = info;
  const toogleState = useSelector(toogleStateSelector);
  const dispatch = useDispatch();
  const onChangeToogleState = () => {
    dispatch(setOpenToogle(""));
  };
  return (
    <>
      <div
        className={`fixed bg-black bg-opacity-50 h-[100vh] w-full top-0 left-0 z-[250] ${
          toogleState == "productDetail" ? "max-h-full" : "max-h-0"
        } transition-all duration-200`}
      >
        <div className="w-full h-full flex justify-center items-center">
          <div
            className={`bg-white w-[60%] md:w-full rounded-lg overflow-hidden ${
              toogleState == "productDetail" ? "h-[90%] md:h-full" : "h-0"
            } transition-all duration-500`}
          >
            <div className="w-full h-full p-5 overflow-y-auto overflow-x-hidden scroll-smooth">
              <div className="w-full flex items-center justify-between">
                <div className="flex items-center gap-5">
                  <div className="w-[10%]">
                    <img
                      src={avatar}
                      alt="prodcuct-avatar"
                      className="w-full"
                    />
                  </div>
                  <div>
                    <p>{name}</p>
                    <p>${price}</p>
                  </div>
                </div>
                <div className="cursor-pointer" onClick={onChangeToogleState}>
                  X
                </div>
              </div>
              <div className="w-full h-full flex flex-col gap-5 m-4">
                {detail?.map((val, index) => {
                  return val.type != "list" ? (
                    <div
                      className={`${
                        val.type == "header" && "flex flex-col gap-5"
                      }`}
                      key={index}
                    >
                      <h1>{val.title}</h1>
                      <p>{val.content[0]}</p>
                    </div>
                  ) : (
                    <div key={index}>
                      <h2>{val.title}</h2>
                      <ul className="list-disc">
                        {val.content.map((list, index) => {
                          return (
                            <li key={index}>
                              {list == "Shown:" ? `${list} ${show}` : list}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
