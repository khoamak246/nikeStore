import React from "react";
import { useTransitions } from "../Hooks";
import { Navigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  pageDataLoadingState,
  pageDataSelector,
} from "../redux/selectors/Selectors";
import { pageFetchConditon } from "../Thunk/pageSlice";

export default function ComingPage() {
  const param = useParams();
  const dispatch = useDispatch();
  const dataPage = useSelector(pageDataSelector);
  const isLoading = useSelector(pageDataLoadingState);
  const [doc] = dataPage;
  const transitions = useTransitions(500, isLoading);
  const { opacity, loadingState } = transitions;

  useEffect(() => {
    if (param.productId) {
      let condition = {
        fieldName: "key",
        operator: "==",
        compareValue: param.productId,
      };

      dispatch(pageFetchConditon("incomingPage", condition));
    }
  }, []);

  return (
    <>
      <div className={`flex flex-col gap-16 mb-6 ${opacity} ${loadingState}`}>
        {isLoading == "completed" ? (
          dataPage.length != 0 ? (
            <>
              <div className="bg-black inComing-clip-path h-[85vh] lg:h-[75vh] md:h-[95vh] w-auto absolute top-0 left-0 right-0 opacity-100 z-10"></div>
              <div className="w-full flex flex-col justify-center items-center mt-[9vh] gap-16">
                <div className="w-full h-full">
                  {doc?.panel?.type == "picture" ? (
                    <img
                      src={doc?.panel?.url}
                      alt=""
                      className="w-full h-full"
                    />
                  ) : (
                    <video
                      autoPlay={true}
                      loop={true}
                      muted={true}
                      playsInline={true}
                    >
                      <source src={doc?.panel?.url} type="video/mp4" />
                    </video>
                  )}
                </div>
                <div className="w-full flex flex-col justify-center items-center">
                  <p>{doc?.subtitle}</p>
                  <h1 className="text-3xl xxsm:text-xl">{doc?.title}</h1>
                </div>
              </div>
              <div className="relative w-full flex items-center justify-center gap-4">
                <div className="w-[70%] grid grid-cols-2 gap-3 pl-4 xxsm:grid-cols-1">
                  {Array.isArray(doc.img) &&
                    doc.img.map((val, index) => {
                      return (
                        <div className="w-full" key={index}>
                          {val.type == "picture" ? (
                            <img src={val.url} className="w-full" />
                          ) : (
                            <video
                              muted={true}
                              playsInline={true}
                              loop={true}
                              autoPlay={true}
                            >
                              <source src={val.url} type="video/mp4" />
                            </video>
                          )}
                        </div>
                      );
                    })}
                  <div className="w-full relative hidden xxsm:block">
                    <div className="w-full flex flex-col justify-center items-center text-center">
                      <p className="xxsm:text-sm">
                        {doc?.sideContent?.subtitle}
                      </p>
                      <h1 className="text-2xl font-medium xxsm:text-xl">
                        {doc?.sideContent?.title}
                      </h1>
                      <p className="w-[90%] sm:text-sm">
                        {doc?.sideContent?.text}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="w-[30%] relative xxsm:hidden">
                  <div className="w-full flex flex-col justify-center items-center text-center">
                    <p className="xxsm:text-sm">{doc?.sideContent?.subtitle}</p>
                    <h1 className="text-2xl font-medium xxsm:text-sm">
                      {doc?.sideContent?.title}
                    </h1>
                    <p className="w-[90%] sm:text-sm">
                      {doc?.sideContent?.text}
                    </p>
                  </div>
                </div>
              </div>
              {doc?.introduce?.map((val, index) => {
                return (
                  <div
                    className="w-full flex flex-col items-center justify-center gap-16"
                    key={index}
                  >
                    <div className="w-[30%] sm:w-[50%] xxsm:w-[95%] flex flex-col justify-center items-center text-center">
                      <h1 className="text-3xl xxsm:text-xl xxsm:font-medium">
                        {val.title}
                      </h1>
                      <p className="sm:text-sm">{val.text}</p>
                    </div>
                    <div className="w-full">
                      {val.type == "picture" ? (
                        <img src={val.url} className="w-full" />
                      ) : (
                        <video>
                          <source src={val.url} />
                        </video>
                      )}
                    </div>
                  </div>
                );
              })}
            </>
          ) : (
            <Navigate to="*" />
          )
        ) : (
          <div></div>
        )}
      </div>
    </>
  );
}
