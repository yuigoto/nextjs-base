import { NextPageContext } from "next";
import { BaseProps } from "core/types";

/**
 * pages/_error
 * ----------------------------------------------------------------------
 * Página de erro global, fallback para `404.tsx`.
 */

/**
 * Interface para página de erro.
 */
interface IErrorPage extends BaseProps {
  statusCode: number|string;
}

/**
 * Página de erro.
 *
 * @param statusCode
 *     Código de status de erro.
 */
const ErrorPage = ({ statusCode }: IErrorPage) => {
  return (
    <p>
      {
        statusCode
          ? `Erro: ${statusCode}`
          : `Erro: desconhecido`
      }
    </p>
  );
};

/**
 * Puxa dados iniciais da página. Necessário, pois não é compatível com
 * `getStaticProps`.
 *
 * @param res
 *     Resposta do servidor
 * @param err
 *     Objeto de erro
 */
ErrorPage.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res
    ? res.statusCode
    : err ? err.statusCode : 404;

  return {
    statusCode
  };
};

export default ErrorPage;
