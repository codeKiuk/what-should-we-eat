export interface IGroupStore {
  groups: IGroup[];
}

export interface IGroup {
  createdAt: Date | string;
  lead: string; // uid
  menu: string;
  users: string[]; // uid[]
}
