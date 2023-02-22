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

    setEditOrderAddress: (state, action) => {
      state.data.orderAddress = action.payload;
    },
  },
});
// ? okie
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

// ? okie
export function addToCart(item) {
  return async function addToCartThunk(dispatch, getState) {
    let newCartItems = [];
    let username = getState().user.data.userName;
    let curCartItems = getState().user.data.cartItems;
    const userRef = doc(db, "user", username);
    const categoryRef = doc(db, "categoryPage", item.catalogName);
    const itemIndex = curCartItems.findIndex((cartItem) => {
      return cartItem.typeId === item.typeId && cartItem.size === item.size;
    });

    if (itemIndex >= 0) {
      for (let i = 0; i < curCartItems.length; i++) {
        if (i == itemIndex) {
          let editValue = { ...curCartItems[i] };
          editValue.cartQuantity += 1;
          editValue.stock = item.stock;
          editValue.newCatalog = item.newCatalog;
          newCartItems.push(editValue);
        } else if (curCartItems[i].catalog == item.catalog) {
          newCartItems.push({
            ...curCartItems[i],
            newCatalog: item.newCatalog,
          });
        }
      }
    } else {
      for (let i = 0; i < curCartItems.length; i++) {
        if (curCartItems[i].catalog == item.catalog) {
          newCartItems.push({
            ...curCartItems[i],
            newCatalog: item.newCatalog,
          });
        } else {
          newCartItems.push(curCartItems[i]);
        }
      }
      const temp = { ...item, cartQuantity: 1 };
      newCartItems.push(temp);
    }

    await setDoc(categoryRef, { items: item.newCatalog }, { merge: true });
    await setDoc(userRef, { cartItems: newCartItems }, { merge: true });
    dispatch(
      UserSlice.actions.setUserChangeInfo({
        key: "cartItems",
        newValue: newCartItems,
        toast: "Add to cart successfully",
      })
    );
  };
}

// ? okie
export function removeFromCart(item) {
  return async function removeFromCartThunk(dispatch, getState) {
    let newCartItems = [];
    let username = getState().user.data.userName;
    let curCartItems = getState().user.data.cartItems;
    const userRef = doc(db, "user", username);
    const categoryRef = doc(db, "categoryPage", item.catalogName);
    const removeItem = curCartItems.filter((cartItem) => {
      return cartItem.typeId !== item.typeId || cartItem.size !== item.size;
    });

    for (let i = 0; i < removeItem.length; i++) {
      if (removeItem[i].catalog == item.catalog) {
        newCartItems.push({
          ...removeItem[i],
          newCatalog: item.newUpdateProductInfo,
        });
      } else {
        newCartItems.push(removeItem[i]);
      }
    }

    await setDoc(
      categoryRef,
      { items: item.newUpdateProductInfo },
      { merge: true }
    );
    await setDoc(userRef, { cartItems: newCartItems }, { merge: true });
    dispatch(
      UserSlice.actions.setUserChangeInfo({
        key: "cartItems",
        newValue: newCartItems,
        toast: "Removed successfully",
      })
    );
  };
}

// ? okie
export function increaseQuantity(item) {
  return async function increaseQuantityThunk(dispatch, getState) {
    let newCartItems = [];
    let curCartItems = getState().user.data.cartItems;
    let username = getState().user.data.userName;
    const categoryRef = doc(db, "categoryPage", item.catalogName);
    const userRef = doc(db, "user", username);

    const itemIndex = curCartItems.findIndex((cartItem) => {
      return cartItem.typeId === item.typeId && cartItem.size === item.size;
    });

    let editValue = { ...curCartItems[itemIndex] };
    editValue.cartQuantity += 1;
    editValue.stock -= 1;
    editValue.newCatalog = item.newUpdateProductInfo;
    for (let i = 0; i < curCartItems.length; i++) {
      if (i == itemIndex) {
        console.log("in1");
        newCartItems.push(editValue);
      } else if (curCartItems[i].catalog == item.catalog) {
        console.log("in2");
        newCartItems.push({
          ...curCartItems[i],
          newCatalog: item.newUpdateProductInfo,
        });
      } else {
        console.log("in3");
        newCartItems.push(curCartItems[i]);
      }
    }

    await setDoc(
      categoryRef,
      { items: item.newUpdateProductInfo },
      { merge: true }
    );
    await setDoc(userRef, { cartItems: newCartItems }, { merge: true });
    dispatch(
      UserSlice.actions.setUserChangeInfo({
        key: "cartItems",
        newValue: newCartItems,
      })
    );
  };
}

// ? okie
export function decreaseQuantity(item) {
  return async function decreaseQuantityThunk(dispatch, getState) {
    let newCartItems = [];
    let curCartItems = getState().user.data.cartItems;
    let username = getState().user.data.userName;
    const userRef = doc(db, "user", username);
    const categoryRef = doc(db, "categoryPage", item.catalogName);

    const itemIndex = curCartItems.findIndex((cartItem) => {
      return cartItem.typeId === item.typeId && cartItem.size === item.size;
    });

    for (let i = 0; i < curCartItems.length; i++) {
      if (curCartItems[i].cartQuantity == 1 && itemIndex == i) {
        continue;
      } else if (curCartItems[i].cartQuantity !== 1 && itemIndex == i) {
        let editValue = { ...curCartItems[i] };
        editValue.cartQuantity -= 1;
        editValue.stock += 1;
        editValue.newCatalog = item.newUpdateProductInfo;
        newCartItems.push(editValue);
      } else if (curCartItems[i].catalog == item.catalog) {
        newCartItems.push({
          ...curCartItems[i],
          newCatalog: item.newUpdateProductInfo,
        });
      } else {
        newCartItems.push(...curCartItems[i]);
      }
    }

    await setDoc(
      categoryRef,
      { items: item.newUpdateProductInfo },
      { merge: true }
    );
    await setDoc(userRef, { cartItems: newCartItems }, { merge: true });
    dispatch(
      UserSlice.actions.setUserChangeInfo({
        key: "cartItems",
        newValue: newCartItems,
      })
    );
  };
}

// ? okie
export function clearCart() {
  return async function clearCartThunk(dispatch, getState) {
    let newCartItems = [];
    let username = getState().user.data.userName;
    const userRef = doc(db, "user", username);
    await setDoc(userRef, { cartItems: newCartItems }, { merge: true });
    dispatch(
      UserSlice.actions.setUserChangeInfo({
        key: "cartItems",
        newValue: newCartItems,
      })
    );
  };
}

// ? okie
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
    dispatch(
      UserSlice.actions.setUserChangeInfo({
        key: "loveProducts",
        newValue: newLoveProducts,
        toast: "Add to favorite list successfully!",
      })
    );
  };
}

// ? okie
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
    dispatch(
      UserSlice.actions.setUserChangeInfo({
        key: "loveProducts",
        newValue: newLoveProducts,
        toast: "Removed successfully!",
      })
    );
  };
}

// ? okie
export function addNewAddress(item) {
  return async function addNewAddressThunk(dispatch, getState) {
    let newAddressList;
    let newPhoneNumber;
    let curAddressList = getState().user.data.address;
    let curPhoneNumber = getState().user.data.phoneNumber;
    let username = getState().user.data.userName;
    const userRef = doc(db, "user", username);

    const temp = { ...item, id: uuid() };

    if (curAddressList.length == 0 && curPhoneNumber.length == 0) {
      newPhoneNumber = item.phoneNumber;
    } else {
      newPhoneNumber = getState().user.data.phoneNumber;
    }

    newAddressList = [...curAddressList, temp];
    await setDoc(userRef, { address: newAddressList }, { merge: true });
    await setDoc(userRef, { phoneNumber: newPhoneNumber }, { merge: true });
    await dispatch(
      UserSlice.actions.setUserChangeInfo({
        key: "address",
        newValue: newAddressList,
      })
    );
    await dispatch(
      UserSlice.actions.setUserChangeInfo({
        key: "phoneNumber",
        newValue: newPhoneNumber,
      })
    );
  };
}

// ? okie
export function editAddress(item) {
  return async function editAddressThunk(dispatch, getState) {
    let newAddressList = [];
    let curAddressList = getState().user.data.address;
    let username = getState().user.data.userName;
    const userRef = doc(db, "user", username);

    const itemIndex = curAddressList.findIndex((address) => {
      return address.id == item.id;
    });

    for (let i = 0; i < curAddressList.length; i++) {
      if (i == itemIndex) {
        newAddressList.push(item);
      } else {
        newAddressList.push(curAddressList[i]);
      }
    }

    await setDoc(userRef, { address: newAddressList }, { merge: true });
    await dispatch(
      UserSlice.actions.setUserChangeInfo({
        key: "address",
        newValue: newAddressList,
      })
    );
    toast.success("Edit infomation successfully", { duration: 1500 });
  };
}

// ? okie
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
    await dispatch(
      UserSlice.actions.setUserChangeInfo({
        key: "orders",
        newValue: newOrdersList,
      })
    );
    await dispatch(
      UserSlice.actions.setUserChangeInfo({
        key: "notifications",
        newValue: newNotificationList,
      })
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

// ? okie
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
    dispatch(
      UserSlice.actions.setUserChangeInfo({
        key: "notifications",
        newValue: newNotificationsList,
      })
    );
  };
}

// ? okie
export function userChangePassword(item) {
  return async function userChangePassWordThunk(dispatch, getState) {
    let username = getState().user.data.userName;
    const userRef = doc(db, "user", username);
    await setDoc(userRef, { password: item }, { merge: true });
    dispatch(
      UserSlice.actions.setUserChangeInfo({
        key: "password",
        newValue: item,
        toast: `Password changed successfully!`,
      })
    );
  };
}

// ? okie
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

export const { setUserLogout, setEditOrderAddress } = UserSlice.actions;
export default UserSlice.reducer;
