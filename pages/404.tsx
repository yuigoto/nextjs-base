import Head from "next/head";
import { Component } from "react";
import { withRouter } from "next/router";
import { NextPageContext } from "next";
import { HashMap, NextRouterProps } from "core/types";
import Link from "next/link";

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
 * pages/404
 * ----------------------------------------------------------------------
 * Página de erro 404, no extra words.
 * 
 * @since 0.3.0
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
  
  render () {
    return (
      <>
        <Head>
          <title>Ops! 404</title>
        </Head>
        
        <h2>404</h2>
        
        <p className={"breadcrumb"}>
          <Link href={"/"}>
            &lt;&lt; Voltar
          </Link>
        </p>
        
        <p>O conteúdo que você procura não foi encontrado, tem certeza de que acessou o link correto?</p>
      </>
    );
  }
}

export default withRouter(Page);
