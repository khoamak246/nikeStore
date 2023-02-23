import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import PageSlice from "./reducers/PageSlice";
import ToogleSlice from "./reducers/ToogleSlice";
import UserSlice from "./reducers/UserSlice";

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
