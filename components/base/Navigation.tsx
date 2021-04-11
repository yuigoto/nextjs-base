import { Anchor } from "components/atoms/elements/Anchor";
import { useRouter } from "next/router";

import Styles from "styles/elements/Navigation.module.scss";

const routes = [
  {
    name: "Home",
    path: "/"
  },
  {
    name: "Átomos",
    path: "/atoms"
  },
  {
    name: "Moléculas",
    path: "/molecules"
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
    name: "Blog",
    path: "/blog"
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
