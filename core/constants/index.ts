/**
 * core/constants
 * ----------------------------------------------------------------------
 * Constantes globais.
 */

import { HashMap } from "core/types";

/**
 * Alias interno para `hasOwnProperty`.
 */
export const HAS_OWN = {}.hasOwnProperty;

/**
 * Usado para definir a ordem de preferência na renderização de objetos
 * responsivos na página.
 *
 * Ordenado do maior para o menor.
 */
export const RESPONSIVE_SIZES: string[] = [ "xl", "lg", "md", "sm", "default" ];

/**
 * Strings com templates para compartilhamento de posts em redes sociais.
 */
export const SOCIAL_SHARE_TEMPLATES: HashMap<string> = {
  facebook: "https://www.facebook.com/sharer.php?u={{TEXT}}",
  instagram: "https://instagram.com/",
  twitter: "http://twitter.com/share?text={{TEXT}}",
  whatsapp: "https://api.whatsapp.com/send?text={{TEXT}}"
};
