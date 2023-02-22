import React from "react";
import { MinusIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "../../../App/UserSlice";
import { toast } from "react-hot-toast";

export default function SideListItem({ item }) {
  const {
    productId,
    typeId,
    name,
    price,
    size,
    forGender,
    img,
    cartQuantity,
    newCatalog,
    catalogName,
    stock,
  } = item;

  const dispatch = useDispatch();

  const handleUpdateProduct = (action) => {
    const propductIndex = newCatalog.findIndex((val) => {
      return val.id == productId;
    });

    const typeIndex = newCatalog[propductIndex].type.findIndex((val) => {
      return val.id == typeId;
    });

    const sizeIndex = newCatalog[propductIndex].type[typeIndex].size.findIndex(
      (val) => {
        return val.type == size;
      }
    );
    const newSizelist = [...newCatalog[propductIndex].type[typeIndex].size];
    const sizeUpdate = { ...newSizelist[sizeIndex] };
    if (action == "increase") {
      sizeUpdate.stock -= 1;
    } else if (action == "decrease") {
      sizeUpdate.stock += 1;
    } else if (action == "remove") {
      sizeUpdate.stock += cartQuantity;
    }
    newSizelist[sizeIndex] = sizeUpdate;

    const newTypeList = [...newCatalog[propductIndex].type];
    const typeUpdate = {
      ...newCatalog[propductIndex].type[typeIndex],
      size: newSizelist,
    };
    newTypeList[typeIndex] = typeUpdate;

    const newCataloglist = [...newCatalog];
    const catalogUpdate = {
      ...newCataloglist[propductIndex],
      type: newTypeList,
    };
    newCataloglist[propductIndex] = catalogUpdate;

    return newCataloglist;
  };

  const onRemoveProduct = () => {
    const newUpdateProductInfo = handleUpdateProduct("remove");
    dispatch(
      removeFromCart({
        catalogName,
        typeId,
        size,
        newUpdateProductInfo,
      })
    );
  };

  const onIncreaseCartQuantity = () => {
    const newUpdateProductInfo = handleUpdateProduct("increase");
    if (stock > 0) {
      dispatch(
        increaseQuantity({
          catalogName,
          typeId,
          size,
          newUpdateProductInfo,
        })
      );
    } else {
      toast.error("OOP! This product sold out!");
    }
  };

  const onDecreaseQuantity = () => {
    const newUpdateProductInfo = handleUpdateProduct("decrease");

    dispatch(
      decreaseQuantity({
        catalogName,
        typeId,
        size,
        newUpdateProductInfo,
      })
    );
  };
  return (
    <>
      <div className="w-full flex p-5 gap-3 xxsm:flex-col bg-[#e2dfdb] rounded-xl">
        <div className="rounded overflow-hidden w-[15%] xxsm:w-full flex items-center justify-center hover:scale-105 transition-all duration-75">
          <img
            src={img}
            alt={`img/cart-item/${typeId}`}
            className="w-20 h-auto"
          />
        </div>
        <div className="flex flex-col w-[85%] xxsm:w-full gap-2">
          <div className="flex justify-between">
            <div>
              <h1 className="font-medium text-lg text-slate-900 xsm:text-sm">
                {name}
              </h1>
              <div className="flex justify-between">
                <p className="text-sm text-slate-800">{forGender}'s shoes</p>
                <p className="text-sm text-slate-800">size: {size}</p>
              </div>
            </div>
            <div>
              <h1 className="text-lg text-slate-900 font-medium xsm:text-sm">
                ${price * cartQuantity}
              </h1>
            </div>
          </div>
          <div className="flex justify-between xxsm:justify-center items-center xxsm:w-full xxsm:gap-2">
            <div className="flex justify-between w-[30%]">
              <button
                type="button"
                className="bg-theme-cart rounded flex items-center justify-center active:scale-90"
                onClick={onDecreaseQuantity}
              >
                <MinusIcon className="w-5 h-5 lg:w-4 lg:h-4 stroke-[2] text-white" />
              </button>
              <div className="flex justify-center items-center">
                <p className="bg-theme-cart rounded text-white font-medium w-7 h-6 xsm:w-6 xsm:h-5 text-center xsm:text-sm">
                  {cartQuantity}
                </p>
              </div>
              <button
                type="button"
                className="bg-theme-cart rounded flex items-center justify-center active:scale-90"
                onClick={onIncreaseCartQuantity}
              >
                <PlusIcon className="w-5 h-5 lg:w-4 lg:h-4 stroke-[2] text-white" />
              </button>
            </div>
            <div className="grid items-center justify-items-center">
              <button
                type="button"
                className="bg-theme-cart rounded p-1 grid items-center justify-items-center active:scale-90"
                onClick={onRemoveProduct}
              >
                <TrashIcon className="w-5 h-5 text-white lg:w-4 lg:h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
