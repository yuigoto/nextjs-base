import Head from "next/head";
import { Component } from "react";
import { withRouter } from "next/router";
import { NextPageContext } from "next";
import { HashMap, NextRouterProps } from "core/types";

/**
 * Define props aceitas pelo componente.
 */
interface IPageProps extends NextRouterProps {}

/**
 * Define chaves permitidas no state do componente.
 */
interface IPageState extends HashMap<any> {}

/**
 * Usado para definir os dados passados pelo contexto.
 */
interface IPageContext extends NextPageContext {}

/**
 * pages/users/user
 * ----------------------------------------------------------------------
 * Redirect.
 * 
 * @since 0.2.0
 */
class Page extends Component<IPageProps, IPageState, IPageContext> {
  // PROPRIEDADES ESTÁTICAS
  // --------------------------------------------------------------------
  
  /**
   * Valores padrão para props.
   */
  static defaultProps: IPageProps = {
    router: null
  };
  
  // MÉTODOS ESTÁTICOS
  // --------------------------------------------------------------------
  
  /**
   * Usado para pré-carregar dados durante SSR. Também é usado no export para 
   * pré-hidratar as páginas.
   * 
   * @param ctx 
   */
  static async getInitialProps (ctx: IPageContext): Promise<any> {
    const {
      res
    } = ctx;

    // Não é possível acessar sem userId, então só redirecionamos
    if (res && res.writeHead) {
      res.writeHead(
        301,
        {
          Location: "/users"
        }
      );
      res.end();
    }

    return {};
  }
  
  // PROPRIEDADES
  // --------------------------------------------------------------------
  
  /**
   * Estado da página.
   */
  state: Readonly<IPageState> = {};

  /**
   * Status de montagem.
   *
   * Em alguns casos é necessário para mim, mas sinta-se livre para excluir.
   */
  mounted: boolean = false;
  
  // LIFECYCLE
  // --------------------------------------------------------------------
  
  constructor (props) {
    super(props);
    this.state = {};
  }
  
  componentDidMount () {
    console.log(`[${Page.name}] montado.`);
    this.mounted = true;
    
    this.props.router.push("/users");
  }
  
  componentWillUnmount () {
    console.log(`[${Page.name}] desmontado.`);
    this.mounted = false;
  }
  
  render () {
    return (
      <>
        <Head>
          <title>NextJS Boilerplate - Blog</title>
          <link rel={"favicon"} href={"/favicon.ico"}/>
        </Head>
      </>
    );
  }
}

export default withRouter(Page);
