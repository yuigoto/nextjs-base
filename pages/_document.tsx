import { RenderPage } from "next/dist/next-server/lib/utils";
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext
} from "next/document";
import { ServerStyleSheet } from "styled-components";

/**
 * pages/_document
 * ----------------------------------------------------------------------
 * Permite acrescentar funcionalidades e operar nas tags `body` e `html`.
 * 
 * @since 0.1.0
 */
export default class extends Document {
  /**
   * Usado para pré-carregar dados e realizar operações durante SSR.
   * 
   * @param ctx 
   */
  static async getInitialProps (ctx: DocumentContext ): Promise<any> {
    const sheet: ServerStyleSheet = new ServerStyleSheet();
    const originalRenderPage: RenderPage = ctx.renderPage;
    
    try {
      ctx.renderPage = () => {
        return originalRenderPage({
          enhanceApp: (App) => (props) => {
            return sheet.collectStyles(<App {...props}/>); 
          }
        });
      };
      
      const initialProps = await Document.getInitialProps(ctx);
      
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        )
      };
    } catch {
      if (process.env.NODE_ENV) {
        console.error("Não foi possível gerar folhas de estilo.");
      }
    } finally {
      sheet.seal();
    }
  }

  // LIFECYCLE
  // --------------------------------------------------------------------
  
  render () {
    return (
      <>
        <Html>
          <Head/>
          <body>
            <div id={"root"}>
              <Main/>
            </div>
            <NextScript/>
          </body>
        </Html>
      </>
    );
  }
}
