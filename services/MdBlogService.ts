import Index from "_index.json";
import { HashMap } from "core/types";
import { IMarkdownFile } from "core/interfaces";

/**
 * Descreve o modelo de dados em uma página de blog em Markdown.
 */
interface IMarkdownPage extends HashMap<any> {
  page?: number;
  posts?: any[];
  totalPages?: number;
}

/**
 * Retorna uma página contendo postagens do blog em Markdown.
 * 
 * @param path 
 *     Caminho, dentro da pasta `data` aonde se encontram os posts
 * @param page 
 *     Página desejada
 * @param perPage 
 *     Quantidade de itens por página
 */
export const GetPage = (
  path: string, 
  page: number, 
  perPage: number = 5
):IMarkdownPage => {
  let index: any[] = Index[`data/${path}`],
      sorted: any[] = index.sort().reverse(),
      initial: number = (page * perPage) - perPage,
      final: number = initial + perPage,
      totalPages: number = Math.ceil(sorted.length / perPage);
  
  return {
    page: page,
    posts: sorted.slice(initial, final),
    totalPages: totalPages
  };
};

/**
 * Retorna um post do blog, retorna `null` se não encontrar nada.
 * 
 * @param path 
 *     Caminho, dentro da pasta `data` aonde se encontram os posts
 * @param slug
 *     Slug do post
 */
export const GetPost = (path: string, slug: string): IMarkdownFile|null => {
  let index: any[] = Index[`data/${path}`];
  return (index.indexOf(slug) !== -1) 
    ? require(`data/${path}/${slug}.md`) 
    : null;
};
