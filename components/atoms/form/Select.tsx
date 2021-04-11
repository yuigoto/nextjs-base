import { InputComponent } from "core/types/form";
import { HashMap } from "core/types";
import { classnames } from "core/utils";

/**
 * components/atoms/form/Select
 * ----------------------------------------------------------------------
 * Uma extensão sobre o select básico de formulário.
 */
export const Select: InputComponent<HTMLSelectElement> = (props) => {
  const _attr: HashMap<any> = {};
  for (let key in props) {
    switch (key) {
      case "children":
        continue;
      case "className":
        if (props[key]) _attr[key] = classnames(props[key]);
        break;
      default:
        if (props[key]) _attr[key] = props[key];
        break;
    }
  }

  return (
    <select {..._attr}>
      {props.children}
    </select>
  );
};

Select.defaultProps = {
  id: null,
  className: null,
  style: null,
  value: "",
  disabled: false,
  autoFocus: false,
  onBlur: null,
  onChange: null,
  onFocus: null,
  onKeyDown: null,
  onKeyPress: null,
  onKeyUp: null,
  readOnly: false,
  required: false
};
