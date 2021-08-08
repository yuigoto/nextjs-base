import { useEffect, useState } from "react";
import axios from "axios";
import Head from "next/head";
import { API_ROOT } from "core/constants";
import { UserItem } from "components/elements/users/UserItem";
import { Pagination } from "components/widgets/pagination/Pagination";

const PER_PAGE: number = 3;

const getUsersFromApi = async (page) => {
  const fetch = await axios.get(`${API_ROOT}api/users?page=${page}`);
  return fetch.data;
};

interface IPageProps {
  page?: number|string;
  users?: [];
  totalResults?: number;
}

const Page = ({ page, users, totalResults }: IPageProps) => {
  const [ postData, setPostData ] = useState(users);
  const [ totalPages, setTotalPages ] = useState(
    Math.ceil(totalResults / PER_PAGE)
  );

  useEffect(() => {
    getUsersFromApi(page)
      .then(e => {
        const { totalResults, results } = e;
        setPostData(e.results);
        setTotalPages(Math.ceil(totalResults / PER_PAGE));
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
          <div key={key}>
            {key > 0 && (
              <hr key={`hr-${key}`}/>
            )}
            <UserItem post={item} key={key}/>
          </div>
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

export const getStaticProps = async ({ params }) => {
  const { page } = (params || {});

  const request = await getUsersFromApi(page || 1);

  return {
    props: {
      page: page || 1,
      users: request.results,
      totalResults: request.totalResults
    }
  };
};

export default Page;
