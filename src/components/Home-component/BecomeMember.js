import React from "react";
import { Link } from "react-router-dom";

export default function BecomeMember({ membership }) {
  return (
    <>
      <div className="w-full flex flex-col gap-5 mb-10">
        <p className="text-2xl font-[400]">{membership?.contentName}</p>
        <div className="w-full bg-becomeMember sm:bg-becomeMember2 bg-cover lg:bg-[30%] md:bg-[40%]  bg-no-repeat">
          <div className="w-full text-white flex flex-col gap-4 py-10 sm:pt-72 pl-10 xxsm:pl-5 ">
            <h3 className="text-5xl font-black xxsm:text-3xl">
              {membership?.banner?.title} <br /> {membership?.banner?.subTitle}
            </h3>
            <p className="text-sm xxsm:text-[0.7rem]">
              {membership?.banner?.text}
            </p>
            <div className="flex gap-2 xxsm:flex-col xxsm:w-[50%]">
              <button className="bg-white text-black py-2 px-5 rounded-3xl hover:bg-[#b2b2b2]">
                <Link to="/register">{membership?.banner?.btn1}</Link>
              </button>
              <button className="bg-white text-black py-2 px-5 rounded-3xl hover:bg-[#b2b2b2]">
                <Link to="/login">{membership?.banner?.btn2}</Link>
              </button>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-1">
          {membership?.stories?.map((cur, index) => {
            return (
              <div className="relative w-full" key={index}>
                <a
                  href={cur.url}
                  className="absolute top-0 left-0 w-full h-full z-10"
                  target="_blank"
                ></a>
                <img src={cur.img} alt="becomMember-img1" className="w-full" />
                <div className="absolute bottom-5 left-0 w-full pl-10 lg:pl-0 z-0">
                  <p className="text-sm">{cur.title}</p>
                  <p className="text-[1.4rem] w-[80%] font-[400]">{cur.text}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
