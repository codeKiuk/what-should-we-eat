import {
  addDoc,
  collection,
  getDocs,
  limit,
  query,
  startAfter,
} from "@firebase/firestore";
import { db } from "@/main";
import { IMenuPayload } from "@/app/menu/types";

let lastDocuments = {};

export const getFirstMenus = async () => {
  try {
    const firstPageQuery = query(collection(db, "Group"), limit(20));

    const querySnapshot = await getDocs(firstPageQuery);
    lastDocuments = querySnapshot.docs[querySnapshot.docs.length - 1];

    const menus = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return menus;
  } catch (e: any) {
    throw new Error(e);
  }
};

export const getNextMenus = async () => {
  try {
    const nextPageQuery = query(
      collection(db, "Group"),
      limit(20),
      startAfter(lastDocuments)
    );

    const querySnapshot = await getDocs(nextPageQuery);
    lastDocuments = querySnapshot.docs[querySnapshot.docs.length - 1];

    const menus = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return menus;
  } catch (e: any) {
    throw new Error(e);
  }
};

export const getMenus = async () => {
  try {
    const q = query(collection(db, "Menu"));
    const querySnapshot = await getDocs(q);
    const menus = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return menus;
  } catch (e) {
    throw new Error("Failed to get Menus");
  }
};

export const createMenus = async (Menus: IMenuPayload[]) => {
  try {
    await Menus.forEach((menu) => {
      addDoc(collection(db, "Menu"), menu);
    });
  } catch (e) {
    throw new Error("Failed to Create Menus");
  }
};
