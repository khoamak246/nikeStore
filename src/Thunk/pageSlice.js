import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../Firebase/Config";
import {
  setSaveDataPage,
  setSaveFirtItemData,
  setSaveSecondItemData,
} from "../redux/reducers/PageSlice";

export function pageFetch(page) {
  return function pageFetchThunk(dispatch) {
    let collectionRef = query(collection(db, page), orderBy("createdAt"));
    const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        ...doc.data(),
      }));
      dispatch(setSaveDataPage({ page, data }));
    });
  };
}

export function pageFetchConditon(page, condition) {
  return function pageFetchThunk(dispatch) {
    let collectionRef = query(
      collection(db, page),
      where(condition.fieldName, condition.operator, condition.compareValue)
    );
    const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        ...doc.data(),
      }));
      dispatch(setSaveDataPage({ page, data }));
    });
  };
}

export function pageFetchConditonItem1(page, condition) {
  return function pageFetchThunk(dispatch) {
    let collectionRef = query(
      collection(db, page),
      where(condition.fieldName, condition.operator, condition.compareValue)
    );
    const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        ...doc.data(),
      }));
      dispatch(setSaveFirtItemData({ page, data }));
    });
  };
}

export function pageFetchConditonItem2(page, condition) {
  return function pageFetchThunk(dispatch) {
    let collectionRef = query(
      collection(db, page),
      where(condition.fieldName, condition.operator, condition.compareValue)
    );
    const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        ...doc.data(),
      }));
      dispatch(setSaveSecondItemData({ page, data }));
    });
  };
}
