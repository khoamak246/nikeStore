import React, { useState, useEffect } from "react";
import { Splide, SplideTrack, SplideSlide } from "@splidejs/react-splide";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setOpenToogle } from "../../redux/reducers/ToogleSlice";

export default function RecommendProduct({ recommendList, productId }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [recomList, setRecomList] = useState(recommendList.items);
  useEffect(() => {
    let newList = [];
    recommendList?.items?.forEach((val) => {
      if (productId !== val.id) {
        newList = [...newList, val];
      }
    });

    return setRecomList(newList);
  }, [recommendList, productId]);
  return (
    <div className="w-full flex flex-col gap-5 mb-32">
      <p className="text-xl">You Might Also Like</p>
      <Splide
        hasTrack={false}
        aria-label="..."
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
      >
        <SplideTrack>
          {recomList.map((val, index) => {
            let ramdomIndex = Math.floor(Math.random() * val.type.length);
            return (
              <SplideSlide
                key={index}
                onClick={() => {
                  dispatch(setOpenToogle(""));
                  navigate(
                    `/productdetail/${recommendList.key}/${val.id}/${val.type[ramdomIndex].id}`
                  );
                }}
                className="cursor-pointer"
              >
                <div className="w-full">
                  <div className="w-full flex flex-col gap-5">
                    <div className="w-full">
                      <img
                        src={val.type[ramdomIndex].img[0].url}
                        alt={`recommend-img-${index}`}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <p className="text-[1rem]">{val.name}</p>
                      <p className="text-[0.9rem] text-[#757575]">
                        {val.forGender}'s Training Shoes
                      </p>
                      <p className="mt-4">${val.price}</p>
                    </div>
                  </div>
                </div>
              </SplideSlide>
            );
          })}
        </SplideTrack>
        <div className="splide__arrow--prev absolute top-[-2rem] right-14"></div>
      </Splide>
    </div>
  );
}
