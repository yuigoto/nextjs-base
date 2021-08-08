import { useTodoDispatch } from "core/context/todo";
import { FormEvent } from "react";
import { HashMap } from "core/types";

export const TodoForm = () => {
  const dispatch = useTodoDispatch();

  const addTodo = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const target = (e.target as HTMLFormElement);

    const form = new FormData(target);
    const data: HashMap<any> = {};

    form.forEach((item, key) => {
      data[key] = item;
    });

    data.id = Date.now();
    data.date = (new Date()).toISOString();

    dispatch({
      type: "TODO_ADD",
      payload: data
    });

    target.reset();
  };

  return (
    <form onSubmit={addTodo}>
      <h5>Adicionar Todo</h5>

      <div className="form-group">
        <label>
          Nome da Tarefa
        </label>
        <input type="text" name="value" className={"form-control"} required/>
      </div>

      <button className={"btn btn-info"} type={"submit"}>
        Adicionar
      </button>
    </form>
  );
};
