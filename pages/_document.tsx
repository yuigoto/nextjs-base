import Document, { DocumentContext, Html, Head, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";
import { AppType, RenderPage } from "next/dist/next-server/lib/utils";

/**
 * pages/_document
 * ----------------------------------------------------------------------
 * Raiz do documento do website, fica acima de `_app` na hierarquia.
 */
export default class extends Document {
  // MÉTODOS ESTÁTICOS
  // --------------------------------------------------------------------

  /**
   * Solicita props iniciais, server-side, do documento.
   *
   * `_document` não é compatível com `getStaticProps`, por isso usamos
   * isso ainda.
   *
   * @param ctx
   *     Objeto contento valores relativos ao contexto
   */
  static async getInitialProps (ctx: DocumentContext): Promise<any> {
    // Garantindo a renderização de stylesheets, se usarmos styled components
    const sheet: ServerStyleSheet = new ServerStyleSheet();
    const originalRenderPage: RenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () => {
        return originalRenderPage({
          enhanceApp: (App: AppType) => (props) => {
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
    } finally {
      sheet.seal();
    }
  }

  render () {
    return (
      <Html>
        <Head/>
        <body>
        <div id={"root"}>
          <Main />
        </div>
        <NextScript/>
        </body>
      </Html>
    );
  }
}
