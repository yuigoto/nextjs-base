import { useRouter } from "next/router";
import { BlogListItem } from "core/types/blog";
import { getMarkdownIndex } from "core/utils/markdown";
import { IMarkdownFile } from "core/interfaces";
import { useEffect } from "react";
import Head from "next/head";
import { renderDate } from "core/utils/datetime";

interface IPageProps {
  post: BlogListItem;
  slug: string;
}

const Page = ({ post, slug }: IPageProps) => {
  const router = useRouter();

  useEffect(() => {
    if (null === post) {
      router.push("/404").then(e => console.log(e));
    }
  });

  let file: IMarkdownFile = require(`data/blog/${post.file}.md`);

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

      <p><em>{renderDate(post.date, "long")}</em></p>

      <hr/>

      <PostBody />

      <hr/>

      <p>
        <em>
          Postado às {renderDate(post.date, "time")}
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

export const getStaticPaths = async (context) => {
  const blog: BlogListItem[] = getMarkdownIndex("blog");

  const paths = [];
  for (let post of blog) {
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

export const getStaticProps = async ({ params }) => {
  const { slug } = (params || {});

  const blog: Array<BlogListItem> = getMarkdownIndex("blog");
  const post: BlogListItem = blog.find((item) => item.slug === slug);

  return {
    props: {
      slug,
      post: post || null,
    }
  };
};

export default Page;
