import {
  ClassValue,
  HashMap
} from "core/types";
import {
  CSSProperties,
  ReactNode
} from "react";

/**
 * core/interfaces
 * ----------------------------------------------------------------------
 * Interfaces de uso geral.
 *
 * @since 0.0.1
 */

/**
 * Interface para props comuns a diversos elementos HTML e componentes.
 *
 * @since 0.0.1
 */
export interface IBaseProps extends HashMap<any> {
  id?: string|null;
  className?: ClassValue;
  children?: ReactNode;
  style?: CSSProperties|null|undefined;
}

/**
 * Interface para props usadas na lib `classnames`.
 *
 * @since 0.0.1
 */
export interface IClassArray extends Array<ClassValue> {}

/**
 * Inteface para objetos importados via `frontmatter-markdown-loader`.
 * 
 * @since 0.0.1
 */
export interface IMarkdownFile extends HashMap<any> {
  /**
   * Lista com atributos do frontmatter.
   */
  attributes?: HashMap<any>;
  
  /**
   * HTML renderizado.
   */
  html?: string;
  
  /**
   * Markdown puro.
   */
  body?: string;
  
  /**
   * Metadados do arquivo.
   */
  meta?: HashMap<any>;
  
  /**
   * Componente React pronto para uso.
   */
  react?: Function;
}
