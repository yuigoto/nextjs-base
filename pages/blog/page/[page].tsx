import Head from "next/head";
import { Component } from "react";
import { withRouter } from "next/router";
import { NextPageContext } from "next";
import Link from "next/link";

import { HashMap, NextRouterProps } from "core/types";
import { GetPage } from "services/MdBlogService";
import { IMarkdownFile } from "core/interfaces";
import { Paginate } from "components/elements/Paginate";

/**
 * Define props aceitas pelo componente.
 */
interface IPageProps extends NextRouterProps {
  posts?: any[];
  page?: number;
  totalPages?: number;
}

/**
 * Define chaves permitidas no state do componente.
 */
interface IPageState extends HashMap<any> {
  posts?: any[];
  page?: number;
  totalPages?: number;
}

/**
 * Usado para definir os dados passados pelo contexto.
 */
interface IPageContext extends NextPageContext {}

/**
 * pages/blog/page/[page]
 * ----------------------------------------------------------------------
 * Página do blog.
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
      query
    } = ctx;
    
    let pageProps: any = {};
    
    pageProps.page = query.page || 1;
    if (query.posts && query.posts.length > 0) {
      pageProps.posts = query.posts || [];
      pageProps.totalPages = query.totalPages || 0;
    } else {
      let fetch = GetPage("blog", pageProps.page);
      pageProps.posts = fetch.posts;
      pageProps.totalPages = fetch.totalPages;
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
    
    this.state = {
      page: props.page,
      posts: props.posts,
      totalPages: props.totalPages
    };
  }
  
  componentDidMount () {
    console.log(`[${Page.name}] montado.`);
    this.mounted = true;
  }
  
  componentDidUpdate (prevProps) {
    if (this.props.page !== prevProps.page) {
      this.setState(
        Object.assign({}, GetPage("blog", this.props.page))
      );
    }
  }
  
  componentWillUnmount () {
    console.log(`[${Page.name}] desmontado.`);
    this.mounted = false;
  }
  
  renderPosts = () => {
    const {
      posts
    } = this.state;
    
    return posts.map((item, key) => {
      const load: IMarkdownFile = require(`data/blog/${item}.md`);
      const {
        attributes
      } = load;
      
      let date = new Date(attributes.date);
      
      return (
        <div key={key} className={"blog-item"}>
          <time dateTime={attributes.date}>
            {date.toLocaleDateString()}
          </time>
          <h3>
            <Link 
              href={`/blog/${item}`}>
              {attributes.title}
            </Link>
          </h3>
        </div>
      );
    });
  };
  
  render () {
    return (
      <>
        <Head>
          <title>NextJS Boilerplate - Blog</title>
          <link rel={"favicon"} href={"/favicon.ico"}/>
        </Head>

        <h2>Blog</h2>

        <p className={"breadcrumb"}>
          <Link href={"/"}>
            &lt;&lt; Voltar
          </Link>
        </p>
        
        {this.renderPosts()}
        
        <Paginate
          className={"paginate"}
          path={`/blog/page`}
          page={this.state.page}
          totalPages={this.state.totalPages}/>
      </>
    );
  }
}

export default withRouter(Page);
