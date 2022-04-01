export const ListType: {
  Groups: "Groups";
  Menus: "Menus";
} = {
  Groups: "Groups",
  Menus: "Menus",
};

export type TListType = keyof typeof ListType;
