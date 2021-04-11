import Head from "next/head";
import { Pagination } from "components/elements/Pagination";
import { GetStaticProps } from "next";
import axios from "axios";
import { useEffect, useState } from "react";
import { UserListItem } from "core/types/users";
import { UserItem } from "components/users/UserItem";
import { getUsersPage } from "pages/api/users";

/**
 * pages/users/
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

export const getStaticProps: GetStaticProps = async (context) => {
  const request = await getUsersPage(1);
  const [ users, count ] = request;

  return {
    props: {
      page: 1,
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
