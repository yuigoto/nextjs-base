import { FunctionComponent, useState } from "react";
import { classnames } from "core/utils";
import { BaseProps } from "core/types";

import Styles from "styles/elements/ExampleGroup.module.scss";

/**
 * components/elements/ExampleGroup
 * ----------------------------------------------------------------------
 */
export const ExampleGroup: FunctionComponent<BaseProps> = ({
  children
}) => {
  const [ visible, setVisible ] = useState(false);

  return (
    <>
      <button
        onClick={() => setVisible(!visible)}
        className={classnames(Styles["group-button"], {
          [Styles["active"]]: visible
        })}>
        {visible ? "Ocultar" : "Exibir"} <i className={`fas fa-chevron-${visible ? "up" : "down"}`}/>
      </button>
      <div className={classnames(Styles["group"], {
        [Styles["active"]]: visible
      })}>
        {children}
      </div>
    </>
  );
};
