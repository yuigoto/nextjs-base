import React, { FunctionComponent, ReactNode } from "react";
import { IBaseProps } from "core/interfaces";
import { HashMap } from "core/types";
import { classnames } from "core/utils";
import Link from "next/link";

interface IPaginate extends IBaseProps {
  path?: string;
  page?: number|string;
  totalPages?: number|string;
}

/**
 * components/elements/Paginate
 * ----------------------------------------------------------------------
 * Componente de paginação simples.
 * 
 * @param props
 * 
 * @since 0.2.0
 */
export const Paginate: FunctionComponent<IPaginate> = ({
  id,
  className,
  style,
  page, 
  path,
  totalPages
}) => {
  let _attr: HashMap<any> = {};
  if (id) _attr.id = id;
  if (style) _attr.style = style;
  _attr.className = classnames(className);
  
  const renderPageLink = (): ReactNode => {
    let links: ReactNode[] = [];
    
    if (page > 1) {
      links.push(
        <Link 
          key={"first"}
          href={`${path}/1`}>
          &nbsp;&laquo;&nbsp;
        </Link>
      );
      
      links.push(
        <Link 
          key={"previous"}
          href={`${path}/${parseInt(page as string) - 1}`}>
          &nbsp;&lsaquo;&nbsp;
        </Link>
      );
    }
    
    if (page < totalPages) {
      links.push(
        <Link 
          key={"next"}
          href={`${path}/${parseInt(page as string) + 1}`}>
          &nbsp;&rsaquo;&nbsp;
        </Link>
      );
      
      links.push(
        <Link 
          key={"last"}
          href={`${path}/${totalPages}`}>
          &nbsp;&raquo;&nbsp;
        </Link>
      );
    }
    
    return links;
  };
  
  return (
    <nav {..._attr}>
      {renderPageLink()}
    </nav>
  );
};

Paginate.defaultProps = {
  id: null,
  className: null,
  style: null,
  page: 1,
  totalPages: 0,
  path: ""
};
