export interface IMenuStore {
  menus: IMenu[];
}

export interface IMenu {
  id: string;
  name: string;
  imgSrc: string;
}

export interface IMenuPayload {
  name: string;
  imgSrc: string;
}
