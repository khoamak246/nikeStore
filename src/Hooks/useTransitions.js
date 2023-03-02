import React from "react";
import { useState, useEffect } from "react";

export default function useTransitions(time, dependencies) {
  const [opacity, setOpacity] = useState("opacity-0");
  const [loadingState, setLoadingState] = useState(
    "w-screen h-screen bg-white z-[300]"
  );
  useEffect(() => {
    const timeOutOpacity = setTimeout(() => {
      setOpacity(`opacity-100 transition-opacity duration-${time}`);
    }, time);
    dependencies == "completed" && setLoadingState("");
    return () => {
      clearTimeout(timeOutOpacity);
    };
  }, [dependencies]);
  return { opacity, loadingState };
}
