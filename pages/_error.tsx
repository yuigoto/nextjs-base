import { BaseProps } from "core/types";
import { NextPageContext } from "next";

interface IErrorPage extends BaseProps {
  statusCode: number|string;
}

const ErrorPage = ({ statusCode, ...props }: IErrorPage) => {
  return (
    <>
      <h1>{statusCode}</h1>
    </>
  );
};

ErrorPage.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res
    ? res.statusCode
    : (err ? err.statusCode : 404);

  return {
    statusCode
  };
};

export default ErrorPage;
