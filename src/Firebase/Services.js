import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "./Config";

export async function Firebase_setDoc(collecttion, documentID, key, data) {
  const docRef = doc(db, collecttion, documentID);
  await setDoc(docRef, { [key]: data }, { merge: true });
}

export async function Firebase_getDoc(collecttion, documentID) {
  const docRef = doc(db, collecttion, documentID);
  const docSnap = await getDoc(docRef);
  return docSnap;
}

export async function Firebase_getDocs(documentID, condition) {
  let result = [];
  const docRef = query(
    collection(db, documentID),
    where(condition.fieldName, condition.operator, condition.compareValue)
  );
  const docSnap = await getDocs(docRef);
  docSnap.forEach((val) => {
    result.push(val.data());
  });
  return result;
}

export async function Firebase_getDocs_condition(documentID, condition) {
  let result = [];
  const docRef = query(
    collection(db, documentID),
    where(condition.fieldName, condition.operator, condition.compareValue)
  );
  const docSnap = await getDocs(docRef);
  docSnap.forEach((val) => {
    result.push(val.data());
  });
  return result;
}

export async function Firebase_getDocs_notCondition(documentID) {
  let result = [];
  const docRef = query(collection(db, documentID), orderBy("createdAt"));
  const docSnap = await getDocs(docRef);
  docSnap.forEach((val) => {
    result.push(val.data());
  });
  return result;
}
