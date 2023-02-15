import { createSlice } from "@reduxjs/toolkit";
import { doc, getDoc, setDoc, Timestamp } from "firebase/firestore";
import { toast } from "react-hot-toast";
import { v4 as uuid } from "uuid";
import { db } from "../Firebase/Config";
/* {authorizedState: true,
data:
}*/
const initialState = {
  authorized: false,
  data: {
    displayName: "",
    userName: "",
    password: "",
    email: "",
    avatar: "",
    phoneNumber: "",
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
      state.data.address.push(temp);
    },
    // TODO:
    setEditAddress: (state, action) => {
      const itemIndex = state.data.address.findIndex((item) => {
        return item.id == action.payload.id;
      });
      state.data.address[itemIndex] = action.payload;
      toast.success("Edit infomation successfully");
    },

    setEditOrderAddress: (state, action) => {
      state.data.orderAddress = action.payload;
    },

    setConFirmOrder: (state, action) => {
      const temp = { ...action.payload, id: uuid() };
      state.data.orders.push(temp);
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
  return async function addNewAddress(dispatch, getState) {
    dispatch(UserSlice.actions.setAddNewAddress(item));
    let newAddressList = getState().user.data.address;
    let username = getState().user.data.userName;
    const userRef = doc(db, "user", username);
    await setDoc(userRef, { address: newAddressList }, { merge: true });
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
} = UserSlice.actions;
export default UserSlice.reducer;
