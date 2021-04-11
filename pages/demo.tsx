import Head from "next/head";
import { Component } from "react";
import { withRouter } from "next/router";
import { NextPageContext } from "next";
import { HashMap, NextRouterProps, Responsive } from "core/types";
import { Picture } from "components/elements/Picture";
import { Counter } from "components/test/Counter";
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
 * pages/demo
 * ----------------------------------------------------------------------
 * Página de demonstração.
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
  
  render () {
    let pic: Responsive<string> = {
      default: "https://images.unsplash.com/photo-1595191497467-f31ae50927b2?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=180&ixlib=rb-1.2.1&q=80&w=320",
      sm: "https://images.unsplash.com/photo-1595191497467-f31ae50927b2?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=360&ixlib=rb-1.2.1&q=80&w=640",
      md: "https://images.unsplash.com/photo-1595191497467-f31ae50927b2?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=720&ixlib=rb-1.2.1&q=80&w=960",
      lg: "https://images.unsplash.com/photo-1595191497467-f31ae50927b2?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=720&ixlib=rb-1.2.1&q=80&w=1280",
      xl: "https://images.unsplash.com/photo-1595191497467-f31ae50927b2?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=1080&ixlib=rb-1.2.1&q=80&w=1920"
    };
    
    return (
      <>
        <Head>
          <title>NextJS Boilerplate</title>
          <link rel={"favicon"} href={"/favicon.ico"}/>
        </Head>

        <h2>Página de Demonstração</h2>

        <p className={"breadcrumb"}>
          <Link href={"/"}>
            &lt;&lt; Voltar
          </Link>
        </p>

        <p>Esta é uma página de demonstração.</p>

        <Counter/>

        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium, architecto atque dolor eveniet facere iure nesciunt numquam, odio optio quia quis quos repellat, sint unde voluptates. Assumenda enim est ex.</p>

        <Picture
          style={{width: "100%"}}
          imageStyle={{width: "100%"}}
          image={pic}/>

        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum eum in magni molestias necessitatibus quia reiciendis similique voluptatibus? Adipisci assumenda consequuntur, debitis dolorem in ipsum obcaecati provident sit voluptatibus? Quae?</p>
      </>
    );
  }
}

export default withRouter(Page);
