import { HashMap } from "core/types/index";

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
