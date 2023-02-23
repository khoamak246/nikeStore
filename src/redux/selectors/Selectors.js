export const userAuthorizedState = (state) => state.user.authorized;
export const userDataSelector = (state) => state.user.data;
export const userNotificationSelector = (state) =>
  state.user.data.notifications;
export const userDisplayNameSelector = (state) => state.user.data.displayName;
export const userAvatarSelector = (state) => state.user.data.avatar;
export const userPasswordSelector = (state) => state.user.data.password;
export const userCartSelector = (state) => state.user.data.cartItems;
export const userLoveProductSelector = (state) => state.user.data.loveProducts;
export const userAddressSelector = (state) => state.user.data.address;
export const userOrderAddressSelector = (state) => state.user.data.orderAddress;
export const userOrderListSelector = (state) => state.user.data.orders;
export const toogleStateSelector = (state) => state.toogle.toogleState;
export const pageDataSelector = (state) => state.page.page;
export const pageDataLoadingState = (state) => state.page.loadingState;
export const pageItem1Data = (state) => state.page.pageItem1;
export const pageItem2Data = (state) => state.page.pageItem2;
