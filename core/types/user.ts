import { HashMap } from "core/types/index";

/**
 * core/types/user
 * ----------------------------------------------------------------------
 * @author    Fabio Y. Goto <lab@yuiti.dev>
 * @since     0.0.1
 */

/**
 * Entidade básica de usuário.
 */
export type User = HashMap<any> & {
  id: number;
  name: string;
  email: string;
  website?: string;
  created_at: Date;
  updated_at: Date;
};
