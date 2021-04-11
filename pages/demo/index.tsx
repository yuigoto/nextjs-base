import Head from "next/head";
import { ReduxCounter } from "components/elements/ReduxCounter";
import { TodoList } from "components/elements/TodoList";
import { TodoForm } from "components/elements/TodoForm";

/**
 * pages/demo
 * ----------------------------------------------------------------------
 */

/**
 * Interface de props da página.
 */
interface IPageProps {
}

const Page = ({
}: IPageProps) => {
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
            <TodoList/>
          </div>
          <div className={"col-12 col-md-6"}>
            <TodoForm/>
          </div>
        </div>
      </div>
    </>
  );
};

Page.defaultProps = {
};

export default Page;
