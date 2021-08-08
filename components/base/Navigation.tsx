import { useRouter } from "next/router";
import { Anchor } from "components/elements/link/Anchor";

import Styles from "components/base/Navigation.module.scss";

const routes = [
  {
    name: "Home",
    path: "/"
  },
  {
    name: "Elementos",
    path: "/elements"
  },
  {
    name: "Blog",
    path: "/blog"
  },
  {
    name: "Teste",
    path: "/demo"
  },
  {
    name: "Usuários",
    path: "/users"
  }
];

export const Navigation = () => {
  const router = useRouter();

  if (router.pathname === "/") {
    return null;
  }

  return (
    <nav className={Styles["navigation"]}>
      {routes.map((item, key) => {
        return (
          <Anchor href={item.path} key={key}>
            {item.name}
          </Anchor>
        );
      })}
    </nav>
  );
};
