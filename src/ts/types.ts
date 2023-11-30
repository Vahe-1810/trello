export interface ICard {
  id: string;
  title: string;
  todos: ITodo[];
  readOnly: boolean;
}

export interface ITodo {
  value: string;
  id: string;
  readOnly: boolean;
}
