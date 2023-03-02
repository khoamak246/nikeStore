import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  loadingState: "idle",
  page: [],
  pageItem1: { loadingState: "idle", item: [] },
  pageItem2: { loadingState: "idle", item: [] },
};

export const PageSlice = createSlice({
  initialState,
  name: "page",
  reducers: {
    setLoadingState(state, action) {
      state.loadingState = "idle";
    },
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

export const {
  setLoadingState,
  setSaveDataPage,
  setSaveFirtItemData,
  setSaveSecondItemData,
} = PageSlice.actions;
export default PageSlice.reducer;
