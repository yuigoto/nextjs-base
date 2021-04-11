import Head from "next/head";
import { Component } from "react";
import { withRouter } from "next/router";
import { NextPageContext } from "next";
import { HashMap, NextRouterProps } from "core/types";
import { Paginate } from "components/elements/Paginate";
import { HomeNavi } from "components/home/HomeNavi";

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
 * pages/index
 * ----------------------------------------------------------------------
 * Raíz da aplicação.
 * 
 * @since 0.1.0
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
    let pageProps: any = {};
    pageProps.test = false;
    return pageProps;
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
  }
  
  componentWillUnmount () {
    console.log(`[${Page.name}] desmontado.`);
    this.mounted = false;
  }
  
  render () {
    return (
      <>
        <Head>
          <title>NextJS Boilerplate</title>
          <link rel={"favicon"} href={"/favicon.ico"}/>
        </Head>

        <h2>Home</h2>

        <p>Boilerplate para projetos usando NextJS, suporta CSR/SSR, com rotas custom para API, JSON via rotas e outras coisas. Navegue pelos links abaixo para exemplos de uso.</p>

        <p>Utilize os links abaixo para navegar pelo projeto.</p>

        <HomeNavi className={"navi"}/>
      </>
    );
  }
}

export default withRouter(Page);
