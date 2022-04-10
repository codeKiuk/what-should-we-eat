import {
  collection,
  getDocs,
  limit,
  query,
  startAfter,
} from "@firebase/firestore";
import { db, storage } from "@/main";
import { listAll, ref, uploadBytes, UploadMetadata } from "firebase/storage";

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
    const menuImagesDirRef = ref(storage, "menu-images");

    const menuRefs = await (await listAll(menuImagesDirRef)).items;
    return menuRefs;
  } catch (e) {
    throw new Error("Failed to get Menus");
  }
};

export const createMenu = async ({
  menuName,
  file,
}: {
  menuName: string;
  file: File;
}) => {
  const menuImagesDirRef = ref(storage, "menu-images");
  const menuImageRef = ref(menuImagesDirRef, menuName);
  const metadata: UploadMetadata = {
    customMetadata: {
      id: String(Date.now()),
    },
  };

  try {
    await uploadBytes(menuImageRef, file, metadata);
  } catch (e) {
    throw new Error("Failed to Create Menus");
  }
};
