import { HashMap } from "core/types/index";

/**
 * core/types/blog
 * ----------------------------------------------------------------------
 * @author    Fabio Y. Goto <lab@yuiti.dev>
 * @since     0.0.1
 */

/**
 * Elemento da listagem de posts do blog.
 */
export type BlogListItem = HashMap<any> & {
  id: string|number;
  slug: string;
  file: string;
  title: string;
  excerpt: string;
  date: string|Date;
  author: string;
  tags: string[];
};
