import { firestore } from '../../firebase/firebase';
import { Dispatch } from 'redux';
import firebase from 'firebase';
import { ITodo, ITodos, TodoActionTypes } from '../../types/todos';

export const setTodos = (todos: ITodos) => ({
  type: TodoActionTypes.SET_TODOS,
  payload: todos,
});

export const addTodo = (todo: ITodo) => ({
  type: TodoActionTypes.ADD_TODOS,
  payload: todo,
});

export const updateTodo = (todoId: number) => ({
  type: TodoActionTypes.UPDATE_TODO,
  payload: todoId,
});

export const deleteTodo = (todoId: number) => ({
  type: TodoActionTypes.DELETE_TODO,
  payload: todoId,
});

export const deleteAllTodo = () => ({
  type: TodoActionTypes.DELETE_ALL,
});

export const fetchTodos = (userId: string) => (dispatch: Dispatch<any>) => {
  firestore
    .collection('todos')
    .where('userId', '==', userId)
    .get()
    .then((querySnapshot) => {
      const data: any = [];
      querySnapshot.forEach((doc) => {
        data.push(doc.data());
      });
      dispatch(
        setTodos({
          todos: data,
        }),
      );
    });
};

export const onAddTodo = (todo: string, userId: string) => (dispatch: Dispatch) => {
  firestore.collection('todos').add({
    userId: userId,
    todo: todo,
    isCompleted: false,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  });

  dispatch(
    addTodo({
      userId: userId,
      todo: todo,
      isCompleted: false,
    }),
  );
};

export const onUpdateTodo = (todoId: number, userId: string, isCompleted: boolean) => (
  dispatch: Dispatch,
) => {
  dispatch(updateTodo(todoId));
  firestore
    .collection('todos')
    .where('userId', '==', userId)
    .get()
    .then((querySnapshot) => {
      let todosId: string[] = [];
      querySnapshot.forEach((doc) => {
        todosId.push(doc.id);
      });
      firestore.collection('todos').doc(todosId[todoId]).update({
        isCompleted: !isCompleted,
      });
    });
};

export const onDeleteTodo = (todoId: number, userId: string) => (dispatch: Dispatch) => {
  dispatch(deleteTodo(todoId));
  firestore
    .collection('todos')
    .where('userId', '==', userId)
    .get()
    .then((querySnapshot) => {
      let todosId: string[] = [];
      querySnapshot.forEach((doc) => {
        todosId.push(doc.id);
      });
      firestore.collection('todos').doc(todosId[todoId]).delete();
    });
};

export const onDeleteAllTodo = () => (dispatch: Dispatch) => {
  dispatch(deleteAllTodo());
};
