import { Timestamp } from "firebase/firestore";
import { IUser } from "../user/types";

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

export interface IGroupJoin {
  id: string;
  createdAt: Timestamp;
  lead: IUser; // uid
  menu: string;
  users: IUser[]; // uid[]
}

export interface IGroupPayload {
  createdAt: Timestamp;
  lead: string; // uid
  menu: string;
  users: string[]; // uid[]
}
