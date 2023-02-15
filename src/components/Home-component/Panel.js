import React, { useEffect, useState } from "react";
import { memo } from "react";
import { Link } from "react-router-dom";

function Panel({ panelScale, panel }) {
  const { title, url, text, btn } = panel;
  return (
    <>
      <div
        className={`w-full relative flex flex-col justify-center items-center duration-1000 transition-all gap-10`}
      >
        <div
          className={`w-full ${
            panelScale
              ? "scale-100 mt-[26vh] lg:mt-[20vh] md:mt-[26vh]"
              : "scale-110 lg:scale-100 mt-0"
          } duration-1000 transition-all`}
        >
          <video
            autoPlay={true}
            playsInline={true}
            loop={true}
            muted={true}
            key={panel.img}
          >
            <source src={panel.img} type="video/mp4" />
          </video>
        </div>
        <div className="w-[50%] sm:w-full text-center sm:text-left sm:justify-items-start sm:items-start flex flex-col gap-6 items-center justify-items-center">
          <h1 className="text-6xl sm:text-4xl font-bold uppercase">{title}</h1>
          <p className="w-[80%] sm:w-[90%] sm:text-sm">{text}</p>
          <button className="rounded-3xl bg-black text-white p-2">{btn}</button>
        </div>
        {url && (
          <Link to={url} className="absolute top-0 left-0 w-full h-full"></Link>
        )}
      </div>
    </>
  );
}
export default memo(Panel);
