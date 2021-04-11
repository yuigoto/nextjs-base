import { IBaseProps } from "core/interfaces";
import { HashMap } from "core/types";
import { classnames } from "core/utils";
import Link from "next/link";
import { FunctionComponent } from "react";

interface IHeader extends IBaseProps {}

export const Header: FunctionComponent<IHeader> = ({
  id,
  className,
  style
}) => {
  let _attr: HashMap<any> = {};
  if (id) _attr.id = id;
  if (className) _attr.className = classnames(className);
  if (style) _attr.style = style;
  
  return (
    <header {..._attr}>
      <h1>NextJS Boilerplate</h1>
      <p>
        <em>Um boilerplate opinativo para projetos usando NextJS/React.</em>
      </p>
      <p>
        Acesse o repositório do GitHub: <strong><Link href={"//github.com/yuigoto/nextjs-base"}><a target={"_blank"}>github.com/yuigoto/nextjs-base</a></Link></strong>
      </p>
    </header>
  );
};

Header.defaultProps = {
  id: null,
  className: null,
  style: null  
};
