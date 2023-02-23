import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const initialState = {
  authorized: false,
  data: {
    displayName: "",
    userName: "",
    password: "",
    email: "",
    avatar: "",
    phoneNumber: "",
    gender: "",
    orderAddress: 0,
    address: [],
    cartItems: [],
    orders: [],
    loveProducts: [],
    notifications: [],
    lastLogin: "",
  },
};

export const UserSlice = createSlice({
  initialState,
  name: "user",
  reducers: {
    setUserLogin: (state, action) => {
      const temp = { ...action.payload };
      state.data = temp;
      state.authorized = true;
    },

    setUserLogout: (state, action) => {
      let defaultValue = {
        displayName: "",
        userName: "",
        password: "",
        email: "",
        avatar: "",
        phoneNumber: "",
        gender: "",
        orderAddress: 0,
        address: [],
        cartItems: [],
        orders: [],
        loveProducts: [],
        notifications: [],
        lastLogin: "",
      };
      state.data = defaultValue;
      state.authorized = false;
    },

    setUserChangeInfo: (state, action) => {
      let key = action.payload.key;
      state.data[key] = action.payload.newValue;
      if (action.payload.toast) {
        toast.success(`${action.payload.toast}`, { duration: 1500 });
      }
    },

    setEditOrderAddress: (state, action) => {
      state.data.orderAddress = action.payload;
    },
  },
});

export const {
  setUserLogin,
  setUserLogout,
  setEditOrderAddress,
  setUserChangeInfo,
} = UserSlice.actions;
export default UserSlice.reducer;
