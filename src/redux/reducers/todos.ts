import { ITodos, TodoAction, TodoActionTypes } from '../../types/todos';

const initialState: ITodos = {
  todos: [],
};

const todos = (state = initialState, action: TodoAction) => {
  switch (action.type) {
    case TodoActionTypes.SET_TODOS:
      return {
        todos: action.payload.todos,
      };
    case TodoActionTypes.ADD_TODOS:
      return [...state.todos, action.payload];

    case TodoActionTypes.UPDATE_TODO:
      const todosCopy = state.todos.map((todo: any, key: number) => {
        if (key === action.payload) {
          return {
            ...todo,
            isCompleted: !todo.isCompleted,
          };
        }
        return todo;
      });
      return {
        ...state,
        todos: todosCopy,
      };

    case TodoActionTypes.DELETE_TODO: {
      return {
        ...state,
        todos: [...state.todos.slice(0, action.payload), ...state.todos.slice(action.payload + 1)],
      };
    }
    case TodoActionTypes.DELETE_ALL: {
      return {
        ...state,
        todos: [],
      };
    }
    default:
      return state;
  }
};

export default todos;
