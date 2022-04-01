import { collection, query, getDocs } from "@firebase/firestore";
import { db } from "@/main";

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
