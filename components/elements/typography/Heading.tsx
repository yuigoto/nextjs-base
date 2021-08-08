import { BaseProps, HashMap } from "core/types";
import { classnames } from "core/utils";

interface IHeading extends BaseProps {
  /**
   * Título, para acessibilidade.
   */
  title?: string;

  /**
   * Tamanho do heading, de 1 a 6.
   */
  size?: number;

  /**
   * Tipo de elemento a ser utilizado.
   */
  type?: "div"|"span"|"p"|"default";
}

export const Heading = ({
  id,
  className,
  style,
  title,
  children,
  size,
  type
}: IHeading) => {
  let _size = Math.max(Math.min(size, 6), 1);

  const _attr: HashMap<any> = {};
  if (id) _attr.id = id;
  if (title) _attr.title = title;
  if (style) _attr.style = style;

  if (type === "div" || type === "p" || type === "span") {
    _attr.className = classnames(`h${_size}`, className);

    switch (type) {
      case "div":
        return (<div {..._attr}>{children}</div>);
      case "span":
        return (<span {..._attr}>{children}</span>);
      default:
        return (<p {..._attr}>{children}</p>);
    }
  } else {
    if (className) _attr.className = className;
  }

  switch (_size) {
    case 2:
      return (<h2 {..._attr}>{children}</h2>);
    case 3:
      return (<h3 {..._attr}>{children}</h3>);
    case 4:
      return (<h4 {..._attr}>{children}</h4>);
    case 5:
      return (<h5 {..._attr}>{children}</h5>);
    case 6:
      return (<h6 {..._attr}>{children}</h6>);
    default:
      return (<h1 {..._attr}>{children}</h1>);
  }
};

Heading.defaultProps = {
  id: null,
  className: null,
  title: null,
  style: null,
  children: null,
  size: 1,
  type: "default"
};
