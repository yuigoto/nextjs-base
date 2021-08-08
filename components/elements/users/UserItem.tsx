import { User } from "core/types/user";
import Styles from "components/elements/users/UserItem.module.scss";

interface IUserItem {
  post: User;
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
