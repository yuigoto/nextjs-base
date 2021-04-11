/**
 * core/utils/markdown
 * ----------------------------------------------------------------------
 * Utilidades para parsing de Markdown e gerenciamento de dados para o
 * blog.
 */

/**
 * Realiza a leitura do Markdown index da aplicação, retorna a parte
 * desejada do index.
 *
 * @param pathname
 *     Nome da chave do index desejada, normalmente indica a seção
 */
export const getMarkdownIndex = (pathname: string): any[] => {
  let indexed = [];

  try {
    const _index = require("data/_index.json");
    indexed = _index[pathname];
  } catch (e) {
    console.groupCollapsed(
      "[utils/markdown/getMarkdownIndex] No `_index.json` file."
    );
    console.log(e);
    console.groupEnd();
  }

  return indexed;
};
