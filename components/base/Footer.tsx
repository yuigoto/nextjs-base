import { BaseProps, HashMap } from "core/types";
import { FunctionComponent } from "react";
import { classnames } from "core/utils";
import { FooterContainer } from "components/base/containers";

interface IFooterProps extends BaseProps {}

export const Footer: FunctionComponent<IFooterProps> = ({
  id,
  className,
  style
}) => {
  const _attr: HashMap<any> = {};
  if (id) _attr.id = id;
  if (className) _attr.className = classnames(className);
  if (style) _attr.style = classnames(style);

  return (
    <FooterContainer {..._attr}>
      <p>
        <small>&copy;2021 YUITI</small>
      </p>
    </FooterContainer>
  );
};

Footer.defaultProps = {
  id: "footer",
  className: null
};
