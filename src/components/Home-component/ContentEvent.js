import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function ContentEvent({ contentEvent }) {
  const [changePanelImgHref, setChangePanelImgHref] = useState(true);
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
        <p className="text-2xl font-[400]">{contentEvent?.contentName}</p>
        <div className="w-full grid grid-cols-2 gap-3 sm:grid-cols-1">
          {contentEvent?.content?.map((cur, index) => {
            return (
              <div className="w-full relative" key={index}>
                <img
                  src={
                    cur.responsiveImg
                      ? changePanelImgHref
                        ? cur.responsiveImg
                        : cur.img
                      : cur.img
                  }
                  alt="content-img/1"
                  className="w-full"
                />
                {cur.url && (
                  <Link
                    to={cur.url}
                    className="absolute w-full h-full top-0 left-0"
                  >
                    <div className="absolute bottom-14 left-11 xsm:bottom-3 xsm:left-8 text-white">
                      <p className="md:text-sm">{cur.title}</p>
                      <h3 className="text-2xl md:text-xl">{cur.subTitle}</h3>
                      <button className="text-black rounded-3xl bg-white py-2 px-4 mt-5 md:text-sm">
                        {cur.btn}
                      </button>
                    </div>
                  </Link>
                )}

                {cur.description ? (
                  <div className="absolute top-44 xxsm:top-32 right-[-150px] xsm:right-[-120px] text-white rotate-90 text-sm">
                    <p className="text-sm w-[90%] xxsm:text-[0.7rem]">
                      {cur.description}
                    </p>
                  </div>
                ) : (
                  ""
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
