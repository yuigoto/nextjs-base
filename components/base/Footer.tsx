import { IBaseProps } from "core/interfaces";
import { HashMap } from "core/types";
import { classnames } from "core/utils";
import { FunctionComponent } from "react";

interface IFooter extends IBaseProps {}

export const Footer: FunctionComponent<IFooter> = ({
  id,
  className,
  style
}) => {
  let _attr: HashMap<any> = {};
  if (id) _attr.id = id;
  if (className) _attr.className = classnames(className);
  if (style) _attr.style = style;
  
  return (
    <footer {..._attr}>
      <p>
        <small>
          &copy;2020 Fabio Y. Goto
        </small>
      </p>
    </footer>
  );
};

Footer.defaultProps = {
  id: null,
  className: null,
  style: null
};
