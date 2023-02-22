import React from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function Search({
  focusSearchInput,
  navState,
  setSearch,
  search,
}) {
  return (
    <>
      <div className="w-full flex justify-between items-center">
        <input
          ref={focusSearchInput}
          type="text"
          placeholder="Enter product..."
          className={`bg-transparent p-1 focus:outline-none ${
            navState
              ? "placeholder-slate-900 text-slate-900"
              : "placeholder-slate-200 text-slate-200"
          } sm:text-[0.6rem] w-full`}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          value={search}
          spellCheck={false}
        />
        <div>
          <MagnifyingGlassIcon
            className={`h-6 w-6 sm:h-4 sm:w-4 cursor-pointer ${
              navState ? "text-slate-900" : "text-slate-200"
            } `}
          />
        </div>
      </div>
    </>
  );
}
