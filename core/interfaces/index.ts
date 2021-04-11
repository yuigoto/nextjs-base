import { ClassValue, HashMap } from "core/types";

/**
 * core/interfaces
 * ----------------------------------------------------------------------
 * Interfaces de uso geral.
 */

/**
 * Array de objetos válidos para classes de um elemento.
 *
 * Usado pela lib `classnames`.
 */
export interface IClassArray extends Array<ClassValue> {}

/**
 * Objeto Markdown, importado via `frontmatter-markdown-loader`.
 */
export interface IMarkdownFile extends HashMap<any> {
  /**
   * Atributos do frontmatter.
   */
  attributes?: HashMap<any>;

  /**
   * Corpo renderizado em HTML.
   */
  html?: string;

  /**
   * Corpo em Markdown puro.
   */
  body?: string;

  /**
   * Metadados do markdown.
   */
  meta?: HashMap<any>;

  /**
   * Componente React.
   */
  react?: Function;
}
