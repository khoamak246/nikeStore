import React, { useState } from "react";
import {
  Panel,
  Sales,
  Stories,
  FlexContent,
  SalesList,
} from "../components/Category-Component";
import { useTransitions } from "../Hooks";
import { useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  pageDataLoadingState,
  pageDataSelector,
} from "../redux/selectors/Selectors";
import * as thunk from "../Thunk/pageSlice";

export default function Category() {
  const param = useParams();
  const dispatch = useDispatch();

  const dataPage = useSelector(pageDataSelector);
  const isLoading = useSelector(pageDataLoadingState);

  const transitions = useTransitions(500, isLoading);
  const { opacity, loadingState } = transitions;

  useEffect(() => {
    if (param.catalogName) {
      let condition = {
        fieldName: "key",
        operator: "==",
        compareValue: param.catalogName,
      };
      dispatch(thunk.pageFetchConditon("categoryPage", condition));
    } else {
      dispatch(thunk.pageFetch("categoryPage"));
    }
  }, [param]);

  return (
    <>
      <div
        className={`flex flex-col gap-16 relative ${loadingState} ${opacity}`}
      >
        <Panel />
        {isLoading == "completed" ? (
          dataPage.length != 0 ? (
            param.catalogName ? (
              <>
                <div className="my-20">
                  <SalesList endpoint={dataPage[0]} />
                </div>
              </>
            ) : dataPage.length == 8 ? (
              <>
                <Sales endpoint={dataPage[3]} ifExists />
                <FlexContent endpoint={dataPage[0]} ifExists />
                <SalesList endpoint={dataPage[4]} />
                <SalesList endpoint={dataPage[5]} />
                <FlexContent endpoint={dataPage[1]} />
                <SalesList endpoint={dataPage[6]} />
                <SalesList endpoint={dataPage[7]} />
                <Stories stories={dataPage[2]} />
              </>
            ) : (
              <div></div>
            )
          ) : (
            <Navigate to="*" />
          )
        ) : (
          ""
        )}
      </div>
    </>
  );
}
