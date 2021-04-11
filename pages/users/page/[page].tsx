import Head from "next/head";
import { Pagination } from "components/elements/Pagination";
import { GetStaticPaths, GetStaticProps } from "next";
import axios from "axios";
import { useEffect, useState } from "react";
import { UserListItem } from "core/types/users";
import { UserItem } from "components/users/UserItem";
import { getUsersPage } from "pages/api/users";

/**
 * pages/users/page/[page]
 * ----------------------------------------------------------------------
 */

/**
 * Quantos posts por página devem ser exibidos.
 */
const PER_PAGE: number = 3;

const getPosts = async (page) => {
  const request = await axios
    .get(`/api/users?page=${page}`);

  return request.data;
};

/**
 * Para builds estáticos, retorna variáveis para todas as páginas possíveis
 * dentro desta view.
 *
 * @param context
 */
export const getStaticPaths: GetStaticPaths = async (context) => {
  const request = await getUsersPage(1);
  const [ users, count ] = request;

  const paths = [];
  for (let n = 0; n < count; n++) {
    // No caso, retornamos todos os possíveis valores para `[id]`
    paths.push({
      params: {
        page: `${n + 1}`
      }
    });
  }

  return {
    paths,
    fallback: false
  };
};

/**
 * Para builds estáticos, consome as variáveis retornadas por `getStaticPaths`
 * e as converte em props.
 *
 * @param context
 */
export const getStaticProps: GetStaticProps = async (context) => {
  const { page } = context.params;
  const request = await getUsersPage(page);
  const [ users, count ] = request;

  return {
    props: {
      page: page,
      users: users.map((item) => {
        return JSON.parse(JSON.stringify(item));
      }),
      totalResults: count
    }
  };
};

/**
 * Interface de props da página.
 */
interface IPageProps {
  page?: number;
  users?: UserListItem[];
  totalResults?: number;
}

const Page = ({
  page,
  users,
  totalResults
}: IPageProps) => {
  const [ postData, setPostData ] = useState(users);
  const [ totalPages, setTotalPages ] = useState(
    Math.ceil(totalResults / PER_PAGE)
  );

  useEffect(() => {
    getPosts(page)
      .then(e => {
        setPostData(e.users);
        setTotalPages(Math.ceil(e.totalResults / PER_PAGE));
      });
  }, [ page ]);

  return (
    <>
      <Head>
        <title>NextJS Base : Usuários : Página {page}</title>
      </Head>

      <h2 className={"display-4 text-muted"}>Usuários</h2>

      <hr/>

      {postData.map((item, key) => {
        return (
          <>
            {key > 0 && (
              <hr key={`hr-${key}`}/>
            )}
            <UserItem post={item} key={key}/>
          </>
        );
      })}

      <Pagination
        firstPagePath={"/users"}
        totalPages={totalPages}
        page={page}
        path={"/users/page"}
        numeric={true}/>
    </>
  );
};

Page.defaultProps = {
  page: 1
};

export default Page;
