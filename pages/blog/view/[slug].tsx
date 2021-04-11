import { GetStaticPaths, GetStaticProps } from "next";
import { BlogListItem } from "core/types/blog";
import { getMarkdownIndex } from "core/utils/markdown";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { IMarkdownFile } from "core/interfaces";
import { DateTime } from "components/atoms/basic/DateTime";

/**
 * pages/blog/view/[slug]
 * ----------------------------------------------------------------------
 */

/**
 * Para builds estáticos, retorna variáveis para todas as páginas possíveis
 * dentro desta view.
 *
 * @param context
 */
export const getStaticPaths: GetStaticPaths = async (context) => {
  const blog: BlogListItem[] = getMarkdownIndex("blog");

  const paths = [];
  for (const post of blog) {
    // No caso, retornamos todos os possíveis valores para `[id]`
    paths.push({
      params: {
        slug: post.slug
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
  const { slug } = params;

  return {
    props: {
      slug
    }
  };
};

/**
 * Interface de props da página.
 */
interface IPageProps {
  slug: string;
}

const Page = ({
  slug
}: IPageProps) => {
  const router = useRouter();
  const blog: Array<BlogListItem> = getMarkdownIndex("blog");
  const post: BlogListItem = blog.find((item) => item.slug === slug);
  let file: IMarkdownFile = require(`data/blog/${post.file}.md`);

  useEffect(() => {
    if (!file) {
      router.push("/404").then(e => console.log(e));
    }
  }, []);

  if (!file) return null;

  const {
    react: PostBody
  } = file;

  const tags = post.tags.map((item, key) => {
    return (
      <>
        {key > 0 && (<span key={"key-" + key}>, </span>)}
        <span key={key}>{item}</span>
      </>
    );
  });

  return (
    <>
      <Head>
        <title>NextJS Base : Blog</title>
      </Head>

      <h2 className={"display-4 text-muted"}>Blog</h2>

      <p>
        <a href={"#"} onClick={() => router.back()}>
          &lt;&lt; Voltar
        </a>
      </p>

      <h2>{post.title}</h2>

      <p className={"lead"}>{post.excerpt}</p>

      <p><em><DateTime date={post.date} format={"long"}/></em></p>

      <hr/>

      <PostBody/>

      <hr/>

      <p>
        <em>
          Postado às <DateTime date={post.date} format={"time"}/>
        </em>
      </p>

      <p>
        <em>
          <strong>Tags</strong>: {tags}
        </em>
      </p>
    </>
  );
};

export default Page;
