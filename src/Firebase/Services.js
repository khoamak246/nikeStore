import { doc, getDoc, setDoc } from "firebase/firestore";
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
