import Styles from "styles/elements/Blog.module.scss";
import { UserListItem } from "core/types/users";

interface IUserItem {
  post: UserListItem;
}

export const UserItem = ({
  post
}: IUserItem) => {
  return (
    <div className={Styles["item"]}>
      <h3>{post.id} - {post.name}</h3>
      <p>{post.email}</p>
      <p className={Styles["date"]}>
        {post.website}
      </p>
    </div>
  );
};
