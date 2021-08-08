import Head from "next/head";
import { ReduxCounter } from "components/widgets/examples/ReduxCounter";
import { TodoList } from "components/widgets/examples/TodoList";
import { TodoForm } from "components/widgets/examples/TodoForm";

const Page = () => {
  return (
    <>
      <Head>
        <title>NextJS Base : Página Teste</title>
      </Head>

      <h2 className={"display-4 text-muted"}>Página Teste</h2>

      <p className={"lead"}>Apenas uma página de teste com algumas coisas.</p>

      <hr/>

      <h4>Contador com Redux</h4>

      <ReduxCounter />

      <hr/>

      <h4>Lista de TODOs usando Context</h4>

      <div className={"container"}>
        <div className={"row"}>
          <div className={"col-12 col-md-6"}>
            <TodoList />
          </div>
          <div className={"col-12 col-md-6"}>
            <TodoForm />
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
