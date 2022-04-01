import { IGroupPayload } from "../app/group/types";

import {
  collection,
  where,
  query,
  getDocs,
  addDoc,
  Timestamp,
  deleteDoc,
  updateDoc,
  doc,
} from "@firebase/firestore";
import { db } from "@/main";

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

// export const updateGroup = () => {};

// export const participateInGroup = () => {};

// export const comeOutFromGroup = () => {};
