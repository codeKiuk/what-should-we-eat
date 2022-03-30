import { ITodoState } from "./types";

export const increment = (state: ITodoState) => {
  state.count++;
};
