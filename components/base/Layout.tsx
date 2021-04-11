import { CSSProperties, FunctionComponent } from "react";
import { IBaseProps } from "core/interfaces";
import { ClassValue, HashMap } from "core/types";
import { classnames } from "core/utils";
import { Header } from "components/base/Header";
import { Footer } from "components/base/Footer";

interface ILayout extends IBaseProps {
  mainId?: string;
  mainStyle?: CSSProperties|null;
  mainClassName?: ClassValue;
  headerId?: string;
  headerStyle?: CSSProperties|null;
  headerClassName?: ClassValue;
  footerId?: string;
  footerStyle?: CSSProperties|null;
  footerClassName?: ClassValue;
}

export const Layout: FunctionComponent<ILayout> = ({
  id,
  className,
  children,
  style,
  mainId,
  mainStyle,
  mainClassName,
  headerId,
  headerStyle,
  headerClassName,
  footerId,
  footerStyle,
  footerClassName
}) => {
  let _attr: HashMap<any> = {};
  if (id) _attr.id = id;
  if (className) _attr.className = classnames(className);
  if (style) _attr.style = style;
  
  let _mainAttr: HashMap<any> = {};
  if (mainId) _mainAttr.id = mainId;
  if (mainClassName) _mainAttr.className = classnames(mainClassName);
  if (mainStyle) _mainAttr.style = mainStyle;
  
  return (
    <div {..._attr}>
      <Header id={headerId} style={headerStyle} className={headerClassName}/>
      <div {..._mainAttr}>
        {children}
      </div>
      <Footer id={footerId} style={footerStyle} className={footerClassName}/>
    </div>
  );
};

Layout.defaultProps = {
  id: null,
  style: null,
  className: null,
  mainId: null,
  mainStyle: null,
  mainClassName: null,
  headerId: null,
  headerStyle: null,
  headerClassName: null,
  footerId: null,
  footerStyle: null,
  footerClassName: null
};
