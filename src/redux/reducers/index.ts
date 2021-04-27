import { combineReducers } from 'redux';
import user from '../reducers/users';
import todos from '../reducers/todos';

const rootReducer = combineReducers({
  user,
  todos,
});

export default rootReducer;
