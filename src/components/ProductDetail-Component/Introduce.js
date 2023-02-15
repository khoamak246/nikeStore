import React from "react";

export default function Introduce({ introduce }) {
  const { title, content } = introduce;
  return (
    <>
      <div className="w-full text-center">
        <p className="text-xl">{title}</p>
      </div>
      {content.map((val, index) => {
        return (
          <div
            className="w-full text-center flex justify-center items-center flex-col gap-20"
            key={index}
          >
            <div className="w-full">
              {val.type != "picture" ? (
                <>
                  <video
                    autoPlay={true}
                    muted={true}
                    playsInline={true}
                    loop={true}
                  >
                    <source src={val.url} type="video/mp4" />{" "}
                  </video>
                </>
              ) : (
                <img src={val.url} alt={`productModel-${index}`} />
              )}
            </div>
            <div className="w-full flex flex-col justify-center items-center gap-5">
              <p className="text-3xl">{val.title}</p>
              <div className="w-[45%]">
                <p>{val.text}</p>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
