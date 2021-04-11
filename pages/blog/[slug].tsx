import Head from "next/head";
import { Component } from "react";
import { withRouter } from "next/router";
import { NextPageContext } from "next";
import { HashMap, NextRouterProps } from "core/types";
import Link from "next/link";
import { IMarkdownFile } from "core/interfaces";
import { GetPost } from "services/MdBlogService";

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
 * pages/blog/[slug]
 * ----------------------------------------------------------------------
 * Single page para post de blog.
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
    
    if (query.slug) {
      pageProps.slug = query.slug;
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
      slug: props.slug || null
    };
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
    const {
      slug
    } = this.state;
    
    if (!slug) return null;
    
    try {
      const load: IMarkdownFile = GetPost("blog", slug);
      
      if (!load) {
        throw new Error("Post não encontrado.");
      }
      
      const {
        attributes
      } = load;
      
      return (
        <>
          <Head>
            <title>NextJS Boilerplate - {attributes.title}</title>
            <link rel={"favicon"} href={"/favicon.ico"}/>
          </Head>
          
          <h2>{attributes.title}</h2>
          
          <p className={"breadcrumb"}>
            <a href={"#"} onClick={this.moveBack}>
              &lt;&lt; Voltar
            </a>
          </p>
          
          <load.react/>
        </>
      );
    } catch (err) {
      const {
        message
      } = err;
      
      return (
        <>
          <Head>
            <title>NextJS Boilerplate</title>
            <link rel={"favicon"} href={"/favicon.ico"}/>
          </Head>
          
          <h2>Ops!</h2>

          <p className={"breadcrumb"}>
            <Link href={"/"}>
              <a onClick={() => this.moveBack}>
                &lt;&lt; Voltar
              </a>
            </Link>
          </p>
          
          <p>{message || "Erro inesperado."}</p>
        </>
      );
    }
  }
}

export default withRouter(Page);
