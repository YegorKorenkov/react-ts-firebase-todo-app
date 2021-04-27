export interface IUser {
  userId: string;
  userName: string;
  errorMessage: string;
}

export interface LoginPageProps {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  name: string;
  setName: (name: string) => void;
  error: string;
  hasAccount: boolean;
  setHasAccount: (x: boolean) => void;
  registartionHandle: () => void;
  signInHandle: () => void;
  isLoading: boolean;
}

export enum UserActionTypes {
  SET_USER = 'SET_USER',
  LOGOUT_USER = 'LOGOUT_USER',
}

export interface SetUserActionType {
  type: UserActionTypes.SET_USER;
  payload: IUser;
}

export interface LogoutUserActionType {
  type: UserActionTypes.LOGOUT_USER;
}

export type UserAction = SetUserActionType | LogoutUserActionType;
