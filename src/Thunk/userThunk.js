import { Timestamp } from "firebase/firestore";
import { v4 as uuid } from "uuid";
import { toast } from "react-hot-toast";
import * as services from "../Firebase/Services";
import { setUserChangeInfo, setUserLogin } from "../redux/reducers/UserSlice";

export function userLogin(user) {
  return async function userLoginThunk(dispatch) {
    let lastLoginTime = Timestamp.fromDate(new Date());
    let displayUserName = "";
    await services.Firebase_setDoc(
      "user",
      user.username,
      "lastLogin",
      lastLoginTime
    );
    const docUserSnap = await services.Firebase_getDoc("user", user.username);
    if (docUserSnap.exists()) {
      const userData = { ...docUserSnap.data(), orderAddress: 0 };
      dispatch(setUserLogin(userData));
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

    await services.Firebase_setDoc(
      "categoryPage",
      item.catalogName,
      "items",
      item.newCatalog
    );
    await services.Firebase_setDoc("user", username, "cartItems", newCartItems);
    dispatch(
      setUserChangeInfo({
        key: "cartItems",
        newValue: newCartItems,
        toast: "Add to cart successfully",
      })
    );
  };
}

export function increaseQuantity(item) {
  return async function increaseQuantityThunk(dispatch, getState) {
    let newCartItems = [];
    let curCartItems = getState().user.data.cartItems;
    let username = getState().user.data.userName;

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

    await services.Firebase_setDoc(
      "categoryPage",
      item.catalogName,
      "items",
      item.newUpdateProductInfo
    );
    await services.Firebase_setDoc("user", username, "cartItems", newCartItems);
    dispatch(
      setUserChangeInfo({
        key: "cartItems",
        newValue: newCartItems,
      })
    );
  };
}

export function decreaseQuantity(item) {
  return async function decreaseQuantityThunk(dispatch, getState) {
    let newCartItems = [];
    let curCartItems = getState().user.data.cartItems;
    let username = getState().user.data.userName;

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

    await services.Firebase_setDoc(
      "categoryPage",
      item.catalogName,
      "items",
      item.newUpdateProductInfo
    );
    await services.Firebase_setDoc("user", username, "cartItems", newCartItems);
    dispatch(
      setUserChangeInfo({
        key: "cartItems",
        newValue: newCartItems,
      })
    );
  };
}

export function removeFromCart(item) {
  return async function removeFromCartThunk(dispatch, getState) {
    let newCartItems = [];
    let username = getState().user.data.userName;
    let curCartItems = getState().user.data.cartItems;
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

    await services.Firebase_setDoc(
      "categoryPage",
      item.catalogName,
      "items",
      item.newUpdateProductInfo
    );
    await services.Firebase_setDoc("user", username, "cartItems", newCartItems);
    dispatch(
      setUserChangeInfo({
        key: "cartItems",
        newValue: newCartItems,
        toast: "Removed successfully",
      })
    );
  };
}

export function clearCart() {
  return async function clearCartThunk(dispatch, getState) {
    let newCartItems = [];
    let username = getState().user.data.userName;
    await services.Firebase_setDoc("user", username, "cartItems", newCartItems);
    dispatch(
      setUserChangeInfo({
        key: "cartItems",
        newValue: newCartItems,
      })
    );
  };
}

export function addToLoveProduct(item) {
  return async function addToLoveProductThunk(dispatch, getState) {
    let newLoveProducts = [];
    let username = getState().user.data.userName;
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

    await services.Firebase_setDoc(
      "user",
      username,
      "loveProducts",
      newLoveProducts
    );
    dispatch(
      setUserChangeInfo({
        key: "loveProducts",
        newValue: newLoveProducts,
        toast: "Add to favorite list successfully!",
      })
    );
  };
}

export function removeFromLoveProduct(item) {
  return async function removeFromLoveProductThunk(dispatch, getState) {
    let newLoveProducts;
    let curloveProducts = getState().user.data.loveProducts;
    let username = getState().user.data.userName;
    const removeItem = curloveProducts.filter((loveProduct) => {
      return loveProduct.typeId !== item.typeId;
    });
    newLoveProducts = removeItem;
    await services.Firebase_setDoc(
      "user",
      username,
      "loveProducts",
      newLoveProducts
    );
    dispatch(
      setUserChangeInfo({
        key: "loveProducts",
        newValue: newLoveProducts,
        toast: "Removed successfully!",
      })
    );
  };
}

export function addNewAddress(item) {
  return async function addNewAddressThunk(dispatch, getState) {
    let newAddressList;
    let newPhoneNumber;
    let curAddressList = getState().user.data.address;
    let curPhoneNumber = getState().user.data.phoneNumber;
    let username = getState().user.data.userName;

    const temp = { ...item, id: uuid() };

    if (curAddressList.length == 0 && curPhoneNumber.length == 0) {
      newPhoneNumber = item.phoneNumber;
    } else {
      newPhoneNumber = getState().user.data.phoneNumber;
    }

    newAddressList = [...curAddressList, temp];
    await services.Firebase_setDoc("user", username, "address", newAddressList);
    await services.Firebase_setDoc(
      "user",
      username,
      "phoneNumber",
      newPhoneNumber
    );
    await dispatch(
      setUserChangeInfo({
        key: "address",
        newValue: newAddressList,
      })
    );
    await dispatch(
      setUserChangeInfo({
        key: "phoneNumber",
        newValue: newPhoneNumber,
      })
    );
  };
}

export function editAddress(item) {
  return async function editAddressThunk(dispatch, getState) {
    let newAddressList = [];
    let curAddressList = getState().user.data.address;
    let username = getState().user.data.userName;

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

    await services.Firebase_setDoc("user", username, "address", newAddressList);
    await dispatch(
      setUserChangeInfo({
        key: "address",
        newValue: newAddressList,
      })
    );
    toast.success("Edit infomation successfully", { duration: 1500 });
  };
}

export function conFirmOrder(item) {
  return async function conFirmOrderThunk(dispatch, getState) {
    let newOrdersList;
    let newNotificationList;
    let curOrdersList = getState().user.data.orders;
    let curNotificationList = getState().user.data.notifications;
    let username = getState().user.data.userName;

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

    await services.Firebase_setDoc("user", username, "orders", newOrdersList);
    await services.Firebase_setDoc(
      "user",
      username,
      "notifications",
      newNotificationList
    );
    await dispatch(
      setUserChangeInfo({
        key: "orders",
        newValue: newOrdersList,
      })
    );
    await dispatch(
      setUserChangeInfo({
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

export function addNotifications(item) {
  return async function addNotificationsThunk(dispatch, getState) {
    let curNotificationsList = getState().user.data.notifications;
    let username = getState().user.data.userName;

    let newNotificationsList = [item, ...curNotificationsList];
    await services.Firebase_setDoc(
      "user",
      username,
      "notifications",
      newNotificationsList
    );
    dispatch(
      setUserChangeInfo({
        key: "notifications",
        newValue: newNotificationsList,
      })
    );
  };
}

export function userChangePassword(item) {
  return async function userChangePassWordThunk(dispatch, getState) {
    let username = getState().user.data.userName;
    await services.Firebase_setDoc("user", username, "password", item);
    dispatch(
      setUserChangeInfo({
        key: "password",
        newValue: item,
        toast: `Password changed successfully!`,
      })
    );
  };
}

export function userChangeInfo(item) {
  return async function userChangeInfoThunk(dispatch, getState) {
    let newValue = item.value;
    let key = item.key;
    let username = getState().user.data.userName;

    await services.Firebase_setDoc("user", username, key, newValue);
    dispatch(setUserChangeInfo({ key, newValue, toast: item.toast }));
  };
}
