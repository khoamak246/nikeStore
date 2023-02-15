import React from "react";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";

export default function ImpactStories({ scale, index, data }) {
  const [firstContent, setFirstContent] = useState("");
  const [secondContent, setSecondContent] = useState("");
  useEffect(() => {
    setFirstContent(
      <div className="w-[30%] text-slate-50 flex flex-col">
        <p className="text-3xl font-bold md:text-xl xsm:text-sm">
          {data.title}
        </p>
        <p className="inline-block opacity-50 group-hover:opacity-100 transition-all duration-200 xsm:text-[0.6rem]">
          {data.text}
          {
            <ChevronRightIcon className="w-5 h-5 inline-block xsm:w-2 xsm:h-2" />
          }
        </p>
      </div>
    );
    setSecondContent(
      <div className="w-[60%] overflow-hidden">
        <img
          src={data.img}
          className={`object-fill ${
            scale ? "scale-100 duration-[3s] transition-all" : "scale-125"
          }`}
        />
      </div>
    );
  }, [data, scale]);
  return (
    <>
      <a href={data.url} target="_blank" className="z-10 group">
        <div className="flex justify-between nike-container">
          {index % 2 == 0 ? (
            <>
              {firstContent}
              {secondContent}
            </>
          ) : (
            <>
              {secondContent}
              {firstContent}
            </>
          )}
        </div>
      </a>
    </>
  );
}
