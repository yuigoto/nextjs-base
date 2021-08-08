import { InputComponent } from "core/types/form";
import { HashMap } from "core/types";

export const TextArea: InputComponent<HTMLTextAreaElement> = (props) => {
  const _attr: HashMap<any> = {};
  for (let key in props) {
    switch (key) {
      case "children":
        continue;
      case "className":
        if (props[key]) _attr[key] = props[key];
        break;
      default:
        if (props[key]) _attr[key] = props[key];
        break;
    }
  }

  if (!_attr.style) {
    _attr.style = {
      resize: "both"
    };
  }

  return (
    <textarea {..._attr}/>
  );
};

TextArea.defaultProps = {
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
  pattern: null,
  placeholder: null,
  readOnly: false,
  required: false
};
