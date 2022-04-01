import { collection, query, getDocs, addDoc, doc } from "@firebase/firestore";
import { db } from "@/main";
import { IMenu, IMenuPayload } from "@/app/menu/types";

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
