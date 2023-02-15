import React from "react";
import { Login, Register } from "../components/User-Component";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function User({ path }) {
  const [changeHeightContainer, setChangeHeightContainer] = useState(false);
  const [slidePictureTimer, setSlidePictureTimer] = useState(false);
  const [toggleForm, setToggleForm] = useState(false);
  useEffect(() => {
    const timeOutHeightContainer = setTimeout(() => {
      setChangeHeightContainer(true);
    }, 100);
    const isSlidePicture = setTimeout(() => {
      setSlidePictureTimer(true);
    }, 2000);
    const isToggle = setTimeout(() => {
      setToggleForm(true);
    }, 3500);
    return () => {
      clearTimeout(timeOutHeightContainer);
      clearTimeout(isSlidePicture);
      clearTimeout(isToggle);
    };
  }, []);
  return (
    <section
      className={`${
        changeHeightContainer ? "h-screen" : "h-0"
      } bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-[1.5s] ease-in-out flex justify-center items-center overflow-hidden`}
    >
      <div
        className={`${
          slidePictureTimer ? "w-[60%] rounded-3xl" : "w-[30%]"
        } h-[60%] md:w-[70%] md:h-[70%] overflow-hidden relative flex justify-end transition-all duration-1000 group`}
      >
        <div
          className={`${
            slidePictureTimer ? "w-[50%]" : "w-full"
          } h-full sm:hidden top-0 left-0 absolute transition-all duration-1000 cursor-pointer`}
        >
          <img
            src="https://firebasestorage.googleapis.com/v0/b/nikestore-61243.appspot.com/o/SignInOut%20Page%2FsignInOut-Img.jpg?alt=media&token=26a6b890-d835-4ff1-8ae7-838ef5f646cc"
            className="w-full h-full"
            alt="logo-img"
          />
        </div>
        {toggleForm ? (
          <div className="sm:hidden w-[50%] h-0 group-hover:h-full absolute top-0 left-0 bg-black bg-opacity-20 flex flex-col gap-2 justify-center items-center overflow-hidden transition-all duration-1000 ease-in-out cursor-pointer">
            <Link to="/" className="absolute top-0 left-0 w-full h-full"></Link>
            <img
              src="https://firebasestorage.googleapis.com/v0/b/nikestore-61243.appspot.com/o/Logo%2Flogo.png?alt=media&token=a296d610-5533-4482-8efe-0ad6f9d342dd"
              alt="home-icon"
              className="w-[50%] h-auto"
            />
            <p className="text-white text-2xl italic">GO SHOPPING</p>
          </div>
        ) : (
          ""
        )}

        <div
          className={`${
            toggleForm ? "w-[50%] sm:w-full" : "w-full"
          } h-full overflow-hidden bg-white flex items-center`}
        >
          <div
            className={`${
              toggleForm ? "w-full" : "w-[50%]"
            } duration-300 ease-in-out transition-all`}
          >
            {path == "/login" ? (
              <Login />
            ) : path == "/register" ? (
              <Register />
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
