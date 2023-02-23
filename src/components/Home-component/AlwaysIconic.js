import React, { memo, useEffect } from "react";
import { Splide, SplideTrack, SplideSlide } from "@splidejs/react-splide";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { pageItem2Data } from "../../redux/selectors/Selectors";
import { pageFetchConditonItem2 } from "../../Thunk/pageSlice";

function AlwaysIconic() {
  const dispatch = useDispatch();
  const itemData = useSelector(pageItem2Data);
  useEffect(() => {
    let condition = {
      fieldName: "key",
      operator: "==",
      compareValue: "AlwaysIconic",
    };
    dispatch(pageFetchConditonItem2("categoryPage", condition));
  }, []);

  return (
    <>
      {itemData.loadingState == "completed" ? (
        <div className="w-full flex flex-col gap-5">
          <p className="text-2xl font-[400]">Always Iconic</p>
          <div className="hidden sm:block">
            <Splide
              hasTrack={false}
              aria-label="popularItems"
              options={{
                perPage: 3,
                perMove: 1,
                type: "loop",
                gap: "1rem",
                breakpoints: {
                  1200: { perPage: 3 },
                  991: { perPage: 2.3 },
                  768: { perPage: 2 },
                  500: { perPage: 1.3 },
                  425: { perPage: 1 },
                },
              }}
              className="relative top-0 left-0"
            >
              <SplideTrack>
                {itemData.item[0].items.map((cur, index) => {
                  return (
                    <SplideSlide
                      className="cursor-pointer relative"
                      key={index}
                    >
                      {cur.preview.catalog && cur.preview.typeId && (
                        <Link
                          to={`/productdetail/${cur.preview.catalog}/${cur.id}/${cur.preview.typeId}`}
                          className="absolute top-0 left-0 w-full h-full"
                        ></Link>
                      )}
                      <img
                        src={cur.type[0].img[0].url}
                        alt={`alwaysIconicItems-Img${index}`}
                      />
                      <p className="text-xl">{cur.name}</p>
                    </SplideSlide>
                  );
                })}
              </SplideTrack>
              <div className="splide__arrows hidden"></div>
            </Splide>
          </div>
          <div className="grid grid-cols-3 gap-3 sm:hidden">
            {itemData.item[0].items.map((cur, index) => {
              return (
                <div
                  className="w-full relative flex flex-col gap-5"
                  key={index}
                >
                  {cur.preview.catalog && cur.preview.typeId && (
                    <Link
                      to={`/productdetail/${cur.preview.catalog}/${cur.id}/${cur.preview.typeId}`}
                      className="absolute top-0 left-0 w-full h-full"
                    ></Link>
                  )}

                  <img
                    src={cur.type[0].img[0].url}
                    alt={`popularItem2-Img${index}`}
                  />
                  <p className="text-xl">{cur.name}</p>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
}
export default memo(AlwaysIconic);
