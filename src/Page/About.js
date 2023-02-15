import React from "react";
import { useState, useEffect } from "react";
import ImpactStories from "../components/About-Component/ImpactStories";
import { useDispatch, useSelector } from "react-redux";
import { pageFetch } from "../App/PageSlice";
import { pageDataSelector } from "../App/Selectors";

export default function About() {
  const [scroll, setScroll] = useState(false);
  const [scale, setScale] = useState(false);
  const [displayImpactStories, setDisplayImpactStories] = useState();
  const [displayStoriesList, setDisplayStoriesLists] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(pageFetch("aboutPage"));
  }, []);

  const dataPage = useSelector(pageDataSelector);
  const [impactStories, storiesList] = dataPage;

  useEffect(() => {
    const checkScroll = () => {
      if (window.innerWidth > 1200) {
        1400 > window.scrollY && window.scrollY > 530
          ? setScroll(true)
          : setScroll(false);
        window.scrollY > 1600 ? setScale(true) : setScale(false);
      }
      if (window.innerWidth <= 991) {
        1000 > window.scrollY && window.scrollY > 700
          ? setScroll(true)
          : setScroll(false);
        window.scrollY > 1000 ? setScale(true) : setScale(false);
      }
      if (window.innerWidth <= 767) {
        936 > window.scrollY && window.scrollY > 500
          ? setScroll(true)
          : setScroll(false);
        window.scrollY > 936 ? setScale(true) : setScale(false);
      }
      if (window.innerWidth <= 375) {
        370 > window.scrollY && window.scrollY > 300
          ? setScroll(true)
          : setScroll(false);
        window.scrollY > 370 ? setScale(true) : setScale(false);
      }
    };
    window.addEventListener("scroll", checkScroll);
    return () => {
      window.removeEventListener("scroll", checkScroll);
    };
  }, []);

  useEffect(() => {
    let display;
    if (dataPage.length != 0) {
      display = impactStories?.stories?.map((cur, index) => {
        return (
          <ImpactStories key={index} scale={scale} index={index} data={cur} />
        );
      });
    } else {
      display = "";
    }
    setDisplayImpactStories(display);
  }, [dataPage, scale]);

  useEffect(() => {
    let display;
    if (dataPage.length != 0) {
      display = storiesList?.stories?.map((cur, index) => {
        return (
          <a key={index} className="z-10" href={cur.url} target="_blank">
            <div className="max-h-sm">
              <img src={cur.img} />
            </div>
            <div className="text-slate-50 mt-5">
              <p className="text-2xl font-medium md:text-xl xsm:text-sm">
                {cur.title}
              </p>
              <p className="xsm:text-[0.6rem]">{cur.time}</p>
            </div>
          </a>
        );
      });
    } else {
      display = "";
    }
    setDisplayStoriesLists(display);
  }, [dataPage]);

  return (
    <>
      <div className="flex flex-col relative gap-28 bg-black items-center justify-center">
        <div className="nike-container mt-[10%] xsm:mt-[30%] md:mt-[20%] text-slate-50 z-10">
          <div className="font-medium">
            <p className=" text-3xl xsm:text-2xl">Our Mission</p>
            <div className="text-9xl font-black lg:text-5xl xsm:text-2xl">
              <p>BRING</p>
              <p>INSPIRATION</p>
            </div>
            <p className="text-9xl font-black lg:text-5xl xsm:text-2xl">AND</p>
            <p className="text-9xl font-black lg:text-5xl xsm:text-2xl">
              INNOVATION
            </p>
            <p className="text-9xl font-black lg:text-5xl xsm:text-2xl">TO</p>
            <p className="text-9xl font-black lg:text-5xl xsm:text-2xl">
              IN THE
            </p>
            <p className="text-9xl font-black lg:text-5xl xsm:text-2xl">
              ATHLETE*
            </p>
            <p className="text-9xl font-black lg:text-5xl xsm:text-2xl">
              EVERY
            </p>
            <p className="text-9xl font-black lg:text-5xl xsm:text-2xl">
              WORLD
            </p>
            <p className="text-3xl font-thin italic lg:text-sm">
              *If you have a body, you are an athlete
            </p>
          </div>
        </div>
        <div
          className={`${
            scroll
              ? "fixed top-0 left-0"
              : `absolute ${
                  window.scrollY >= 1400
                    ? "top-[1400px] lg:top-[1000px] md:top-[936px] xsm:top-[400px] xxsm:top-[370px] left-0"
                    : "top-[50vh] xsm:top-[35vh]"
                }`
          }  h-[90rem] z-0 ${
            scale ? "scale-x-95 duration-1000 transition-all" : ""
          }`}
        >
          <video
            src="https://firebasestorage.googleapis.com/v0/b/nikestore-61243.appspot.com/o/About%20Page%2FnikeVideo.mp4?alt=media&token=1fda366a-ccf8-45fd-962f-9ca433d3855a"
            autoPlay={true}
            loop={true}
            muted={true}
            playsInline={true}
          />
        </div>
        <div
          className={`text-slate-50 mt-[60rem] md:mt-[45rem] xsm:mt-[5rem] flex justify-end ${
            scale ? "scale-125 w-[80%] md:w-[65%]" : "scale-100 nike-container"
          } duration-1000 transition-all`}
        >
          <p className="text-3xl w-[60%] font-bold sm:text-sm md:text-[1.5rem]">
            We champion continual progress for athletes and sport by taking
            action to help athletes reach their potential. Every job at NIKE,
            Inc. is grounded in a team-first mindset, cultivating a culture of
            innovation and a shared purpose to leave an enduring impact.
          </p>
        </div>
        {displayImpactStories}
        <div
          className={`text-slate-50 flex justify-end flex-row nike-container ${
            scale ? "scale-y-100" : "scale-y-0"
          } 
         duration-[5s] transition-all`}
        >
          <div>
            <p className="text-5xl font-bold md:text-xl xsm:text-sm">
              The lastest from the NIKE, Inc.
            </p>
            <p className="text-5xl font-bold md:text-xl xsm:text-sm">
              Newsroom:
            </p>
          </div>
        </div>
        <div
          className={`grid grid-cols-3 gap-3 z-0 ${
            scale ? "scale-x-100" : "-scale-x-0"
          } duration-[5s] transition-all mb-10`}
        >
          {displayStoriesList}
        </div>
      </div>
    </>
  );
}
