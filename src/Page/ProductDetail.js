import React, { useState } from "react";
import {
  ProductOptions,
  Introduce,
  RecommendProduct,
} from "../components/ProductDetail-Component";
import { Navigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useTransitions } from "../Hooks";
import { useDispatch, useSelector } from "react-redux";
import { pageDataLoadingState, pageDataSelector } from "../App/Selectors";
import { pageFetchConditon } from "../App/PageSlice";

export default function ProductDetail() {
  const param = useParams();
  const [productInfo, setProductInfo] = useState();
  const dispatch = useDispatch();
  const pageData = useSelector(pageDataSelector);
  const isLoading = useSelector(pageDataLoadingState);
  useEffect(() => {
    if (param.catalogName) {
      const condition = {
        fieldName: "key",
        operator: "==",
        compareValue: param.catalogName,
      };
      dispatch(pageFetchConditon("categoryPage", condition));
    }
  }, [param]);

  const [product] = pageData;
  useEffect(() => {
    let getProductInfo;
    if (isLoading == "completed") {
      product?.items?.forEach((val) => {
        if (val.id == param.productId) {
          getProductInfo = val;
        }
      });
    }
    setProductInfo(getProductInfo);
  }, [isLoading, pageData]);

  const transitions = useTransitions(500, isLoading);
  const { opacity, loadingState } = transitions;
  return (
    <>
      <div
        className={`flex flex-col justify-center relative ${opacity} ${loadingState}`}
      >
        <div className="bg-black inComing-clip-path h-[85vh] lg:h-[75vh] md:h-[95vh] w-auto absolute top-0 left-0 right-0 opacity-100 z-10"></div>
        <div className="nike-container mt-[9vh] pt-[5vh] flex flex-col gap-32">
          {isLoading == "completed" ? (
            pageData.length != 0 ? (
              productInfo ? (
                <>
                  <ProductOptions
                    productInfo={productInfo}
                    productId={param.productId}
                    typeId={param.typeId}
                  />
                  {productInfo.introduce && (
                    <Introduce introduce={productInfo.introduce} />
                  )}
                  <RecommendProduct
                    recommendList={product}
                    productId={param.productId}
                  />
                </>
              ) : (
                ""
              )
            ) : (
              <Navigate to="*" />
            )
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}
