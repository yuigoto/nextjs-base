import { LabelComponent } from "core/types/form";
import { HashMap } from "core/types";
import { classnames } from "core/utils";

/**
 * components/atoms/form/Label
 * ----------------------------------------------------------------------
 * Uma extensão sobre o label básico de formulário.
 */
export const Label: LabelComponent<HTMLLabelElement> = (props) => {
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
    <label {..._attr}>{props.children}</label>
  );
};

Label.defaultProps = {
  id: null,
  className: null,
  style: null,
  onBlur: null,
  onChange: null,
  onClick: null,
  onFocus: null,
  onKeyDown: null,
  onKeyPress: null,
  onKeyUp: null,
  onMouseDown: null,
  onMouseEnter: null,
  onMouseLeave: null,
  onMouseMove: null,
  onMouseOut: null,
  onMouseOver: null,
  onMouseUp: null,
  placeholder: null,
};
