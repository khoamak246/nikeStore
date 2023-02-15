import { Menu, Cart, LoveProduct, Search } from "../AccessFromNavbar";
import React, { useEffect, useState, useRef, useMemo } from "react";
import {
  HeartIcon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  Bars3BottomLeftIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  userCartSelector,
  toogleStateSelector,
  userAuthorizedState,
} from "../../App/Selectors";
import SearchModal from "../Modal/SearchModal";
import { useDispatch } from "react-redux";
import { setOpenToogle } from "../../App/ToogleSlice";
import UpdateAddressModal from "../Modal/UpdateAddressModal";
import { toast } from "react-hot-toast";
import CustomToast from "../ToastNotification/CustomToast";

const Navbar = ({ path }) => {
  const authorizedState = useSelector(userAuthorizedState);
  const cartItems = useSelector(userCartSelector);
  const toogleState = useSelector(toogleStateSelector);
  const dispatch = useDispatch();
  const [navState, setNavState] = useState(false);
  const focusSearchInput = useRef(null);

  const onNavScroll = () => {
    if (window.scrollY > 30) {
      setNavState(true);
    } else {
      setNavState(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", onNavScroll);

    return () => {
      window.removeEventListener("scroll", onNavScroll);
    };
  }, []);

  useEffect(() => {
    toogleState == "search" && focusSearchInput.current.focus();
  }, [toogleState]);

  const onChangeToogleState = (e) => {
    dispatch(setOpenToogle(e.target.id));
  };

  const totalQuantity = useMemo(() => {
    const totalNumberItems = cartItems.reduce((total, cur) => {
      return total + cur.cartQuantity;
    }, 0);
    return totalNumberItems;
  }, [cartItems]);

  return (
    <>
      <header
        className={
          !navState
            ? "absolute top-3 left-0 right-0 opacity-100 z-50"
            : "fixed top-0 left-0 right-0 h-[9vh] flex items-center justify-center opacity-100 z-[200] blur-effect-theme"
        }
      >
        <nav
          className={`flex items-center justify-between nike-container ${
            path == "/login" ? "hidden" : path == "/register" ? "hidden" : ""
          }`}
        >
          <div className="flex items-center">
            <Link to="/">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/nikestore-61243.appspot.com/o/Logo%2Flogo.png?alt=media&token=a296d610-5533-4482-8efe-0ad6f9d342dd"
                alt="logo/img"
                id="home"
                className={`w-16 h-auto ${navState && "filter brightness-0"}`}
                onClick={onChangeToogleState}
              />
            </Link>
          </div>
          <div
            className={` ${
              window.innerWidth <= 375
                ? "w-0 h-0 overflow-hidden"
                : "flex w-full justify-center items-center gap-1 pl-14"
            }`}
          >
            <div
              className={`${
                toogleState == "search"
                  ? `w-[50%] border-[1px] ${
                      navState ? "border-black" : "border-slate-200"
                    } transition-all duration-500 ease-in-out`
                  : "w-0 transition-all duration-100"
              }  border-solid  rounded-3xl px-4`}
            >
              {toogleState == "search" ? (
                <Search
                  focusSearchInput={focusSearchInput}
                  navState={navState}
                />
              ) : (
                <ul className="flex items-center justify-center gap-2 sm:hidden">
                  <li
                    className={`grid items-center cursor-pointer filter ${
                      path == "/" ? "border-solid border-b-2" : ""
                    } rounded-b-sm drop-shadow text-base md:text-sm font-normal ${
                      navState
                        ? `text-slate-900 border-b-slate-900`
                        : "text-slate-200"
                    } transition-all duration-100 `}
                  >
                    <Link to="/" id="home" onClick={onChangeToogleState}>
                      Home
                    </Link>
                  </li>
                  <li
                    className={`grid items-center cursor-pointer filter ${
                      path.includes("/category")
                        ? "border-solid border-b-2"
                        : ""
                    } rounded-b-sm drop-shadow text-base md:text-sm font-normal ${
                      navState
                        ? "text-slate-900 border-b-slate-900"
                        : "text-slate-200"
                    } transition-all duration-100`}
                  >
                    <Link
                      to="/category"
                      id="category"
                      onClick={onChangeToogleState}
                    >
                      Category
                    </Link>
                  </li>
                  <li
                    className={`grid items-center cursor-pointer filter ${
                      path == "/about" ? "border-solid border-b-2" : ""
                    } rounded-b-sm drop-shadow text-base md:text-sm font-normal ${
                      navState
                        ? "text-slate-900 border-b-slate-900"
                        : "text-slate-200"
                    } transition-all duration-100`}
                  >
                    <Link to="/about" id="about" onClick={onChangeToogleState}>
                      About
                    </Link>
                  </li>
                </ul>
              )}
            </div>
            <div
              className={`${
                toogleState == "search" ? "block cursor-pointer" : "hidden"
              } ${navState ? "text-slate-900" : "text-slate-200"}`}
              onClick={() => {
                dispatch(setOpenToogle(""));
              }}
            >
              <p className="sm:text-sm">Cancel</p>
            </div>
          </div>

          <ul className="flex items-center justify-center gap-2">
            <li
              className={`grid items-center ${
                toogleState == "search" ? "hidden" : "block"
              }`}
              id="search"
            >
              <MagnifyingGlassIcon
                className={`icon-style ${
                  navState && "text-slate-900 transition-all duration-300"
                }`}
                id="search"
                onClick={onChangeToogleState}
              />
            </li>
            <li className="grid items-center" id="like">
              <HeartIcon
                className={`icon-style ${
                  navState && "text-slate-900 transition-all duration-300"
                }`}
                id="like"
                onClick={(e) => {
                  if (authorizedState) {
                    onChangeToogleState(e);
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
              />
            </li>
            <li className="grid items-center">
              <button
                type="button"
                className="border-none outline-none active:scale-110 transition-all duration-300 relative"
              >
                <ShoppingBagIcon
                  className={`icon-style ${
                    navState && "text-slate-900 transition-all duration-300"
                  }`}
                  id="cart"
                  onClick={(e) => {
                    if (authorizedState) {
                      onChangeToogleState(e);
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
                />
                <div
                  className={`absolute top-4 right-0 shadow w-4 h-4 text-[0.65rem] leading-tight font-medium rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-all duration-300 ${
                    navState
                      ? "bg-slate-900 text-slate-100 shadow-slate-900"
                      : "bg-slate-100 text-slate-900 shadow-slate-100"
                  }`}
                  id="cart"
                  onClick={(e) => {
                    if (authorizedState) {
                      onChangeToogleState(e);
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
                  {totalQuantity}
                </div>
              </button>
            </li>
            <li className="grid items-center" id="menu">
              <Link to="/login">
                <ArrowRightOnRectangleIcon
                  className={`icon-style ${
                    navState && "text-slate-900 transition-all duration-300"
                  } ${authorizedState ? "hidden" : ""}`}
                />
              </Link>

              <button
                type="button"
                className={`border-none outline-none active:scale-110 transition-all duration-300 relative ${
                  authorizedState ? "" : "hidden"
                }`}
              >
                <Bars3BottomLeftIcon
                  className={`icon-style ${
                    navState && "text-slate-900 transition-all duration-300"
                  }`}
                  id="menu"
                  onClick={onChangeToogleState}
                />
              </button>
            </li>
          </ul>
        </nav>
      </header>
      <Menu />
      <Cart />
      <LoveProduct />
      <SearchModal />
      <UpdateAddressModal />
    </>
  );
};

export default Navbar;
