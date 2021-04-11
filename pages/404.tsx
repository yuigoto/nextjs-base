import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";

/**
 * pages/404
 * ----------------------------------------------------------------------
 * Página de erro 404 padrão.
 */
const NotFoundPage = () => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>NextJS Base : 404</title>
      </Head>

      <h2 className={"display-4 text-muted"}>404</h2>

      <p>
        <Link href={"/"}>&lt;&lt; Home</Link>
      </p>

      <p><strong>Você acessou</strong>: <code>{router.asPath}</code></p>
    </>
  );
};

export default NotFoundPage;
