import { BaseProps, HashMap } from "core/types";
import { FunctionComponent } from "react";
import { classnames } from "core/utils";
import { Heading } from "components/atoms/typography/Heading";
import { Anchor } from "components/atoms/elements/Anchor";
import { HeaderContainer } from "components/base/containers";

interface IHeaderProps extends BaseProps {}

export const Header: FunctionComponent<IHeaderProps> = ({
  id,
  className,
  style
}) => {
  const _attr: HashMap<any> = {};
  if (id) _attr.id = id;
  if (className) _attr.className = classnames(className);
  if (style) _attr.style = classnames(style);

  return (
    <HeaderContainer>
      <Heading size={1} title={"NextJS Base"}>
        <Anchor href={"/"}>
          NextJS Boilerplate
        </Anchor>
      </Heading>

      <p>
        <em>Um boilerplate opinativo para projetos usando NextJS e React.</em>
      </p>

      <p>
        <small>Repositório em: <strong><Anchor target={"_blank"} href={"//github.com/yuigoto/nextjs-base"}>https://github.com/yuigoto/nextjs-base</Anchor></strong></small>
      </p>
    </HeaderContainer>
  );
};

Header.defaultProps = {
  id: "header",
  className: null
};
