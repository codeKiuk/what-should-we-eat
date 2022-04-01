export interface IUser {
  name: string;
  uid: string;
  email: string;
}

export interface IUserStore {
  users: IUser[];
  isLoggedIn: boolean;
  currentUser: IUser;
}
