import {
  setSaveDataPage,
  setSaveFirtItemData,
  setSaveSecondItemData,
} from "../redux/reducers/PageSlice";
import * as service from "../Firebase/Services";

export function pageFetch(page) {
  return async function pageFetchThunk(dispatch) {
    const data = await service.Firebase_getDocs_notCondition(page);
    dispatch(setSaveDataPage({ page, data }));
  };
}

export function pageFetchConditon(page, conditon) {
  return async function pageFetchConditonThunk(dispatch) {
    const data = await service.Firebase_getDocs_condition(page, conditon);
    dispatch(setSaveDataPage({ page, data }));
  };
}

export function pageFetchConditonItem1(page, conditon) {
  return async function pageFetchConditon1Thunk(dispatch) {
    const data = await service.Firebase_getDocs_condition(page, conditon);
    dispatch(setSaveFirtItemData({ page, data }));
  };
}

export function pageFetchConditonItem2(page, conditon) {
  return async function pageFetchConditon2Thunk(dispatch) {
    const data = await service.Firebase_getDocs_condition(page, conditon);
    dispatch(setSaveSecondItemData({ page, data }));
  };
}
