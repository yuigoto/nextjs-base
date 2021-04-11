import { ButtonComponent, HashMap } from "core/types";
import { classnames } from "core/utils";

/**
 * components/atoms/elements/Button
 * ----------------------------------------------------------------------
 * Componente de botão básico, por padrão desabilita comportamento padrão de
 * eventos de mouse e teclado.
 */
export const Button: ButtonComponent<HTMLButtonElement> = (props) => {
  const _attr: HashMap<any> = {};
  for (let key in props) {
    switch (key) {
      case "children":
        continue;
      case "className":
        if (props[key]) _attr[key] = classnames(props[key]);
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
    <button {..._attr}>{props.children}</button>
  );
};
