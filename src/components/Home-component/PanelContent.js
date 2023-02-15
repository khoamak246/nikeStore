import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function PanelContent({ contentPanel, ifExists }) {
  const [changePanelImgHref, setChangePanelImgHref] = useState(false);
  useEffect(() => {
    const changeHref = () => {
      window.innerWidth <= 566
        ? setChangePanelImgHref(true)
        : setChangePanelImgHref(false);
    };
    window.addEventListener("resize", changeHref);

    return () => {
      window.removeEventListener("resize", changeHref);
    };
  }, [changePanelImgHref]);

  return (
    <>
      <div className="w-full flex flex-col gap-5">
        <p className="text-2xl font-[400]">{contentPanel?.contentName}</p>
        <div className="w-full flex flex-col justify-center items-center text-center gap-10">
          <div className="w-full relative">
            {ifExists ? (
              contentPanel?.url ? (
                <Link
                  to={contentPanel.url}
                  className="absolute top-0 left-0 w-full h-full z-10"
                ></Link>
              ) : (
                ""
              )
            ) : (
              <a
                href="https://www.nike.com/w/jordan-37eef"
                className="absolute top-0 left-0 w-full h-full z-10"
              ></a>
            )}
            <p className="absolute top-40 xsm:top-36 xxsm:top-32 right-[-125px] xsm:right-[-100px] xxsm:right-[-90px] md:w-[50%] sm:w-[65%] xsm:w-[90%] xxsm:w-full sm:text-[0.8rem] text-white text-sm rotate-90 w-[30%] text-left md:text-sm">
              {contentPanel?.description}
            </p>
            {ifExists ? (
              contentPanel?.img ? (
                <video
                  autoPlay={true}
                  playsInline={true}
                  loop={true}
                  muted={true}
                >
                  <source src={contentPanel?.img} type="video/mp4" />
                </video>
              ) : (
                ""
              )
            ) : (
              <img
                src={
                  contentPanel?.responsiveImg
                    ? changePanelImgHref
                      ? contentPanel?.responsiveImg
                      : contentPanel?.img
                    : contentPanel?.img
                }
                alt="panelContentImg"
              />
            )}
          </div>
          <div className="w-[50%] sm:w-full sm:justify-items-start sm:items-start sm:text-left text-center flex flex-col gap-6 items-center justify-items-center">
            <h1 className="text-6xl font-bold sm:text-4xl uppercase">
              {contentPanel?.title} <br /> {contentPanel?.subTitle}
            </h1>
            <p className="w-[85%] sm:text-sm">{contentPanel?.text}</p>
            {ifExists ? (
              <div className="w-full flex justify-center items-center">
                {contentPanel?.url && (
                  <Link to={contentPanel.url}>
                    <button className="rounded-3xl bg-black text-white p-2 hover:bg-[#5A554F] ">
                      {contentPanel.btn}
                    </button>
                  </Link>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 sm:flex sm:justify-start sm:w-full xxsm:flex-col xxsm:w-[70%]">
                {contentPanel?.url1 && (
                  <Link to={contentPanel.url1}>
                    <button className="rounded-3xl bg-black text-white p-2 hover:bg-[#5A554F] md:text-[0.8rem]">
                      {contentPanel.btn1}
                    </button>
                  </Link>
                )}
                {contentPanel?.url2 && (
                  <Link to={contentPanel.url2}>
                    <button className="rounded-3xl bg-black text-white p-2 hover:bg-[#5A554F] md:text-[0.8rem]">
                      {contentPanel.btn2}
                    </button>
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
