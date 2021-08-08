// import App from "next/app";
import { AppProps /*, AppContext */ } from "next/app";
import { TodoProvider } from "core/context/todo";
import { StoreWrapper } from "state";
import "styles/main.scss";
import { Layout } from "components/base/Layout";

const Page = ({ Component, pageProps }: AppProps) => {
  return (
    <TodoProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </TodoProvider>
  );
};

// Descomente abaixo apenas se necessário.
// /**
//  * Fornece dados em comum para todas as páginas na aplicação.
//  *
//  * Desabilita a otimização estática.
//  *
//  * @param appContext
//  */
// Page.getInitialProps = async (appContext: AppContext) => {
//   const appProps = await App.getInitialProps(appContext);
//   return { ...appProps };
// };

export default StoreWrapper.withRedux(Page);
