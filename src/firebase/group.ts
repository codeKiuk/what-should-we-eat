import { IGroupPayload } from "../app/group/types";

import {
  collection,
  where,
  query,
  getDocs,
  addDoc,
  Timestamp,
} from "@firebase/firestore";
import { db } from "@/main";

export const getGroups = async () => {
  const date = new Date();
  const startTimeOfToday = new Date(date.setHours(0, 0, 0, 0));

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
};

export const createGroup = async (newGroup: IGroupPayload) => {
  const docRef = await addDoc(collection(db, "Group"), newGroup);
  return docRef.id;
};

// export const deleteGroup = () => {};

// export const updateGroup = () => {};

// export const participateInGroup = () => {};

// export const comeOutFromGroup = () => {};
