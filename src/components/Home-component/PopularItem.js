import React, { useEffect } from "react";
import { Splide, SplideTrack, SplideSlide } from "@splidejs/react-splide";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { memo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { pageItem1Data } from "../../redux/selectors/Selectors";
import { pageFetchConditonItem1 } from "../../Thunk/pageSlice";
import { setLoadingState } from "../../redux/reducers/PageSlice";
import { setOpenToogle } from "../../redux/reducers/ToogleSlice";
function PopularItem() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const pageItem = useSelector(pageItem1Data);
  useEffect(() => {
    let conditon = {
      fieldName: "key",
      operator: "==",
      compareValue: "PopularRightNow",
    };
    dispatch(pageFetchConditonItem1("categoryPage", conditon));
  }, []);
  return (
    <>
      {pageItem.loadingState == "completed" ? (
        <div className="w-full flex flex-col gap-5">
          <p className="text-2xl font-[400]">Popular Right Now</p>
          <div>
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
                {pageItem.item[0].items.map((cur, index) => {
                  return (
                    <SplideSlide
                      className="cursor-pointer relative"
                      key={index}
                      onClick={() => {
                        dispatch(setLoadingState());
                        dispatch(setOpenToogle(""));
                        navigate(
                          `/productdetail/${cur.preview.catalog}/${cur.id}/${cur.preview.typeId}`
                        );
                      }}
                    >
                      <img
                        src={cur.type[0].img[0].url}
                        alt={`popularItem1-Img${index}`}
                        className="w-full"
                      />
                      <div className="flex justify-between mt-3 mr-3">
                        <div>
                          <h4>{cur.name}</h4>
                          <p className="text-[#757575] text-sm">
                            {cur.forGender}'s shoes
                          </p>
                        </div>
                        <p>${cur.price}</p>
                      </div>
                    </SplideSlide>
                  );
                })}
              </SplideTrack>

              <div className="splide__arrows absolute top-[-35px] right-14 lg:hidden">
                <button className="splide__arrow splide__arrow--prev">
                  <ChevronLeftIcon />
                </button>
                <button className="splide__arrow splide__arrow--next">
                  <ChevronLeftIcon />
                </button>
              </div>
            </Splide>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
}
export default memo(PopularItem);
