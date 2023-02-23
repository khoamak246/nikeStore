import React from "react";
import {
  Panel,
  ContentEvent,
  PopularItem,
  PanelContent,
  AlwaysIconic,
  BecomeMember,
} from "../components/Home-component";
import { useState, useEffect } from "react";
import { useTransitions } from "../Hooks";
import { useDispatch, useSelector } from "react-redux";
import {
  pageDataLoadingState,
  pageDataSelector,
} from "../redux/selectors/Selectors";
import * as thunk from "../Thunk/pageSlice";

function Home() {
  const [panelScale, setPanelScale] = useState(false);
  const dispatch = useDispatch();
  const dataPage = useSelector(pageDataSelector);
  const isLoading = useSelector(pageDataLoadingState);
  const [panel, contentEvent, contentPanel, membership, introduce] = dataPage;

  useEffect(() => {
    dispatch(thunk.pageFetch("homePage"));
  }, []);

  const handleScalePanel = () => {
    window.scrollY > 30 ? setPanelScale(true) : setPanelScale(false);
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScalePanel);

    return () => {
      window.removeEventListener("scroll", handleScalePanel);
    };
  }, []);

  const transitions = useTransitions(500, isLoading);
  const { opacity, loadingState } = transitions;
  return (
    <>
      <div
        className={`nike-container flex flex-col gap-32 ${opacity} ${loadingState}`}
      >
        {isLoading == "completed" ? (
          <>
            <Panel panelScale={panelScale} panel={panel} />
            <ContentEvent contentEvent={contentEvent} />
            <PopularItem />
            <PanelContent contentPanel={contentPanel} />
            <PanelContent contentPanel={introduce} ifExists />
            <AlwaysIconic />
            <BecomeMember membership={membership} />
          </>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
export default Home;
