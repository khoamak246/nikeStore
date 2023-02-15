import { createSlice } from "@reduxjs/toolkit";
import { doc, getDoc, setDoc, Timestamp } from "firebase/firestore";
import { toast } from "react-hot-toast";
import { v4 as uuid } from "uuid";
import { db } from "../Firebase/Config";

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

const UserSlice = createSlice({
  initialState,
  name: "user",
  reducers: {
    setUserLogin: (state, action) => {
      const temp = { ...action.payload, orderAddress: 0 };
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
    setAddToCart: (state, action) => {
      const itemIndex = state.data.cartItems.findIndex((item) => {
        return (
          item.typeId === action.payload.typeId &&
          item.size === action.payload.size
        );
      });
      if (itemIndex >= 0) {
        state.data.cartItems[itemIndex].cartQuantity += 1;
      } else {
        const temp = { ...action.payload, cartQuantity: 1 };
        state.data.cartItems.push(temp);
      }
    },

    setRemoveFromCart: (state, action) => {
      const removeItem = state.data.cartItems.filter((item) => {
        return (
          item.typeId !== action.payload.typeId ||
          item.size !== action.payload.size
        );
      });

      state.data.cartItems = removeItem;
    },

    setIncreaseQuantity: (state, action) => {
      const itemIndex = state.data.cartItems.findIndex((item) => {
        return (
          item.typeId === action.payload.typeId &&
          item.size === action.payload.size
        );
      });
      state.data.cartItems[itemIndex].cartQuantity += 1;
    },

    setDecreaseQuantity: (state, action) => {
      const itemIndex = state.data.cartItems.findIndex((item) => {
        return (
          item.typeId === action.payload.typeId &&
          item.size === action.payload.size
        );
      });
      if (state.data.cartItems[itemIndex].cartQuantity == 1) {
        state.cartItems.splice(itemIndex, 1);
      } else {
        state.data.cartItems[itemIndex].cartQuantity -= 1;
      }
    },

    setClearCart: (state, action) => {
      state.data.cartItems = [];
    },

    setAddToLoveProduct: (state, action) => {
      const itemIndex = state.data.loveProducts.findIndex((val) => {
        return val.typeId === action.payload.typeId;
      });
      itemIndex >= 0
        ? toast.error("This product is already in the list", { duration: 1500 })
        : state.data.loveProducts.push(action.payload);
    },

    setRemoveFromLoveProduct: (state, action) => {
      const removeItem = state.data.loveProducts.filter((item) => {
        return item.typeId !== action.payload.typeId;
      });
      state.data.loveProducts = removeItem;
      toast.success("Removed successfully", { duration: 1500 });
    },

    setAddNewAddress: (state, action) => {
      const temp = { ...action.payload, id: uuid() };
      if (state.data.address.length == 0) {
        state.data.phoneNumber = action.payload.phoneNumber;
      }

      state.data.address.push(temp);
    },

    setEditAddress: (state, action) => {
      const itemIndex = state.data.address.findIndex((item) => {
        return item.id == action.payload.id;
      });
      if (itemIndex == 0) {
        state.data.phoneNumber = action.payload.phoneNumber;
      }
      state.data.address[itemIndex] = action.payload;
    },

    setEditOrderAddress: (state, action) => {
      state.data.orderAddress = action.payload;
    },

    setConFirmOrder: (state, action) => {
      let idOrder = uuid();
      let time = Timestamp.fromDate(new Date());
      const temp = {
        ...action.payload,
        id: idOrder,
        createdAt: time,
      };
      state.data.orders.push(temp);
      state.data.notifications.push({
        id: idOrder,
        status: "pending",
        type: "updateOrder",
        createdAt: time,
      });
    },

    setAddNotifications: (state, action) => {
      state.data.notifications.push(action.payload);
    },
  },
});

export function userLogin(user) {
  return async function userLoginThunk(dispatch) {
    let lastLoginTime = Timestamp.fromDate(new Date());
    let displayUserName = "";
    const userRef = doc(db, "user", user.username);
    await setDoc(userRef, { lastLogin: lastLoginTime }, { merge: true });
    const docUserSnap = await getDoc(userRef);
    if (docUserSnap.exists()) {
      const userData = { ...docUserSnap.data(), orderAddress: 0 };
      dispatch(UserSlice.actions.setUserLogin(userData));
      displayUserName = docUserSnap.data().displayName;
    }
    let notifications = `Welcome back ${displayUserName}`;
    toast(
      notifications,
      {
        icon: "👏",
      },
      { duration: 2000 }
    );
  };
}

export function addToCart(item) {
  return async function addToCartThunk(dispatch, getState) {
    dispatch(UserSlice.actions.setAddToCart(item));
    let newCartItems = getState().user.data.cartItems;
    let username = getState().user.data.userName;
    const userRef = doc(db, "user", username);
    await setDoc(userRef, { cartItems: newCartItems }, { merge: true });
    toast.success(`Add to cart successfully`, { duration: 1500 });
  };
}

export function removeFromCart(item) {
  return async function removeFromCartThunk(dispatch, getState) {
    dispatch(UserSlice.actions.setRemoveFromCart(item));
    let newCartItems = getState().user.data.cartItems;
    let username = getState().user.data.userName;
    const userRef = doc(db, "user", username);
    await setDoc(userRef, { cartItems: newCartItems }, { merge: true });
    toast.success("Removed successfully", { duration: 1500 });
  };
}

export function increaseQuantity(item) {
  return async function increaseQuantityThunk(dispatch, getState) {
    dispatch(UserSlice.actions.setIncreaseQuantity(item));
    let newCartItems = getState().user.data.cartItems;
    let username = getState().user.data.userName;
    const userRef = doc(db, "user", username);
    await setDoc(userRef, { cartItems: newCartItems }, { merge: true });
  };
}

export function decreaseQuantity(item) {
  return async function decreaseQuantityThunk(dispatch, getState) {
    dispatch(UserSlice.actions.setDecreaseQuantity(item));
    let newCartItems = getState().user.data.cartItems;
    let username = getState().user.data.userName;
    const userRef = doc(db, "user", username);
    await setDoc(userRef, { cartItems: newCartItems }, { merge: true });
  };
}

export function clearCart() {
  return async function clearCartThunk(dispatch, getState) {
    dispatch(UserSlice.actions.setClearCart());
    let newCartItems = getState().user.data.cartItems;
    let username = getState().user.data.userName;
    const userRef = doc(db, "user", username);
    await setDoc(userRef, { cartItems: newCartItems }, { merge: true });
  };
}

export function addToLoveProduct(item) {
  return async function addToLoveProductThunk(dispatch, getState) {
    dispatch(UserSlice.actions.setAddToLoveProduct(item));
    let newloveProducts = getState().user.data.loveProducts;
    let username = getState().user.data.userName;
    const userRef = doc(db, "user", username);
    await setDoc(userRef, { loveProducts: newloveProducts }, { merge: true });
    toast.success("Add to favorite list successfully", {
      duration: 1500,
    });
  };
}

export function removeFromLoveProduct(item) {
  return async function removeFromLoveProductThunk(dispatch, getState) {
    dispatch(UserSlice.actions.setRemoveFromLoveProduct(item));
    let newloveProducts = getState().user.data.loveProducts;
    let username = getState().user.data.userName;
    const userRef = doc(db, "user", username);
    await setDoc(userRef, { loveProducts: newloveProducts }, { merge: true });
  };
}

export function addNewAddress(item) {
  return async function addNewAddressThunk(dispatch, getState) {
    dispatch(UserSlice.actions.setAddNewAddress(item));
    let newAddressList = getState().user.data.address;
    let newPhoneNumber = getState().user.data.phoneNumber;
    let username = getState().user.data.userName;
    const userRef = doc(db, "user", username);
    await setDoc(userRef, { address: newAddressList }, { merge: true });
    await setDoc(userRef, { phoneNumber: newPhoneNumber }, { merge: true });
  };
}

export function editAddress(item) {
  return async function editAddressThunk(dispatch, getState) {
    dispatch(UserSlice.actions.setEditAddress(item));
    let newAddressList = getState().user.data.address;
    let newPhoneNumber = getState().user.data.phoneNumber;
    let username = getState().user.data.userName;
    const userRef = doc(db, "user", username);
    await setDoc(userRef, { address: newAddressList }, { merge: true });
    await setDoc(userRef, { phoneNumber: newPhoneNumber }, { merge: true });
    toast.success("Edit infomation successfully");
  };
}

export function conFirmOrder(item) {
  return async function conFirmOrderThunk(dispatch, getState) {
    dispatch(UserSlice.actions.setConFirmOrder(item));
    let newOrdersList = getState().user.data.orders;
    let newNotificationList = getState().user.data.notifications;
    let username = getState().user.data.userName;
    const userRef = doc(db, "user", username);
    await setDoc(userRef, { orders: newOrdersList }, { merge: true });
    await setDoc(
      userRef,
      { notifications: newNotificationList },
      { merge: true }
    );
    const promise = new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 2000);
    });

    toast.promise(promise, {
      loading: "In Processing...",
      success: <b>Your order has been add</b>,
      error: <b>OOP! Something wrong, let try again!</b>,
    });
  };
}

export function addNotifications(item) {
  return async function addNotificationsThunk(dispatch, getState) {
    dispatch(UserSlice.actions.setAddNotifications(item));
    let newNotificationsList = getState().user.data.notifications;
    let username = getState().user.data.userName;
    const userRef = doc(db, "user", username);
    await setDoc(
      userRef,
      { notifications: newNotificationsList },
      { merge: true }
    );
  };
}

export const {
  setUserLogout,
  setAddToCart,
  setRemoveFromCart,
  setIncreaseQuantity,
  setDecreaseQuantity,
  setClearCart,
  setAddToLoveProduct,
  setRemoveFromLoveProduct,
  setConFirmOrder,
  setAddNewAddress,
  setEditAddress,
  setEditOrderAddress,
  setAddNotifications,
} = UserSlice.actions;
export default UserSlice.reducer;
