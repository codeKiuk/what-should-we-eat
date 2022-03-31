import { collection, query, getDocs } from "@firebase/firestore";
import { db } from "@/main";

export const getMenus = async () => {
  const q = query(collection(db, "Menu"));
  const querySnapshot = await getDocs(q);
  const menus = querySnapshot.docs.map((doc) => doc.data());
  return menus;
};
