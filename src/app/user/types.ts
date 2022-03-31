export interface IUser {
  name: string;
  uid: string;
  email: string;
}

export interface IUserStore {
  isLoggedIn: boolean;
  currentUser: IUser;
}
