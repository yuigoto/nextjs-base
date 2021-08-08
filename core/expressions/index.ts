/**
 * core/expressions
 * ----------------------------------------------------------------------
 * @author    Fabio Y. Goto <lab@yuiti.dev>
 * @since     0.0.1
 */

/**
 * Para validar métodos HTTP.
 */
export const HTTP_METHODS: RegExp = /(POST|GET|PUT|DELETE|HEAD|CONNECT|OPTIONS|TRACE)/;

/**
 * Para matching de status de alguma parte do state.
 *
 * Usado quando states realizam requests que precisem de notificações e/ou
 * controlem estado.
 */
export const STATE_ACTION_STATUS: RegExp = /(.*)_(REQUEST|SUCCESS|FAILURE)/;

/**
 * Para matching de URLs.
 */
export const URL_REGEX: RegExp = /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$/i;

/**
 * Para matching de IDs de vídeos do YouTube.
 */
export const YOUTUBE_VIDEO: RegExp = /(youtu.be|youtube.com)\/(watch?(.*&?)?v=|(embed|v)\/)?([^?&"'>\r\n]+)/;
