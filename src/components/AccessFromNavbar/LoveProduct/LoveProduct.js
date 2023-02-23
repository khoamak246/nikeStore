import React from "react";
import LoveProductCount from "./LoveProductCount";
import LoveProductList from "./LoveProductList";
import { useSelector } from "react-redux";
import {
  toogleStateSelector,
  userLoveProductSelector,
} from "../../../redux/selectors/Selectors";
import LoveProductEmtyList from "./LoveProductEmtyList";

export default function LoveProduct() {
  const loveProduct = useSelector(userLoveProductSelector);
  const toogleState = useSelector(toogleStateSelector);
  return (
    <>
      <div className="flex w-10/12 m-auto justify-end sm:w-full">
        <div
          className={`${
            toogleState == "like"
              ? "w-[30%] sm:w-full lg:w-[40%] h-auto px-3 py-5"
              : "w-0 h-0"
          }  top-[9vh] flex flex-col gap-5 bg-white shadow-md shadow-slate-400 fixed z-[100] rounded-lg overflow-hidden transition-all duration-300`}
        >
          <LoveProductCount />
          {loveProduct.length > 0 ? (
            <div>
              {loveProduct?.map((val, index) => {
                return <LoveProductList key={index} item={val} />;
              })}
            </div>
          ) : (
            <div className="w-full flex justify-center items-center">
              <LoveProductEmtyList />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
