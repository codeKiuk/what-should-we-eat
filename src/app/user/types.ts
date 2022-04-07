export interface IUser {
  name: string;
  uid: string;
  email: string;
}

export interface IUserStore {
  users: IUser[];
  currentUser: IUser;
}
