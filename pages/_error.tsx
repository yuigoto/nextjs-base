import Head from "next/head";
import { Component } from "react";
import { withRouter } from "next/router";
import { NextPageContext } from "next";
import { HashMap, NextRouterProps } from "core/types";
import Link from "next/link";

/**
 * Define props aceitas pelo componente.
 */
interface IPageProps extends NextRouterProps {
  statusCode: number
}

/**
 * Define chaves permitidas no state do componente.
 */
interface IPageState extends HashMap<any> {}

/**
 * Usado para definir os dados passados pelo contexto.
 */
interface IPageContext extends NextPageContext {}

/**
 * pages/_error
 * ----------------------------------------------------------------------
 * Página de erro genérica, deve ser usada em conjunto com `404.tsx`.
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
    router: null,
    statusCode: 500
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
      res,
      err
    } = ctx;
    
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
    this.mounted = true;
  }
  
  componentWillUnmount () {
    this.mounted = false;
  }
  
  // MÉTODOS
  // --------------------------------------------------------------------
  
  /**
   * Renderiza mensagem de erro.
   */
  renderErrorMessage = (): string => {
    return (this.props.statusCode) 
      ? `Um erro ${this.props.statusCode} ocorreu.` 
      : `Erro inesperado.`;
  };
  
  // --------------------------------------------------------------------
  
  render () {
    const statusCode: string = `${this.props.statusCode}`;
    
    return (
      <>
        <Head>
          <title>{statusCode}</title>
        </Head>
        
        <h2>Erro</h2>
        
        <p className={"breadcrumb"}>
          <Link href={"/"}>
          &lt;&lt; Voltar
          </Link>
        </p>
        
        <p>{this.renderErrorMessage()}</p>
      </>
    );
  }
}

export default withRouter(Page);
