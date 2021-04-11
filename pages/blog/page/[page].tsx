import Head from "next/head";
import { getMarkdownIndex } from "core/utils/markdown";
import { BlogListItem } from "core/types/blog";
import { Pagination } from "components/elements/Pagination";
import { BlogItem } from "components/blog/BlogItem";
import { GetStaticPaths, GetStaticProps } from "next";

/**
 * pages/blog/page/[page]
 * ----------------------------------------------------------------------
 */

/**
 * Quantos posts por página devem ser exibidos.
 */
const PER_PAGE: number = 5;

/**
 * Para builds estáticos, retorna variáveis para todas as páginas possíveis
 * dentro desta view.
 *
 * @param context
 */
export const getStaticPaths: GetStaticPaths = async (context) => {
  const blog: BlogListItem[] = getMarkdownIndex("blog");
  const pages = Math.ceil(blog.length / PER_PAGE);

  const paths = [];
  for (let n = 0; n < pages; n++) {
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
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { page } = params;

  return {
    props: {
      page: parseInt(page as string)
    }
  };
};

/**
 * Interface de props da página.
 */
interface IPageProps {
  page?: number;
}

const Page = ({
  page
}: IPageProps) => {
  const blog: Array<BlogListItem> = getMarkdownIndex("blog");
  blog.sort((a, b) => {
    return a.date < b.date ? 1 : -1;
  });
  const totalPages = Math.ceil(blog.length / PER_PAGE);
  const offset = (page - 1) * PER_PAGE;
  const limit = offset + PER_PAGE;
  const pageData = blog.slice(offset, limit);

  const posts = pageData.map((item, key) => {
    return (
      <BlogItem post={item} key={key}/>
    );
  });

  return (
    <>
      <Head>
        <title>NextJS Base : Blog : Página {page}</title>
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
            numeric={true}/>
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

export default Page;
