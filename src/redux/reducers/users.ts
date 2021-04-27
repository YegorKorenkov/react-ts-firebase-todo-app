import { IUser, UserAction, UserActionTypes } from '../../types/user';

const initialState: IUser = {
  userId: '',
  userName: '',
  errorMessage: '',
};

const user = (state = initialState, action: UserAction) => {
  switch (action.type) {
    case UserActionTypes.SET_USER:
      return {
        userId: action.payload.userId,
        userName: action.payload.userName,
        errorMessage: action.payload.errorMessage,
      };
    case UserActionTypes.LOGOUT_USER:
      return {
        userId: '',
        userName: '',
        errorMessage: '',
      };

    default:
      return state;
  }
};

export default user;
