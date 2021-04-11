import Head from "next/head";
import { Component } from "react";
import { withRouter } from "next/router";
import { NextPageContext } from "next";
import { HashMap, NextRouterProps } from "core/types";
import { GetUser } from "services/UserService";
import Link from "next/link";

/**
 * Define props aceitas pelo componente.
 */
interface IPageProps extends NextRouterProps {
  userId: number,
  user: any
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
 * pages/users/user/[userId]
 * ----------------------------------------------------------------------
 * Exemplo de perfil de usuário.
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
    router: null,
    userId: 0,
    user: null
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
    
    const {
      userId, 
      user
    } = ctx.query;
    
    pageProps.userId = userId;
    
    // Verifica se pré-carregou, caso contrário carrega
    if (user) {
      pageProps.user = user;
    } else if (userId) {
      let data = await GetUser(userId as string);
      if (data !== false) {
        pageProps.user = data;
      }
    }
    
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
  
  moveBack = () => {
    this.props.router.back();
  };
  
  render () {
    if (!this.props.user) return null;
    
    return (
      <>
        <Head>
          <title>NextJS Boilerplate</title>
          <link rel={"favicon"} href={"/favicon.ico"}/>
        </Head>

        <h2>{this.props.user.first_name}</h2>

        <p className={"breadcrumb"}>
          <a href={"#"} onClick={this.moveBack}>
            &lt;&lt; Voltar
          </a>
        </p>

        <figure style={{marginBottom: "1rem"}}>
          <img src={this.props.user.avatar} alt={""}/>
        </figure>

        <ul>
          <li>
            <strong>Full Name</strong>: {this.props.user.first_name} {this.props.user.last_name}
          </li>
          <li>
            <strong>E-mail</strong>: {this.props.user.email}
          </li>
        </ul>
      </>
    );
  }
}

export default withRouter(Page);
