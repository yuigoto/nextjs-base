import Head from "next/head";
import { Component } from "react";
import { withRouter } from "next/router";
import { NextPageContext } from "next";
import { HashMap, NextRouterProps } from "core/types";
import { GetUserPage } from "services/UserService";
import Link from "next/link";
import { Paginate } from "components/elements/Paginate";

/**
 * Define props aceitas pelo componente.
 */
interface IPageProps extends NextRouterProps {
  pageId?: string|number;
  totalPages?: string|number;
  users?: any[];
}

/**
 * Define chaves permitidas no state do componente.
 */
interface IPageState extends HashMap<any> {
  pageId?: string|number;
  totalPages?: string|number;
  users?: any[];
}

/**
 * Usado para definir os dados passados pelo contexto.
 */
interface IPageContext extends NextPageContext {}

/**
 * pages/users
 * ----------------------------------------------------------------------
 * Listagem de usuários com requeste de API.
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
    let pageProps: any = {};
    
    const {
      pageId, 
      totalPages,
      users
    } = ctx.query;
    
    pageProps.pageId = pageId;
    
    // Verifica se pré-carregou, caso contrário carrega
    if (totalPages && users) {
      pageProps.totalPages = totalPages;
      pageProps.users = users;
    } else {
      let data = await GetUserPage(pageId as string);
      pageProps = Object.assign({}, pageProps, data);
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
  
  renderPosts = () => {
    return this.props.users.map((item, key) => {
      return (
        <div key={key} className={"list-profile"}>
          <figure>
            <img src={item.avatar} alt={""}/>
          </figure>
          <div>
            <h3>{item.first_name}</h3>

            <Link href={`/users/user/${item.id}`}>
              Ver Perfil &gt;&gt;
            </Link>
          </div>
        </div>
      );
    });
  };
  
  render () {
    return (
      <>
        <Head>
          <title>NextJS Boilerplate</title>
          <link rel={"favicon"} href={"/favicon.ico"}/>
        </Head>

        <h2>Usuários</h2>

        <p className={"breadcrumb"}>
          <Link href={"/"}>
            &lt;&lt; Voltar
          </Link>
        </p>

        {this.renderPosts()}

        <Paginate
          className={"paginate"}
          path={`/users`}
          page={this.props.pageId}
          totalPages={this.props.totalPages}/>
      </>
    );
  }
}

export default withRouter(Page);
