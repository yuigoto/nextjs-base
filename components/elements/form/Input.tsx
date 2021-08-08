import { HashMap } from "core/types";
import { InputComponent } from "core/types/form";

export const Input: InputComponent<HTMLInputElement> = (props) => {
  const _attr: HashMap<any> = {};
  for (let key in props) {
    switch (key) {
      case "className":
        if(props[key]) _attr[key] = props[key];
        break;
      case "value":
        if(props[key]) _attr["defaultValue"] = props[key];
        break;
      default:
        if(props[key]) _attr[key] = props[key];
        break;
    }
  }

  return (
    <input {..._attr} />
  );
};

Input.defaultProps = {
  id: null,
  className: null,
  style: null,
  type: "text",
  value: "",
  disabled: false,
  autoFocus: false,
  list: null,
  onBlur: null,
  onChange: null,
  onFocus: null,
  onKeyDown: null,
  onKeyPress: null,
  onKeyUp: null,
  pattern: null,
  placeholder: null,
  readOnly: false,
  required: false,
  step: null
};
