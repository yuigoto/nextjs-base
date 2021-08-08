import { ClassValue, HashMap } from "core/types";

/**
 * core/interfaces
 * ----------------------------------------------------------------------
 * @author    Fabio Y. Goto <lab@yuiti.dev>
 * @since     0.0.1
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
   * Objeto com atributos do frontmatter.
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
   * Objeto com metadados do markdown.
   */
  meta?: HashMap<any>;

  /**
   * Componente React.
   */
  react?: Function;
}
