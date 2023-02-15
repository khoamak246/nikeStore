import { db } from "../Firebase/Config";
import {
  onSnapshot,
  collection,
  query,
  orderBy,
  where,
} from "firebase/firestore";

import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  loadingState: "idle",
  page: [],
  pageItem1: { loadingState: "idle", item: [] },
  pageItem2: { loadingState: "idle", item: [] },
};

const PageSlice = createSlice({
  initialState,
  name: "page",
  reducers: {
    setSaveDataPage: (state, action) => {
      if (action.payload.page !== "homePage") {
        state.pageItem1 = { loadingState: "idle", item: [] };
        state.pageItem2 = { loadingState: "idle", item: [] };
      }
      state.page = action.payload.data;
      state.loadingState = "completed";
    },
    setSaveFirtItemData: (state, action) => {
      state.pageItem1.item = action.payload.data;
      state.pageItem1.loadingState = "completed";
    },
    setSaveSecondItemData: (state, action) => {
      state.pageItem2.item = action.payload.data;
      state.pageItem2.loadingState = "completed";
    },
  },
});

export function pageFetch(page) {
  return function pageFetchThunk(dispatch, getState) {
    let collectionRef = query(collection(db, page), orderBy("createdAt"));
    const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        ...doc.data(),
      }));
      dispatch(PageSlice.actions.setSaveDataPage({ page, data }));
    });
  };
}

export function pageFetchConditon(page, condition) {
  return function pageFetchThunk(dispatch, getState) {
    let collectionRef = query(
      collection(db, page),
      where(condition.fieldName, condition.operator, condition.compareValue)
    );
    const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        ...doc.data(),
      }));
      dispatch(PageSlice.actions.setSaveDataPage({ page, data }));
    });
  };
}

export function pageFetchConditonItem1(page, condition) {
  return function pageFetchThunk(dispatch, getState) {
    let collectionRef = query(
      collection(db, page),
      where(condition.fieldName, condition.operator, condition.compareValue)
    );
    const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        ...doc.data(),
      }));
      dispatch(PageSlice.actions.setSaveFirtItemData({ page, data }));
    });
  };
}

export function pageFetchConditonItem2(page, condition) {
  return function pageFetchThunk(dispatch, getState) {
    let collectionRef = query(
      collection(db, page),
      where(condition.fieldName, condition.operator, condition.compareValue)
    );
    const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        ...doc.data(),
      }));
      dispatch(PageSlice.actions.setSaveSecondItemData({ page, data }));
    });
  };
}

export default PageSlice.reducer;
