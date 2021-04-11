import { BlogListItem } from "core/types/blog";
import Styles from "styles/elements/Blog.module.scss";
import { DateTime } from "components/atoms/basic/DateTime";
import { Anchor } from "components/atoms/elements/Anchor";

interface IBlogItem {
  post: BlogListItem;
}

export const BlogItem = ({
  post
}: IBlogItem) => {
  return (
    <div className={Styles["item"]}>
      <h3>{post.title}</h3>
      <p>{post.excerpt}</p>
      <p className={Styles["date"]}>
        <DateTime date={post.date} format={"long"}/>
      </p>

      <p className={"text-right"}>
        <Anchor href={`/blog/view/${post.slug}`}>
          Ler
        </Anchor>
      </p>
    </div>
  );
};
