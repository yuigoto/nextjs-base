import { useRouter } from "next/router";
import Head from "next/head";
import { Anchor } from "components/elements/link/Anchor";

const Page = () => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>NextJS Base : 404</title>
      </Head>

      <h2 className={"display-4 text-muted"}>404</h2>

      <p>
        <Anchor href={"/"}>&lt;&lt; Home</Anchor>
      </p>

      <p>
        <strong>Você acessou</strong>: <code>{router.asPath}</code>
      </p>
    </>
  );
};

export default Page;
