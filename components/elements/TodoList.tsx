import { useTodoContext, useTodoDispatch } from "core/context/todo";

/**
 * components/elements/TodoList
 * ----------------------------------------------------------------------
 */
export const TodoList = () => {
  const state = useTodoContext();

  const dispatch = useTodoDispatch();

  const deleteTodo = (id) => () => {
    dispatch({
      type: "TODO_REMOVE",
      payload: id
    });
  };

  return (
    <>
      <h5>Lista de Todos</h5>

      <ul>
        {state.length < 1 && (
          <li className={"text-muted"}><em>Nenhum TODO cadastrado</em></li>
        )}
        {state.length > 0 && state.map((item, key) => {
          return (
            <li key={key}>
              {item.value} <button className={"btn btn-danger"} onClick={deleteTodo(key)}>X</button>
            </li>
          );
        })}
      </ul>
    </>
  );
};
