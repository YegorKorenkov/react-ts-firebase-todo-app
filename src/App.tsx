import React from 'react';
import './styles/globals.scss';
import { LoginPage } from './pages/LoginPage/';
import { TodosPage } from './pages/TodosPage';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUser, logout } from './redux/actions/users';
import {
  fetchTodos,
  onAddTodo,
  onUpdateTodo,
  onDeleteTodo,
  onDeleteAllTodo,
} from './redux/actions/todos';
import { ITodos } from './types/todos';
import { IUser } from './types/user';

const App = () => {
  const dispatch = useDispatch();
  const user: IUser = useSelector(({ user }: any) => user);
  const todosData = useSelector((todos: any) => todos.todos);

  const initializeTodo: ITodos = { todos: [{ todo: '', isCompleted: null, userId: '' }] };

  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [userId, setUserId] = React.useState<string>('');
  const [name, setName] = React.useState<string>('');
  const [currentName, setCurrentName] = React.useState<string>('');
  const [error, setError] = React.useState<string>('');
  const [hasAccount, setHasAccount] = React.useState<boolean>(true);
  const [todosx, setTodos] = React.useState<ITodos>(initializeTodo);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (user.userId && user.userName) {
      setUserId(user.userId);
      setCurrentName(user.userName);
      setIsLoading(false);
    }
    if (user.errorMessage) {
      setIsLoading(false);
      setError(user.errorMessage);
    }
  }, [user]);

  React.useEffect(() => {
    setTodos(todosData);
  }, [todosData]);

  React.useEffect(() => {
    clearInputs();
  }, [hasAccount]);

  React.useEffect(() => {
    logout();
  }, []);

  const registartionHandle = () => {
    setIsLoading(true);
    dispatch(fetchUser(email, password, hasAccount, name));
  };

  const signInHandle = () => {
    setIsLoading(true);
    dispatch(fetchUser(email, password, hasAccount, name));
  };

  const clearInputs = () => {
    setEmail('');
    setName('');
    setPassword('');
    setError('');
  };

  const signOutHandler = () => {
    dispatch(logout());
    dispatch(onDeleteAllTodo());
    setUserId('');
    clearInputs();
  };

  const onFetchTodos = () => {
    dispatch(fetchTodos(userId));
  };

  const onAddTodoHandle = (todo: string, userId: string) => {
    dispatch(onAddTodo(todo, userId));
    onFetchTodos();
  };

  const onUpdateTodoHandle = (todoId: any, isCompleted: boolean) => {
    dispatch(onUpdateTodo(todoId, userId, isCompleted));
  };

  const onDeleteTodoHandle = (todoId: any) => {
    dispatch(onDeleteTodo(todoId, userId));
  };

  return (
    <div className="App">
      {userId ? (
        <TodosPage
          todos={todosx}
          signOutHandler={signOutHandler}
          currentName={currentName}
          onFetchTodos={onFetchTodos}
          onAddTodoHandle={onAddTodoHandle}
          userId={userId}
          onUpdateTodoHandle={onUpdateTodoHandle}
          onDeleteTodoHandle={onDeleteTodoHandle}
        />
      ) : (
        <LoginPage
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          name={name}
          setName={setName}
          error={error}
          hasAccount={hasAccount}
          setHasAccount={setHasAccount}
          registartionHandle={registartionHandle}
          signInHandle={signInHandle}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};

export default App;
