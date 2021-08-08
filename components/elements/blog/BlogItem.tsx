import { BlogListItem } from "core/types/blog";
import { renderDate } from "core/utils/datetime";
import { Anchor } from "components/elements/link/Anchor";

import Styles from "components/elements/blog/BlogItem.module.scss";

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
        {renderDate(post.date, "long")}
      </p>

      <p className={"text-right"}>
        <Anchor href={`/blog/view/${post.slug}`}>
          Ler
        </Anchor>
      </p>
    </div>
  );
};
