/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useTypeSelector } from '../hooks/useTypeSelector';
import { useActions } from '../hooks/useActions';

export const TodoList: React.FC = () => {
  const { todos, error, limit, loading, page } = useTypeSelector(
    (state) => state.todo
  );
  const { fetchTodos, setTodoPage } = useActions();

  const pages = [1, 2, 3, 4, 5, 6]

    useEffect(() => {
      fetchTodos(page, limit);
    }, [page]);

  if (loading) {
    return <h1>Идёт загрузка списка дел...</h1>;
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <div>
      {todos.map((todo) => (
        <div key={todo.id}>
          {todo.id} - {todo.title}
        </div>
      ))}
      <div style={{ display: "flex" }}>
        {pages.map((p) => (
          <div 
            key={p} 
            onClick={() => setTodoPage(p)}
            style={{border: p === page ? '2px solid green' : '1px solid gray', padding: 10 }}>
            {p}
          </div>
        ))}
      </div>
    </div>
  );
};
