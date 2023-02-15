import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import PageSlice from "./PageSlice";
import ToogleSlice from "./ToogleSlice";
import UserSlice from "./UserSlice";

const Store = configureStore({
  reducer: {
    user: UserSlice,
    toogle: ToogleSlice,
    page: PageSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export default Store;
