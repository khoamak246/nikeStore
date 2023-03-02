import React from "react";
import { PlayIcon } from "@heroicons/react/24/solid";
import { panelapi } from "../../data/data";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLoadingState } from "../../redux/reducers/PageSlice";
import { setOpenToogle } from "../../redux/reducers/ToogleSlice";
function Panel() {
  const { title, subtitle, btntext, img, sociallinks, videos } = panelapi;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <>
      <div className={`relative h-auto w-auto flex flex-col`}>
        <div className="bg-theme clip-path h-[80vh] lg:h-[75vh] md:h-[65vh] sm:h-[55vh] w-auto absolute top-0 left-0 right-0 opacity-100 z-10"></div>
        <div className="relative opacity-100 z-20 grid items-center justify-items-center nike-container">
          <div className="grid items-center justify-items-center mt-28 md:mt-24">
            <h1 className="text-6xl lg:text-5xl md:text-4xl sm:text-3xl xsm:text-2xl font-extrabold filter drop-shadow-sm text-slate-200 ">
              {title}
            </h1>
            <h1 className="text-6xl lg:text-5xl md:text-4xl sm:text-3xl xsm:text-2xl font-extrabold filter drop-shadow-sm text-slate-200 ">
              {subtitle}
            </h1>
            <button
              type="button"
              className="button-theme bg-slate-200 shadow-slate-200 rounded-xl my-5"
              onClick={() => {
                dispatch(setLoadingState());
                dispatch(setOpenToogle(""));
                navigate("/incoming/AdaptBB");
              }}
            >
              {btntext}
            </button>
            <div className="grid items-center gap-5 md:gap-3 absolute top-[33vh] lg:top-[27vh] left-[11%] xl:left-0 w-auto h-auto xsm:hidden">
              {videos?.map((video, index) => {
                return (
                  <div
                    key={index}
                    className="relative h-28 w-32 rounded-xl overflow-hidden group cursor-pointer transition-all duration-300 lg:w-28 md:w-24 sm:w-16 lg:h-24 md:h-20 sm:h-14"
                  >
                    <img
                      src={video.imgsrc}
                      alt="img/clips"
                      className="inset-0 flex h-full w-full object-cover absolute top-0 left-0 right-0 rounded-xl opacity-100 z-10 transition-opacity duration-500"
                    />
                    <div className="bg-white blur-effect-theme absolute top-11 left-11 lg:top-8 lg:left-9 sm:top-4 sm:left-5 right-0 opacity-100 z-[100] w-8 h-8 md:w-5 md:h-5 flex items-center justify-center rounded-full group-hover:opacity-0 group-hover:z-0">
                      <PlayIcon className="icon-style text-slate-900 md:w-3 md:h-3" />
                    </div>
                    <video
                      autoPlay={true}
                      loop={true}
                      muted={true}
                      playsInline={true}
                      className="absolute top-0 left-0 right-0 flex h-full w-full object-cover opacity-0 z-0 group-hover:opacity-100 group-hover:z-50 rounded-xl"
                    >
                      <source type="video/mp4" src={video.clip} />
                    </video>
                  </div>
                );
              })}
            </div>
            <div className="grid items-center absolute top-[33vh] lg:top-[27vh] right-0 gap-3 xxsm:z-10">
              {sociallinks?.map((sociallink, index) => {
                return (
                  <a href={sociallink.url} key={index} target="_blank">
                    <img
                      key={index}
                      src={sociallink.icon}
                      alt="icon/sociallinks"
                      className="w-8 h-8 flex items-center cursor-pointer md:w-6 md:h-6 sm:w-5 sm:h-5 transition-all duration-200 hover:scale-110"
                    />
                  </a>
                );
              })}
            </div>
          </div>
          <div>
            <img
              src={img}
              alt="panel-img/img"
              className="w-auto h-[40vh] lg:h-[35vh] md:h-[31vh] sm:h-[31vh] xsm:h-[19vh] transitions-theme -rotate-[25deg] hover:rotate-0 object-fill"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Panel;
