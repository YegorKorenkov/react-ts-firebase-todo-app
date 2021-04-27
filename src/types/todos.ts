export interface ITodo {
  todo: string;
  isCompleted: boolean | null;
  userId: string;
}

export interface ITodos {
  todos: ITodo[];
}

export type TodosPageProps = {
  signOutHandler: () => void;
  currentName: string;
  onFetchTodos: () => void;
  todos: ITodos;
  userId: string;
  onAddTodoHandle: (todo: string, userId: string) => void;
  onUpdateTodoHandle: (todoId: any, isCompleted: boolean) => void;
  onDeleteTodoHandle: (todoId: any) => void;
};

export enum TodoActionTypes {
  SET_TODOS = 'SET_TODOS',
  ADD_TODOS = 'ADD_TODOS',
  UPDATE_TODO = 'UPDATE_TODO',
  DELETE_TODO = 'DELETE_TODO',
  DELETE_ALL = 'DELETE_ALL',
}

export interface SetTodoActionType {
  type: TodoActionTypes.SET_TODOS;
  payload: ITodos;
}

export interface AddTodoActionType {
  type: TodoActionTypes.ADD_TODOS;
  payload: ITodo;
}

export interface UpdateTodoActionType {
  type: TodoActionTypes.UPDATE_TODO;
  payload: number;
}

export interface DeleteTodoActionType {
  type: TodoActionTypes.DELETE_TODO;
  payload: number;
}

export interface DeleteAllTodoActionType {
  type: TodoActionTypes.DELETE_ALL;
}

export type TodoAction =
  | SetTodoActionType
  | AddTodoActionType
  | UpdateTodoActionType
  | DeleteTodoActionType
  | DeleteAllTodoActionType;
