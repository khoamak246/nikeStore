import React from "react";
import { HeartIcon, StarIcon } from "@heroicons/react/24/outline";
import Rating from "./Rating";
import ProductDetailModal from "../Modal/ProductDetailModal";
import CommentModal from "../Modal/CommentModal";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, addToLoveProduct } from "../../App/UserSlice";
import { toast } from "react-hot-toast";
import { setOpenToogle } from "../../App/ToogleSlice";
import { userAuthorizedState } from "../../App/Selectors";
import CustomToast from "../ToastNotification/CustomToast";

export default function ProductOptions({
  productInfo,
  productId,
  typeId,
  catalog,
}) {
  const param = useParams();
  const navigate = useNavigate();
  const authorizedState = useSelector(userAuthorizedState);
  const dispatch = useDispatch();
  const { name, forGender, price, overview, style, type, detail } = productInfo;
  const [selectedProduct, setSelectedProduct] = useState();
  const [toogleComment, setToogleComment] = useState(false);
  const [slelectSize, setSlelectSize] = useState();

  const onChangeToogleState = (e) => {
    dispatch(setOpenToogle(e.target.id));
  };

  const updateStock = () => {
    const productIndex = catalog.findIndex((val) => {
      return val.id == productId;
    });
    const typeIndex = type.findIndex((val) => {
      return val.id == typeId;
    });
    const sizeIndex = selectedProduct.size.findIndex((val) => {
      return val.type === slelectSize.type;
    });
    let newSizeList = [...selectedProduct.size];
    newSizeList[sizeIndex] = {
      type: slelectSize.type,
      stock: slelectSize.stock - 1,
    };
    const newUpadatedProduct = { ...selectedProduct, size: newSizeList };
    const newTypeList = [...type];
    newTypeList[typeIndex] = newUpadatedProduct;
    const newCatalog = [...catalog];
    newCatalog[productIndex] = {
      ...newCatalog[productIndex],
      type: newTypeList,
    };
    setSlelectSize({ ...slelectSize, stock: slelectSize.stock - 1 });
    return newCatalog;
  };

  const onAddCart = () => {
    if (slelectSize && slelectSize.stock > 0) {
      const newCatalog = updateStock();

      dispatch(
        addToCart({
          productId: productId,
          typeId: typeId,
          name: name,
          img: selectedProduct.avatar,
          forGender: forGender,
          price: price,
          size: slelectSize.type,
          catalogName: param.catalogName,
          newCatalog: newCatalog,
          stock: slelectSize.stock - 1,
        })
      );
    } else {
      toast.error(
        `${
          slelectSize.stock > 0
            ? "OOP! You forgot to pick your size"
            : "OOP! This product sold out!"
        } `,
        { duration: 1500 }
      );
    }
  };

  const onAddLoveProduct = () => {
    dispatch(
      addToLoveProduct({
        productId: productId,
        typeId: typeId,
        catalog: productInfo.preview.catalog,
        name: name,
        img: selectedProduct.avatar,
        forGender: forGender,
      })
    );
  };

  useEffect(() => {
    let selectedProduct = [];
    let check = false;
    type.forEach((val) => {
      if (val.id == typeId) {
        selectedProduct = val;
        check = true;
      }
    });
    !check && navigate("*");
    setSelectedProduct(selectedProduct);
  }, [productInfo]);

  return (
    <>
      <CommentModal />

      <ProductDetailModal
        info={{
          detail: detail,
          name: name,
          price: price,
          avatar: selectedProduct?.avatar,
          show: selectedProduct?.name,
        }}
      />

      <div className="container flex flex-row gap-10">
        <div className="w-[70%] max-h-max grid grid-cols-2 gap-3">
          {selectedProduct?.img?.map((val) => {
            return val.type == "picture" ? (
              <div className="bg-white grid justify-center" key={val.url}>
                <img src={val.url} className="max-w-full" />
              </div>
            ) : (
              <div className="bg-white grid justify-center" key={val.url}>
                <video
                  autoPlay={true}
                  loop={true}
                  playsInline={true}
                  muted={true}
                  className="w-full"
                >
                  <source src={val.url} type="video/mp4" />
                </video>
              </div>
            );
          })}
        </div>

        <div className="w-[30%] flex flex-col gap-6 ">
          <div className="w-full">
            <div>
              <h1 className="text-3xl xsm:text-xl">{name}</h1>
              <p className="text-[1rem] xsm:text-sm">{`${forGender}'s shoes`}</p>
            </div>
            <p className="pt-6 xsm:text-sm">${price}</p>
          </div>

          <div className="grid grid-cols-5 w-full gap-1 xsm:grid-cols-4">
            {type?.map((val) => {
              return (
                <Link
                  to={`/productdetail/${productInfo.preview.catalog}/${productInfo.preview.productId}/${val.id}`}
                  key={val.id}
                >
                  <div
                    className={`grid items-center justify-center overflow-hidden rounded-lg cursor-pointer ${
                      typeId == val.id && "border-black border-[1px]"
                    }`}
                  >
                    <img src={val.avatar} className="max-w-full" />
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="flex flex-col gap-3">
            <div className="w-full flex justify-between text-xl">
              <h2 className="sm:text-sm xsm:text-[0.7rem]">Select size</h2>
              <h2 className="text-[#757575] sm:text-sm xsm:text-[0.7rem]">
                Size Guide
              </h2>
            </div>
            <div className="grid w-full grid-cols-5 gap-2 xsm:grid-cols-3">
              {selectedProduct?.size?.map((val, index) => {
                return (
                  <div
                    className={`grid items-center justify-center rounded-lg border-[1px] py-[1rem] sm:text-sm ${
                      val.stock == 0
                        ? "border-[#e5e5e5] text-[#DDDDDD] bg-[#F7F7F7] hover:cursor-default"
                        : "hover:border-black hover:cursor-pointer"
                    } ${
                      slelectSize?.type == val.type && val.stock > 0
                        ? "border-black"
                        : ""
                    }`}
                    key={index}
                    id={val.type}
                    onClick={(e) => {
                      val.stock > 0 && setSlelectSize(val);
                    }}
                  >
                    {val.type}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="z-0 flex flex-col justify-center items-center w-full font-[400]  sm:text-sm">
            <p>4 interest-free payments of $30.000 with</p>
            <p>
              <span className="font-medium  sm:text-sm">Klarna.</span>{" "}
              <a
                className="z-10 underline"
                href="https://www.klarna.com/us/"
                target="_blank"
              >
                Learn More
              </a>
            </p>
          </div>

          <div className="flex flex-col w-full gap-3">
            <button
              className="text-white bg-black rounded-[2rem] w-full] py-5 hover:bg-[#5A554F]  sm:text-sm"
              onClick={() => {
                if (authorizedState) {
                  onAddCart();
                } else {
                  toast.custom((t) => (
                    <CustomToast
                      title="OOP! Did you forgot something important?"
                      text="You need login to use this service!"
                      value="/login"
                      btn="Login"
                      id={t}
                    />
                  ));
                }
              }}
            >
              Add to Bag
            </button>
            <button
              className="border-[#ccc] border-[1px] rounded-[2rem] w-full py-5 hover:border-black  sm:text-sm"
              onClick={() => {
                if (authorizedState) {
                  onAddLoveProduct();
                } else {
                  toast.custom((t) => (
                    <CustomToast
                      title="OOP! Did you forgot something important?"
                      text="You need login to use this service!"
                      value="/login"
                      btn="Login"
                      id={t}
                    />
                  ));
                }
              }}
            >
              Favorite <HeartIcon className="w-5 h-5 inline-block" />
            </button>
          </div>

          <div className="flex flex-col gap-6 w-full z-0 break-words">
            <div className=" sm:text-sm">
              <p>Shipping*</p>
              <p>To get accurate shipping information Edit Location</p>
            </div>
            <div className=" sm:text-sm">
              <p>Free Pickup</p>
              <p>Find a Store</p>
            </div>
            <p className=" sm:text-sm">
              *Faster Shipping options may be available
            </p>
            <p className="py-5  sm:text-sm">{overview}</p>
            <ul>
              <li className=" sm:text-sm">Shown: {selectedProduct?.name}</li>
              <li className=" sm:text-sm">Style: {style}</li>
            </ul>
            <p
              className="underline underline-offset-8 z-10 cursor-pointer hover:text-[#5A554F]  sm:text-sm sm:underline-offset-2"
              id="productDetail"
              onClick={onChangeToogleState}
            >
              View Product Details
            </p>
          </div>

          <div className="w-full">
            <div className="w-full overflow-hidden relative z-0 border-t-[1px]">
              <input
                type="checkbox"
                className="absolute w-[100%] h-20 cursor-pointer opacity-0 z-10 peer"
              ></input>
              <div className="w-full p-7 xsm:p-0">
                <h2 className="text-[1.1rem]  sm:text-sm">
                  Free Shipping & Returns
                </h2>
              </div>
              <div className="rotate-0  peer-checked:rotate-180  transition-transform duration-500 absolute top-7 right-3 sm:hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 15.75l7.5-7.5 7.5 7.5"
                  />
                </svg>
              </div>
              <p className="w-full max-h-0 peer-checked:max-h-max transition-all duration-500 pl-7 text-sm xsm:p-0">
                Free standard shipping and free 60-day returns for Nike Members.{" "}
                <a
                  href="https://www.nike.com/help/a/free-shipping"
                  target="_blank"
                  className="underline"
                >
                  Learn more.
                </a>{" "}
                <a
                  href="https://www.nike.com/help/a/return-exceptions"
                  target="_blank"
                  className="underline"
                >
                  Return policy exclusions apply.
                </a>{" "}
                <a
                  href="https://www.nike.com/help/a/store-pickup"
                  target="_blank"
                  className="underline block my-5"
                >
                  Pick-up available at select Nike Stores.
                </a>
              </p>
            </div>
            <div className="w-full overflow-hidden relative z-0 border-y-[1px]">
              <input
                type="checkbox"
                className="absolute w-[100%] h-20 cursor-pointer opacity-0 z-10 peer"
              ></input>
              <div className="w-full p-7 xsm:p-0">
                <h2 className="text-[1.1rem]  sm:text-sm">Review(318)</h2>
              </div>
              <div className="absolute top-8 right-12 flex lg:hidden">
                <Rating size="4" />
              </div>
              <div className="rotate-0  peer-checked:rotate-180  transition-transform duration-500 absolute top-7 right-3 sm:hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 15.75l7.5-7.5 7.5 7.5"
                  />
                </svg>
                {/* <ChevronUpIcon className="w-5 h-5 rotate-0  peer-checked:rotate-180  transition-all duration-500" /> */}
              </div>
              <div
                className={`w-full max-h-0 peer-checked:max-h-[733px] xsm:peer-checked:max-h-[800px] xxsm:peer-checked:max-h-[870px] transition-all duration-500 pl-7 xsm:p-0 ${
                  toogleComment
                    ? "overflow-y-auto scroll-smooth"
                    : "overflow-y-hidden"
                }`}
              >
                <div className="w-full flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <div className="flex sm:hidden">
                      <Rating size="4" />
                    </div>
                    <div className="hidden sm:block">
                      <StarIcon className="w-4 h-4 fill-black" />
                    </div>
                    <p className=" sm:text-sm">4.4 Stars</p>
                  </div>
                  <p
                    className="cursor-pointer sm:text-sm underline underline-offset-8 xsm:underline-offset-2"
                    id="review"
                    onClick={onChangeToogleState}
                  >
                    Write a Review
                  </p>
                </div>
                <div className="w-full mt-10 flex flex-col gap-2">
                  <p className="text-[0.9rem]">Great!</p>
                  <div className="flex gap-2 items-center">
                    <div className="flex md:hidden">
                      <Rating size="4" />
                    </div>
                    <div className="hidden flex-row md:flex">
                      <StarIcon className="fill-black w-4 h-4" />
                      <p className="text-sm">4+</p>
                    </div>
                    <p className="text-[#757575] text-[0.6rem]">
                      Carmen - Dec 08, 2022
                    </p>
                  </div>
                  <p className="text-[0.9rem] ">
                    Very comfy and great to walk. May be a bit snug if you have
                    wider feet but overall very comfy.
                  </p>
                </div>
                <div className="w-full mt-10 flex flex-col gap-2">
                  <p className="text-[0.9rem]">Great!</p>
                  <div className="flex gap-2 items-center">
                    <div className="flex md:hidden">
                      <Rating size="4" />
                    </div>
                    <div className="hidden flex-row md:flex">
                      <StarIcon className="fill-black w-4 h-4" />
                      <p className="text-sm">4+</p>
                    </div>
                    <p className="text-[#757575] text-[0.6rem]">
                      Carmen - Dec 08, 2022
                    </p>
                  </div>
                  <p className="text-[0.9rem]">
                    Very comfy and great to walk. May be a bit snug if you have
                    wider feet but overall very comfy.
                  </p>
                </div>
                <div
                  className={`w-full mt-10 flex flex-col gap-2 ${
                    toogleComment ? "flex" : "hidden"
                  }`}
                >
                  <p className="text-[0.9rem]">Great!</p>
                  <div className="flex gap-2 items-center">
                    <div className="flex md:hidden">
                      <Rating size="4" />
                    </div>
                    <div className="hidden flex-row md:flex">
                      <StarIcon className="fill-black w-4 h-4" />
                      <p className="text-sm">4+</p>
                    </div>
                    <p className="text-[#757575] text-[0.6rem]">
                      Carmen - Dec 08, 2022
                    </p>
                  </div>
                  <p className="text-[0.9rem]">
                    Very comfy and great to walk. May be a bit snug if you have
                    wider feet but overall very comfy.
                  </p>
                </div>

                <div
                  className={`w-full mt-10 flex flex-col gap-2 ${
                    toogleComment ? "flex" : "hidden"
                  }`}
                >
                  <p className="text-[0.9rem]">Great!</p>
                  <div className="flex gap-2 items-center">
                    <div className="flex md:hidden">
                      <Rating size="4" />
                    </div>
                    <div className="hidden flex-row md:flex">
                      <StarIcon className="fill-black w-4 h-4" />
                      <p className="text-sm">4+</p>
                    </div>
                    <p className="text-[#757575] text-[0.6rem]">
                      Carmen - Dec 08, 2022
                    </p>
                  </div>
                  <p className="text-[0.9rem]">
                    Very comfy and great to walk. May be a bit snug if you have
                    wider feet but overall very comfy.
                  </p>
                </div>
                <p
                  className="underline underline-offset-8 my-10 cursor-pointer  sm:text-sm xsm:underline-offset-2"
                  onClick={() => setToogleComment(!toogleComment)}
                >
                  {toogleComment ? "Return" : "More Reviews"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
