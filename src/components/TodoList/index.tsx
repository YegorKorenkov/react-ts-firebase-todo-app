import clsx from 'clsx';
import React from 'react';
import { ITodo } from '../../types/todos';
import { Button } from '../Button';
import styles from './TodoList.module.scss';

interface TodoListProps {
  todos: ITodo[];
  updateTodoHandle: (key: number, isCompleted: boolean) => void;
  onDeleteTodoHandle: (key: number) => void;
}

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  updateTodoHandle,
  onDeleteTodoHandle,
}) => {
  const onUpdateTodo = (id: any, isCompleted: boolean) => {
    updateTodoHandle(id, isCompleted);
  };

  if (typeof todos !== 'undefined') {
    if (todos.length === 0)
      return (
        <div className={clsx('', styles.empty)}>
          <p>No todo yet 🌍</p>
        </div>
      );
  }

  return (
    <ul className={styles.todosList}>
      {todos ? (
        todos.map((todo: any, key: number) => (
          <li key={key + todo.userId}>
            <div className="d-flex flex-column align-items-start">
              <p>{todo.todo}</p>
              {todo.isCompleted ? (
                <p className={styles.subtitle}>Completed &#9989;</p>
              ) : (
                <p className={styles.subtitle}>In progress ⚡</p>
              )}
            </div>

            <div className="d-flex align-items-center">
              <Button
                className={styles.button}
                color="transparent"
                onClick={() => onUpdateTodo(key, todo.isCompleted)}>
                {todo.isCompleted ? 'UNDONE' : 'DONE'}
              </Button>
              <span className={styles.deleteIcon} onClick={() => onDeleteTodoHandle(key)}>
                <svg>
                  <path
                    fill="currentColor"
                    d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z"
                  />
                </svg>
              </span>
            </div>
          </li>
        ))
      ) : (
        <div className="loader"></div>
      )}
    </ul>
  );
};
