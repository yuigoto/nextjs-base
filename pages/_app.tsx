import App, { AppContext, AppProps } from "next/app";
import { withRouter } from "next/router";
import { StoreWrapper } from "state";
import "scss/main.scss";
import { Layout } from "components/base/Layout";

/**
 * pages/_app
 * ----------------------------------------------------------------------
 * Componente raíz.
 * 
 * @since 0.0.1
 */
class MainApp extends App<AppProps> {
  // MÉTODOS ESTÁTICOS
  // --------------------------------------------------------------------
  
  /**
   * Usado para pré-carregar dados durante SSR. Também é usado no export para 
   * pré-hidratar as páginas.
   * 
   * @param ctx 
   */
  static async getInitialProps ({ Component, ctx }: AppContext) {
    return {
      pageProps: (Component.getInitialProps) 
        ? await Component.getInitialProps(ctx) 
        : {}
    };
  }
  
  // LIFECYCLE
  // --------------------------------------------------------------------
  
  constructor (props: AppProps) {
    super(props);
  }
  
  render () {
    const {
      Component,
      pageProps
    } = this.props;
    
    return (
      <Layout
        className={"site"}
        mainClassName={"main"}
        headerClassName={"header"}
        footerClassName={"footer"}>  
        <Component {...pageProps}/>
      </Layout>
    );
  }
}

export default StoreWrapper.withRedux(withRouter(MainApp));
