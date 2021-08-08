import { BaseProps, ClassValue, HashMap } from "core/types";
import { useState } from "react";
import { classnames } from "core/utils";

import Styles from "components/elements/containers/Collapsible.module.scss";

interface ICollapsible extends BaseProps {
  /**
   * Classe para botão.
   */
  buttonClassName?: string;

  /**
   * Classe para botão ativo.
   */
  buttonActiveClassName?: string;

  /**
   * Classe para grupo.
   */
  groupClassName?: string;

  /**
   * Classe para grupo ativo.
   */
  groupActiveClassName?: string;

  /**
   * Texto para status fechado.
   */
  hiddenButtonText?: string;

  /**
   * Texto para status aberto.
   */
  visibleButtonText?: string;
}

export const Collapsible = ({
  id,
  className,
  style,
  children,
  buttonClassName,
  buttonActiveClassName,
  groupClassName,
  groupActiveClassName,
  hiddenButtonText,
  visibleButtonText
}: ICollapsible) => {
  const [ visible, setVisible ] = useState(false);

  const _attr: HashMap<any> = {};
  if (id) _attr.id = id;
  if (className) _attr.className = classnames(className);
  if (style) _attr.style = style;

  return (
    <div {..._attr}>
      <button
        onClick={() => setVisible(!visible)}
        className={classnames(buttonClassName, {
          [buttonActiveClassName]: visible
        })}>
        {visible ? visibleButtonText : hiddenButtonText}
        &nbsp;
        <i className={classnames("fas", {
          ["fa-chevron-up"]: visible,
          ["fa-chevron-down"]: !visible,
        })} />
      </button>
      <div className={classnames(groupClassName, {
        [groupActiveClassName]: visible
      })}>
        {children}
      </div>
    </div>
  );
};

Collapsible.defaultProps = {
  id: null,
  className: Styles["collapsible"],
  style: null,
  children: null,
  buttonClassName: Styles["collapsible__button"],
  buttonActiveClassName: Styles["active"],
  groupClassName: Styles["collapsible__group"],
  groupActiveClassName: Styles["active"],
  hiddenButtonText: "Exibir",
  visibleButtonText: "Ocultar"
};
