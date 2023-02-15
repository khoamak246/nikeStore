import React from "react";

export default function UnknowPage() {
  return (
    <div className="w-screen h-[60vh]">
      <div className="w-full h-[85%] absolute top-0 left-0 inComing-clip-path bg-black"></div>
      <div className="text-2xl text-center bg-white w-full h-full flex items-center justify-center">
        <p>
          We can't find the page you are looking for. <br></br>Sorry for the
          inconvenience.
        </p>
      </div>
    </div>
  );
}
