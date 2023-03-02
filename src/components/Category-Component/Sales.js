import { ShoppingBagIcon, StarIcon } from "@heroicons/react/24/solid";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLoadingState } from "../../redux/reducers/PageSlice";
import { setOpenToogle } from "../../redux/reducers/ToogleSlice";

export default function Sales({ endpoint }) {
  const dispatch = useDispatch();
  const { title, items } = endpoint;
  const navigate = useNavigate();
  return (
    <>
      <div className="nike-container">
        <div className="grid items-center">
          <h1 className="text-5xl lg:text-4xl md:text-3xl font-bold text-slate-900 filter drop-shadow-lg">
            {title}
          </h1>
        </div>
        <div
          className={`grid items-center justify-items-center gap-7 lg:gap5 mt-7 grid-cols-3 xl:grid-cols-2 sm:grid-cols-1`}
        >
          {items?.map((item, index) => {
            return (
              <div
                key={index}
                className={`relative bg-gradient-to-b ${item.color} ${item.shadow} grid items-center 
                justify-items-start rounded-xl py-4 px-5 transition-all duration-700 ease-in-out w-full hover:scale-105`}
              >
                <div className={`grid items-center justify-items-start`}>
                  <h1 className="text-slate-200 text-xl lg:text-lg md:text-base font-medium filter drop-shadow">
                    {item.name}
                  </h1>
                  <p className="text-slate-200 filter drop-shadow text-base md:text-sm font-normal">
                    {item.forGender} shoes
                  </p>

                  <div className="flex items-center justify-between w-28 my-2">
                    <div className="flex items-center bg-white/80 px-1 rounded blur-effect-theme">
                      <h1 className="text-black text-sm font-medium">
                        ${item.price}
                      </h1>
                    </div>
                    <div className="flex items-center gap-1">
                      <StarIcon className="icon-style w-5 h-5 md:w-4 md:h-4" />
                      <h1 className="md:text-sm font-normal text-slate-100">
                        {item.rating}
                      </h1>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      className="bg-white/90 blur-effect-theme button-theme p-0.5 shadow shadow-sky-200"
                      onClick={() => {
                        dispatch(setLoadingState());
                        dispatch(setOpenToogle(""));
                        navigate(
                          `/productdetail/${item.preview.catalog}/${item.preview.productId}/${item.preview.typeId}`
                        );
                      }}
                    >
                      <ShoppingBagIcon className="icon-style text-slate-900" />
                    </button>
                    <button
                      type="button"
                      className="bg-white/90 blur-effect-theme button-theme px-2 py-1 shadow shadow-sky-200 text-sm text-black "
                      onClick={() => {
                        dispatch(setLoadingState());
                        dispatch(setOpenToogle(""));
                        navigate(
                          `/productdetail/${item.preview.catalog}/${item.preview.productId}/${item.preview.typeId}`
                        );
                      }}
                    >
                      Buy now
                    </button>
                  </div>
                </div>
                <div className={`flex items-center absolute top-5 right-1`}>
                  <img
                    src={item.preview.previewImg}
                    alt={`img/item-img/${item.id}`}
                    className={`transitions-theme hover:-rotate-12 h-auto w-64 lg:w-56 md:w-48 -rotate-[35deg]`}
                    onClick={() => {
                      dispatch(setLoadingState());
                      dispatch(setOpenToogle(""));
                      navigate(
                        `/productdetail/${item.preview.catalog}/${item.preview.productId}/${item.preview.typeId}`
                      );
                    }}
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
