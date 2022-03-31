export interface IGroupStore {
  groups: IGroup[];
}

export interface IGroup {
  id: string;
  createdAt: Date | string;
  lead: string; // uid
  menu: string;
  users: string[]; // uid[]
}
