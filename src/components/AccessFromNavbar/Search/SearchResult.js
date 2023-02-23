import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { toogleStateSelector } from "../../../redux/selectors/Selectors";
import { db } from "../../../Firebase/Config";
import SearchList from "./SearchList";

export default function SearchResult({ navState, search }) {
  const [changeWidth, setChangeWidth] = useState(false);
  const [resultArr, setResultArr] = useState([]);
  const [apiState, setApiState] = useState("pending");
  const toogleState = useSelector(toogleStateSelector);

  useEffect(() => {
    let timeoutid;
    if (search.length > 0) {
      timeoutid = setTimeout(async () => {
        const resultArr = [];
        let searchInput = search.toLowerCase().split(" ").join("");

        const searchRef = query(
          collection(db, "searchKeyword"),
          where("key", "array-contains", searchInput)
        );
        const searchDoc = await getDocs(searchRef);

        searchDoc.forEach((doc) => {
          resultArr.push(doc.data());
        });
        setResultArr(resultArr);
        setChangeWidth(true);
      }, 500);
    } else {
      setApiState("pending");
      setResultArr([]);
      setChangeWidth(false);
    }
    return () => clearTimeout(timeoutid);
  }, [search]);

  useEffect(() => {
    let timeoutid;
    if (search && changeWidth && resultArr.length !== 0) {
      setApiState("completed");
    } else if (changeWidth && resultArr.length == 0) {
      timeoutid = setTimeout(() => {
        setApiState("noResult");
      }, 500);
    }

    return () => clearTimeout(timeoutid);
  }, [changeWidth, resultArr, search]);

  return (
    <>
      <div
        className={`fixed left-0 w-full ${
          !navState ? "top-[8vh]" : "top-[9vh]"
        }  z-[40] justify-center flex items-center duration-300 transition-all`}
      >
        <div className="w-[41%]  flex items-center">
          <div
            className={`bg-white w-[93%] rounded-lg  overflow-auto shadow-sm shadow-slate-500  flex flex-col gap-2 scroll-hidden ${
              toogleState == "search" && search.length > 0
                ? "max-h-80 p-2 transition-all duration-300"
                : "max-h-0 p-0"
            }`}
          >
            {apiState !== "completed" ? (
              <div className="w-full flex justify-center items-center">
                <img
                  src={`${
                    apiState == "noResult"
                      ? "https://firebasestorage.googleapis.com/v0/b/nikestore-61243.appspot.com/o/asset%2Fimg%2Fnoresult.png?alt=media&token=9ed63163-2aae-481a-8209-5f0c2a02dc03"
                      : apiState == "pending"
                      ? "https://firebasestorage.googleapis.com/v0/b/nikestore-61243.appspot.com/o/asset%2Ficon%2FSpinner-1s-200px.gif?alt=media&token=6515895c-5aa3-4ef3-b554-227aae10d8ab"
                      : ""
                  }    `}
                  alt=""
                  className="w-[50%]"
                />
              </div>
            ) : (
              resultArr?.map((val) => {
                return <SearchList key={val.typeId} val={val} />;
              })
            )}
          </div>
        </div>
      </div>
    </>
  );
}
