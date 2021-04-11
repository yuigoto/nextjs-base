import { IBaseProps } from "core/interfaces";
import { HashMap } from "core/types";
import { classnames } from "core/utils";
import Link from "next/link";
import { FunctionComponent } from "react";

type HomeLinkItem = {
  name: string,
  href: string,
  target?: string,
  external?: boolean
};

const HomeLink: HomeLinkItem[] = [
  {
    name: "Página Demo",
    href: "/demo"
  },
  {
    name: "Link Inexistente (404)",
    href: "/nao-existe"
  },
  {
    name: "Blog (Markdown)",
    href: "/blog"
  },
  {
    name: "Lista de Usuários (Paginação)",
    href: "/users"
  },
  {
    name: "Perfil de Usuário sem ID (Redireciona `/users`)",
    href: "/users/user"
  },
  {
    name: "Página com JSON (não pode ser acessado via Router/Next)",
    href: "/json"
  },
  {
    name: "Página com JSON (acesso correto)",
    href: "/json",
    target: "_blank"
  },
  {
    name: "Endpoint de API",
    href: "/api",
    target: "_blank"
  },
  {
    name: "NavLink com URL externa",
    href: "https://example.org/",
    external: true
  }
];

export const HomeNavi: FunctionComponent<IBaseProps> = ({
  id,
  className,
  style
}) => {
  let _attr: HashMap<any> = {};
  if (id) _attr.id = id;
  if (className) _attr.className = classnames(className);
  if (style) _attr.style = style;
  
  const renderLinkList = () => {
    return HomeLink.map((item, key) => {
      if (item.external || item.target) {
        let _param: HashMap<any> = {};
        if (item.external) {
          _param.target = "_blank";
        } else {
          _param.target = item.target || "_blank";
        }
        
        return (
          <li key={key}>
            <Link href={item.href}>
              <a {..._param}>
                {item.name}
              </a>
            </Link>
          </li>
        );
      }
      
      return (
        <li key={key}>
          <Link href={item.href}>
            {item.name}
          </Link>
        </li>
      );
    });
  };
  
  return (
    <ul {..._attr}>
      {renderLinkList()}
    </ul>
  );
};
