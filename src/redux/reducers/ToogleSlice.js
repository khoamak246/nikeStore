import { createSlice } from "@reduxjs/toolkit";

const ToogleSlice = createSlice({
  name: "Toogle",
  initialState: {
    toogleState: "",
  },
  reducers: {
    setOpenToogle: (state, action) => {
      {
        state.toogleState != action.payload
          ? (state.toogleState = action.payload)
          : (state.toogleState = "");
      }
    },
  },
});

export const { setOpenToogle } = ToogleSlice.actions;
export default ToogleSlice.reducer;
