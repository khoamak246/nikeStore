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

    setUserChangePassword: (state, action) => {
      state.data.password = action.payload;
      toast.success("Password changed successfully!", { duration: 1500 });
    },

    setAddToCart: (state, action) => {
      state.data.cartItems = action.payload;
      toast.success(`Add to cart successfully`, { duration: 1500 });
    },

    setRemoveFromCart: (state, action) => {
      state.data.cartItems = action.payload;
      toast.success("Removed successfully", { duration: 1500 });
    },

    setIncreaseQuantity: (state, action) => {
      state.data.cartItems = action.payload;
    },

    setDecreaseQuantity: (state, action) => {
      state.data.cartItems = action.payload;
    },

    setClearCart: (state, action) => {
      state.data.cartItems = [];
    },

    setAddToLoveProduct: (state, action) => {
      state.data.loveProducts = action.payload;
      toast.success("Add to favorite list successfully", {
        duration: 1500,
      });
    },

    setRemoveFromLoveProduct: (state, action) => {
      state.data.loveProducts = action.payload;
      toast.success("Removed successfully", { duration: 1500 });
    },

    setAddNewAddress: (state, action) => {
      state.data.address = action.payload.newAddressList;
      state.data.phoneNumber = action.payload.newPhoneNumber;
    },

    setEditAddress: (state, action) => {
      state.data.address = action.payload.newAddressList;
      state.data.phoneNumber = action.payload.newPhoneNumber;

      toast.success("Edit infomation successfully");
    },

    setEditOrderAddress: (state, action) => {
      state.data.orderAddress = action.payload;
    },

    setConFirmOrder: (state, action) => {
      state.data.orders = action.payload.newOrdersList;
      state.data.notifications = action.payload.newNotificationList;

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

    setAddNotifications: (state, action) => {
      state.data.notifications = action.payload.newNotificationsList;
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
      let notifications = `Welcome back ${displayUserName}`;
      toast(
        notifications,
        {
          icon: "👏",
        },
        { duration: 2000 }
      );
    } else {
      toast.error("OOP! Something happed with server!", { duration: 2000 });
    }
  };
}

export function addToCart(item) {
  return async function addToCartThunk(dispatch, getState) {
    let newCartItems = [];
    let username = getState().user.data.userName;
    let curCartItems = getState().user.data.cartItems;
    const userRef = doc(db, "user", username);
    const itemIndex = curCartItems.findIndex((cartItem) => {
      return cartItem.typeId === item.typeId && cartItem.size === item.size;
    });

    if (itemIndex >= 0) {
      for (let i = 0; i < curCartItems.length; i++) {
        if (i == itemIndex) {
          let editValue = { ...curCartItems[i] };
          editValue.cartQuantity += 1;
          newCartItems.push(editValue);
        } else {
          newCartItems.push(curCartItems[i]);
        }
      }
    } else {
      const temp = { ...item, cartQuantity: 1 };
      newCartItems = [...curCartItems, temp];
    }

    await setDoc(userRef, { cartItems: newCartItems }, { merge: true });
    dispatch(UserSlice.actions.setAddToCart(newCartItems));
  };
}

export function removeFromCart(item) {
  return async function removeFromCartThunk(dispatch, getState) {
    let username = getState().user.data.userName;
    const userRef = doc(db, "user", username);
    let newCartItems = getState().user.data.cartItems;
    const removeItem = newCartItems.filter((cartItem) => {
      return cartItem.typeId !== item.typeId || cartItem.size !== item.size;
    });
    newCartItems = removeItem;
    await setDoc(userRef, { cartItems: newCartItems }, { merge: true });
    dispatch(UserSlice.actions.setRemoveFromCart(newCartItems));
  };
}

export function increaseQuantity(item) {
  return async function increaseQuantityThunk(dispatch, getState) {
    let newCartItems = [];
    let curCartItems = getState().user.data.cartItems;
    let username = getState().user.data.userName;
    const userRef = doc(db, "user", username);

    const itemIndex = curCartItems.findIndex((cartItem) => {
      return cartItem.typeId === item.typeId && cartItem.size === item.size;
    });

    let editValue = { ...curCartItems[itemIndex] };
    editValue.cartQuantity += 1;
    for (let i = 0; i < curCartItems.length; i++) {
      if (i == itemIndex) {
        newCartItems.push(editValue);
      } else {
        newCartItems.push(curCartItems[i]);
      }
    }

    await setDoc(userRef, { cartItems: newCartItems }, { merge: true });
    dispatch(UserSlice.actions.setIncreaseQuantity(newCartItems));
  };
}

export function decreaseQuantity(item) {
  return async function decreaseQuantityThunk(dispatch, getState) {
    let newCartItems = [];
    let curCartItems = getState().user.data.cartItems;
    let username = getState().user.data.userName;
    const userRef = doc(db, "user", username);

    const itemIndex = curCartItems.findIndex((cartItem) => {
      return cartItem.typeId === item.typeId && cartItem.size === item.size;
    });

    for (let i = 0; i < curCartItems.length; i++) {
      if (curCartItems[i].cartQuantity == 1 && itemIndex == i) {
        continue;
      } else if (curCartItems[i].cartQuantity !== 1 && itemIndex == i) {
        let editValue = { ...curCartItems[i] };
        editValue.cartQuantity -= 1;
        newCartItems.push(editValue);
      } else {
        newCartItems.push(curCartItems[i]);
      }
    }

    await setDoc(userRef, { cartItems: newCartItems }, { merge: true });
    dispatch(UserSlice.actions.setDecreaseQuantity(newCartItems));
  };
}

export function clearCart() {
  return async function clearCartThunk(dispatch, getState) {
    let newCartItems = [];
    let username = getState().user.data.userName;
    const userRef = doc(db, "user", username);
    await setDoc(userRef, { cartItems: newCartItems }, { merge: true });
    dispatch(UserSlice.actions.setClearCart());
  };
}

export function addToLoveProduct(item) {
  return async function addToLoveProductThunk(dispatch, getState) {
    let newLoveProducts = [];
    let username = getState().user.data.userName;
    const userRef = doc(db, "user", username);
    let curLoveProducts = getState().user.data.loveProducts;
    const itemIndex = curLoveProducts.findIndex((val) => {
      return val.typeId === item.typeId;
    });

    if (itemIndex >= 0) {
      return toast.error("This product is already in the list", {
        duration: 1500,
      });
    } else {
      newLoveProducts = [...curLoveProducts, item];
    }
    await setDoc(userRef, { loveProducts: newLoveProducts }, { merge: true });
    dispatch(UserSlice.actions.setAddToLoveProduct(newLoveProducts));
  };
}

export function removeFromLoveProduct(item) {
  return async function removeFromLoveProductThunk(dispatch, getState) {
    let newLoveProducts;
    let curloveProducts = getState().user.data.loveProducts;
    let username = getState().user.data.userName;
    const userRef = doc(db, "user", username);
    const removeItem = curloveProducts.filter((loveProduct) => {
      return loveProduct.typeId !== item.typeId;
    });
    newLoveProducts = removeItem;
    await setDoc(userRef, { loveProducts: newLoveProducts }, { merge: true });
    dispatch(UserSlice.actions.setRemoveFromLoveProduct(newLoveProducts));
  };
}

export function addNewAddress(item) {
  return async function addNewAddressThunk(dispatch, getState) {
    let newAddressList;
    let newPhoneNumber;
    let curAddressList = getState().user.data.address;
    let username = getState().user.data.userName;
    const userRef = doc(db, "user", username);

    const temp = { ...item, id: uuid() };

    if (curAddressList.length == 0) {
      newPhoneNumber = item.phoneNumber;
    } else {
      newPhoneNumber = getState().user.data.phoneNumber;
    }

    newAddressList = [...curAddressList, temp];
    await setDoc(userRef, { address: newAddressList }, { merge: true });
    await setDoc(userRef, { phoneNumber: newPhoneNumber }, { merge: true });
    dispatch(
      UserSlice.actions.setAddNewAddress({ newAddressList, newPhoneNumber })
    );
  };
}

export function editAddress(item) {
  return async function editAddressThunk(dispatch, getState) {
    let newAddressList = [];
    let newPhoneNumber;
    let curAddressList = getState().user.data.address;
    let username = getState().user.data.userName;
    const userRef = doc(db, "user", username);

    const itemIndex = curAddressList.findIndex((address) => {
      return address.id == item.id;
    });

    if (itemIndex == 0) {
      newPhoneNumber = item.phoneNumber;
    } else {
      newPhoneNumber = getState().user.data.phoneNumber;
    }

    for (let i = 0; i < curAddressList.length; i++) {
      if (i == itemIndex) {
        newAddressList.push(item);
      } else {
        newAddressList.push(curAddressList[i]);
      }
    }

    await setDoc(userRef, { address: newAddressList }, { merge: true });
    await setDoc(userRef, { phoneNumber: newPhoneNumber }, { merge: true });
    dispatch(
      UserSlice.actions.setEditAddress({ newAddressList, newPhoneNumber })
    );
  };
}

export function conFirmOrder(item) {
  return async function conFirmOrderThunk(dispatch, getState) {
    let newOrdersList;
    let newNotificationList;
    let curOrdersList = getState().user.data.orders;
    let curNotificationList = getState().user.data.notifications;
    let username = getState().user.data.userName;
    const userRef = doc(db, "user", username);

    let idOrder = uuid();
    let time = Timestamp.fromDate(new Date());
    const temp = {
      ...item,
      id: idOrder,
      createdAt: time,
    };
    newOrdersList = [...curOrdersList, temp];
    newNotificationList = [
      {
        id: idOrder,
        status: "pending",
        type: "updateOrder",
        createdAt: time,
      },
      ...curNotificationList,
    ];

    await setDoc(userRef, { orders: newOrdersList }, { merge: true });
    await setDoc(
      userRef,
      { notifications: newNotificationList },
      { merge: true }
    );
    dispatch(
      UserSlice.actions.setConFirmOrder({ newOrdersList, newNotificationList })
    );
  };
}

export function addNotifications(item) {
  return async function addNotificationsThunk(dispatch, getState) {
    let curNotificationsList = getState().user.data.notifications;
    let username = getState().user.data.userName;
    const userRef = doc(db, "user", username);

    let newNotificationsList = [item, ...curNotificationsList];
    await setDoc(
      userRef,
      { notifications: newNotificationsList },
      { merge: true }
    );
    dispatch(UserSlice.actions.setAddNotifications(newNotificationsList));
  };
}

export function userChangePassword(item) {
  return async function userChangePassWordThunk(dispatch, getState) {
    let username = getState().user.data.userName;
    const userRef = doc(db, "user", username);
    await setDoc(userRef, { password: item }, { merge: true });
    dispatch(UserSlice.actions.setUserChangePassword(item));
  };
}

export function userChangeInfo(item) {
  return async function userChangeInfoThunk(dispatch, getState) {
    let newValue = item.value;
    let key = item.key;
    let username = getState().user.data.userName;
    const userRef = doc(db, "user", username);
    await setDoc(userRef, { [key]: newValue }, { merge: true });
    dispatch(
      UserSlice.actions.setUserChangeInfo({ key, newValue, toast: item.toast })
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
