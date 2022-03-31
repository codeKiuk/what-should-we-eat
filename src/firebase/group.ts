import { collection, where, query, getDocs } from "@firebase/firestore";
import { db } from "@/main";

export const getGroups = async () => {
  const q = query(collection(db, "Group"));
  const querySnapshot = await getDocs(q);
  const groups = querySnapshot.docs.map((doc) => doc.data());
  return groups;
};

export const getGroup = async (groupId: string) => {
  return null;
};

// const createGroup = () => {};

// const deleteGroup = () => {};

// const updateGroup = () => {};

// const participateInGroup = () => {};

// const comeOutFromGroup = () => {};
