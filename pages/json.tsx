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
 * pages/json
 * ----------------------------------------------------------------------
 * Rota de exemplo, acessível apenas via URL direta, para renderização de 
 * JSON, XML ou outras coisas, fora do escopo de endpoints de API.
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
   * Usado para pré-carregar dados durante SSR.
   * 
   * @param ctx 
   */
  static async getInitialProps (ctx: IPageContext): Promise<any> {
    const { res } = ctx;
    
    if (res && res.write && res.writeHead && res.end) {
      res.writeHead(
        200,
        {
          "Content-Type": "application/json; charset=utf-8"
        }
      );
      res.write(
        JSON.stringify({
          description: "Oi, essa rota só é acessível via URL, não pode, nem deve, ser acessada pelo router do NextJS, pois pode dar pau!", 
          message: "Hello, World!", 
          date: Date.now()
        })
      );
      res.end();
    }
    
    return {};
  }
  
  // LIFECYCLE
  // --------------------------------------------------------------------
  
  constructor (props) {
    super(props);
  }
  
  componentDidMount () {
    this.props.router.push("/");
  }
  
  render () {
    return null;
  }
}

export default withRouter(Page);
