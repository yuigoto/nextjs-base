import { SOCIAL_SHARE_TEMPLATES } from "core/constants";
import { YOUTUBE_VIDEO } from "core/expressions";

/**
 * core/utils/social
 * ----------------------------------------------------------------------
 * @author    Fabio Y. Goto <lab@yuiti.dev>
 * @since     0.0.1
 */

/**
 * Retorna um callback para link de compartilhamento para a rede social
 * desejada.
 *
 * @param network
 *     Slug da rede social para uso
 * @param text
 *     Texto a ser compartilhado
 */
export const getShareCallback = (network: string, text: string) => {
  return () => {
    return shareTo(network, text);
  };
};

/**
 * Abre uma janela de compartilhamento para uma rede social, para compartilhar
 * conteúdo.
 *
 * @param network
 *     Slug da rede social para uso
 * @param text
 *     Texto a ser compartilhado
 */
export const shareTo = (network: string, text: string) => {
  let template = SOCIAL_SHARE_TEMPLATES[network];
  let url;

  if (!template) return null;

  url = template.replace(/{{TEXT}}/g, text);

  if (url && typeof window !== "undefined") {
    window.open(
      url,
      "_blank",
      "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600"
    );
  }
};

/**
 * Extrai o ID de um vídeo do YouTube.
 *
 * @param urlOrEmbed
 *     URL or embed code para extração
 */
const youtubeGetId = (urlOrEmbed: string): string|boolean => {
  let matches = YOUTUBE_VIDEO.exec(urlOrEmbed.trim());
  if (Array.isArray(matches) && matches.length > 1) {
    return matches[matches.length - 1];
  }
  return false;
};
