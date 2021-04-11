// import App from "next/app";
import { AppProps /*, AppContext */ } from "next/app";
import "styles/global.scss";
import { StoreWrapper } from "state";
import { Layout } from "components/base/Layout";
import { TodoProvider } from "core/context/todo";

/**
 * pages/_app
 * ----------------------------------------------------------------------
 * Página mestre da aplicação.
 *
 * CSS global deve ser carregado através desta.
 *
 * @param Component
 *     Componente raiz a ser renderizado
 * @param pageProps
 *     Props do componente
 */
const Page = ({ Component, pageProps }: AppProps) => {
  return (
    <TodoProvider>
      <Layout>
        <Component {...pageProps}/>
      </Layout>
    </TodoProvider>
  );
};

// Descomente abaixo apenas se necessário.
// /**
//  * Caso o website tenha requisitos de dados em comum para todas as páginas na
//  * aplicação, use esta função.
//  *
//  * Isso desabilita, porém, a otimização estática em escala global.
//  *
//  * @param appContext
//  *     Objeto contendo dados de contexto da aplicação
//  */
// Page.getInitialProps = async (appContext: AppContext) => {
//   // Executa o getInitialProps de cada página e preenche `app.pageProps`.
//   const appProps = await App.getInitialProps(appContext);
//   return { ...appProps };
// };

export default StoreWrapper.withRedux(Page);
