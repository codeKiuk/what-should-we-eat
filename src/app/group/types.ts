import { Timestamp } from "firebase/firestore";

export interface IGroupStore {
  groups: IGroup[];
}

export interface IGroup {
  id: string;
  createdAt: Timestamp;
  lead: string; // uid
  menu: string;
  users: string[]; // uid[]
}

export interface IGroupPayload {
  createdAt: Timestamp;
  lead: string; // uid
  menu: string;
  users: string[]; // uid[]
}
