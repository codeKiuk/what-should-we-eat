import { IGroup, IGroupPayload } from "../app/group/types";

import {
  startAfter,
  collection,
  where,
  query,
  getDocs,
  addDoc,
  Timestamp,
  deleteDoc,
  updateDoc,
  doc,
  arrayUnion,
  arrayRemove,
  limit,
  QueryDocumentSnapshot,
} from "@firebase/firestore";
import { db, firebaseAuth } from "@/main";

let lastDocument = {};

export const getFirstGroups = async () => {
  const date = new Date();
  const startTimeOfToday = new Date(date.setHours(0, 0, 0, 0));

  try {
    const firstPageQuery = query(
      collection(db, "Group"),
      where("createdAt", ">=", Timestamp.fromDate(startTimeOfToday)),
      limit(20)
    );
    const querySnapshot = await getDocs(firstPageQuery);
    lastDocument = querySnapshot.docs[querySnapshot.docs.length - 1];

    const groups = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return groups;
  } catch (e: any) {
    throw new Error(e);
  }
};

export const getNextGroups = async () => {
  const date = new Date();
  const startTimeOfToday = new Date(date.setHours(0, 0, 0, 0));

  try {
    const nextPageQuery = query(
      collection(db, "Groups"),
      where("createdAt", ">=", Timestamp.fromDate(startTimeOfToday)),
      startAfter(lastDocument),
      limit(20)
    );

    const querySnapshot = await getDocs(nextPageQuery);
    lastDocument = querySnapshot.docs[querySnapshot.docs.length - 1];

    const groups = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return groups;
  } catch (e: any) {
    throw new Error(e);
  }
};

export const getGroups = async () => {
  const date = new Date();
  const startTimeOfToday = new Date(date.setHours(0, 0, 0, 0));

  try {
    const q = query(
      collection(db, "Group"),
      where("createdAt", ">=", Timestamp.fromDate(startTimeOfToday))
    );
    const querySnapshot = await getDocs(q);

    const groups = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return groups;
  } catch (e: any) {
    throw new Error("Failed to Get Groups");
  }
};

export const createGroup = async (newGroup: IGroupPayload) => {
  try {
    const docRef = await addDoc(collection(db, "Group"), newGroup);
    return docRef.id;
  } catch (e) {
    throw new Error("Failed to Create Group");
  }
};

export const deleteGroup = async (id: string) => {
  try {
    await deleteDoc(doc(db, "Group", id));
    return true;
  } catch (e) {
    throw new Error("No such document");
  }
};

export const participateInGroup = async (id: string) => {
  if (!firebaseAuth.currentUser) return;

  try {
    const currentUserId = firebaseAuth.currentUser.uid;
    const docRef = await doc(db, "Group", id);

    await updateDoc(docRef, { users: arrayUnion(currentUserId) });
  } catch (e) {
    throw new Error("Failed to Participate in Group");
  }
};

export const comeOutFromGroup = async (id: string) => {
  if (!firebaseAuth.currentUser) return;

  try {
    const currentUserId = firebaseAuth.currentUser.uid;
    const docRef = await doc(db, "Group", id);

    await updateDoc(docRef, { users: arrayRemove(currentUserId) });
  } catch (e) {
    throw new Error("Failed to Come out from Group");
  }
};
