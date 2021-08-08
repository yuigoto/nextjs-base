import { ButtonComponent, HashMap } from "core/types";

export const Button: ButtonComponent<HTMLButtonElement> = ({
  children,
  ...props
}) => {
  const _attr: HashMap<any> = {};
  for (let key in props) {
    switch (key) {
      case "className":
        if (props[key]) _attr[key] = props[key];
        break;
      case "onClick":
      case "onKeyDown":
      case "onKeyUp":
        if (props[key]) {
          _attr[key] = (evt: MouseEvent|KeyboardEvent) => {
            evt.preventDefault();
            props[key](evt);
          };
        }
        break;
      default:
        if (props[key]) _attr[key] = props[key];
        break;
    }
  }

  return (
    <button {..._attr}>{children}</button>
  );
};
