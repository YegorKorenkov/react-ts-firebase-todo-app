import clsx from 'clsx';
import React from 'react';
import { Button } from '../../components/Button';
import { TodoList } from '../../components/TodoList';
import { WhiteBlock } from '../../components/WhiteBlock';
import { TodosPageProps } from '../../types/todos';
import styles from './TodosPage.module.scss';

export const TodosPage: React.FC<TodosPageProps> = ({
  signOutHandler,
  currentName,
  onFetchTodos,
  todos,
  userId,
  onAddTodoHandle,
  onUpdateTodoHandle,
  onDeleteTodoHandle,
}) => {
  const [todo, setTodo] = React.useState<string>('');

  React.useEffect(() => {
    onFetchTodos();
  }, []);

  const addTodo = () => {
    onAddTodoHandle(todo, userId);
    setTodo('');
  };

  return (
    <div className={styles.todoPage}>
      <div className="d-flex align-items-center justify-content-center">
        <h1 className="mr-20">Hi, {currentName}&#128578;</h1>
        <Button className={styles.logoutButton} onClick={signOutHandler}>
          Logout
        </Button>
      </div>

      <h3 className="mt-50">Add your todos &#128195;</h3>
      <div className="d-flex align-items-center justify-content-center mt-10">
        <input placeholder="Write a todo" value={todo} onChange={(e) => setTodo(e.target.value)} />
        <Button className={styles.addButton} color="blue" onClick={addTodo}>
          Add
        </Button>
      </div>
      <WhiteBlock className={clsx('m-auto mt-50', styles.whiteBlock)}>
        <TodoList
          todos={todos.todos}
          updateTodoHandle={onUpdateTodoHandle}
          onDeleteTodoHandle={onDeleteTodoHandle}
        />
      </WhiteBlock>
    </div>
  );
};
