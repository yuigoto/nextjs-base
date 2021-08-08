import Head from "next/head";
import { BlogListItem } from "core/types/blog";
import { getMarkdownIndex } from "core/utils/markdown";
import { BlogItem } from "components/elements/blog/BlogItem";
import { Pagination } from "components/widgets/pagination/Pagination";

const PER_PAGE: number = 5;

interface IPageProps {
  page?: number;
  pageData?: Array<any>;
  totalPages?: number;
}

const Page = ({ page, pageData, totalPages }: IPageProps) => {
  const posts = pageData.map((item, key) => {
    return (
      <BlogItem post={item} key={key}/>
    );
  });

  return (
    <>
      <Head>
        <title>NextJS Base : Blog</title>
      </Head>

      <h2 className={"display-4 text-muted"}>Blog</h2>

      <hr/>

      {posts.length > 0 && (
        <div>
          {posts}
          <Pagination
            totalPages={totalPages}
            page={page}
            path={"blog/page"}
            firstPagePath={"/blog"}
            numeric={true} />
        </div>
      )}

      {posts.length < 1 && (
        <p>Nenhum post encontrado.</p>
      )}
    </>
  );
};

Page.defaultProps = {
  page: 1
};

export const getStaticPaths = async (context) => {
  const blog: BlogListItem[] = getMarkdownIndex("blog");
  const pages = Math.ceil(blog.length / PER_PAGE);

  const paths = [];
  for (let n = 0; n < pages; n++) {
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

export const getStaticProps = async ({ params }) => {
  const { page } = (params || {});

  const blogList: BlogListItem[] = getMarkdownIndex("blog");
  blogList.sort((a, b) => {
    return a.date < b.date ? 1 : -1;
  });
  const totalPages = Math.ceil(blogList.length / PER_PAGE);
  const offset = ((parseInt(page) || 1) - 1) * PER_PAGE;
  const limit = offset + PER_PAGE;
  const pageData = blogList.slice(offset, limit);

  return {
    props: {
      pageData,
      page: parseInt(page) || 1,
      totalPages,
    }
  };
};

export default Page;
