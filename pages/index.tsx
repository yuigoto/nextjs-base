import Head from "next/head";
import { HomeNaviContainer } from "components/base/containers";
import { Anchor } from "components/elements/link/Anchor";

const routes = [
  {
    name: "Elementos",
    path: "/elements"
  },
  {
    name: "Página Teste",
    path: "/demo"
  },
  {
    name: "Página de Erro",
    path: "/isso-e-um-erro"
  },
  {
    name: "Blog Markdown",
    path: "/blog"
  },
  {
    name: "Paginação com consumo de API",
    path: "/users"
  },
  {
    name: "Endpoint de API",
    path: "/api",
    target: "_blank"
  },
  {
    name: "NavLink com URL Externa",
    path: "//example.com",
    target: "_blank"
  }
];

interface IPageProps {}

const Page = ({}: IPageProps) => {
  return (
    <>
      <Head>
        <title>NextJS Base</title>
      </Head>

      <HomeNaviContainer>
        {routes.map((item, key) => {
          return (
            <Anchor href={item.path} key={key} target={item.target || null}>
              {item.name}
            </Anchor>
          );
        })}
      </HomeNaviContainer>
    </>
  );
};

export default Page;
