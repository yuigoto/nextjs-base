import { HAS_OWN } from "core/constants";
import { ClassValue, HashMap } from "core/types";

/**
 * core/utils
 * ----------------------------------------------------------------------
 * @author    Fabio Y. Goto <lab@yuiti.dev>
 * @since     0.0.1
 */

/**
 * Retorna a dimensão, em píxels, de um determinado breakpoint.
 *
 * @param size
 *     Tamanho desejado
 */
export const breakpoint = (size?: string): number => {
  // Cada case tem um fallback usando variáveis de ambiente.
  switch (size) {
    case "sm":
      return parseInt(process.env.RWD_BREAKPOINT_SM) || 576;
    case "md":
      return parseInt(process.env.RWD_BREAKPOINT_MD) || 768;
    case "lg":
      return parseInt(process.env.RWD_BREAKPOINT_LG) || 992;
    case "xl":
      return parseInt(process.env.RWD_BREAKPOINT_XL) || 1200;
    default:
      return parseInt(process.env.RWD_BREAKPOINT_XS) || 0;
  }
};

/**
 * Realiza merge de nomes de classes, de acordo com condições fornecidas.
 *
 * Implementação local da lib `classnames`.
 *
 * @param args
 *     Argumentos válidos de classes CSS
 */
export const classnames = (
  ...args: ClassValue[]
): string => {
  let returnable: string[] = [];

  for (let argument of args) {
    if (!argument) continue;

    let __type = typeof argument;

    if (__type === "string" || __type === "number") {
      let item: string = `${argument}`;
      returnable.push(item);
    } else if (Array.isArray(argument)) {
      if (argument.length) {
        let _sub: string = classnames.apply(null, argument);
        returnable.push(_sub);
      }
    } else if (__type === "object" && __type !== null) {
      if (
        hasOwn(argument, "toString")
        && argument.toString !== Object.prototype.toString
      ) {
        returnable.push(argument.toString());
      } else {
        for (let key in (argument as any)) {
          if (hasOwn(argument, key) && argument[key]) {
            returnable.push(key);
          }
        }
      }
    }
  }

  return returnable.join(" ");
};

/**
 * Realiza padding de uma string (adição de caracteres nela até que
 * atinja uma largura X).
 *
 * @param value
 *     String/número para fazer padding
 * @param size
 *     Tamanho desejado do retorno
 * @param character
 *     Caractere para uso no padding
 * @param toRight
 *     Originalmente o padding é feito à esquerda, modifique com esta opção
 */
export const pad = (
  value: number | string,
  size: number,
  character: string,
  toRight = false
): string => {
  if (typeof value === "number") value = value + "";
  return (value.length >= size)
    ? value
    : (
      (toRight)
        ? value + (new Array(size - value.length + 1)).join(character)
        : (new Array(size - value.length + 1)).join(character) + value
    );
};

/**
 * Alias para `hasOwnProperty`.
 *
 * @param item
 *     Item para verificação.
 * @param property
 * @constructor
 */
export const hasOwn = (item: any, property: string) => {
  return HAS_OWN.call(item, property);
};

/**
 * Formata um valor numérico para o local e moeda desejados.
 *
 * @param value
 *     Valor a ser formatado
 * @param locale
 *     Código do local (ex.: pt-BR)
 * @param currency
 *     Código da moeda (ex.: BRL)
 */
export const toCurrency = (
  value: number,
  locale = "pt-BR",
  currency = "BRL"
): string | boolean => {
  if (typeof value !== "number") return false;

  locale = locale || "pt-BR";
  currency = currency || "BRL";

  if (typeof Intl === "undefined") return false;

  let format = new Intl.NumberFormat(
    locale,
    {
      style: "currency",
      currency
    }
  );

  return format.format(value);
};

/**
 * Capitaliza a primeira letra da string, ou de cada palavra.
 *
 * @param value
 *     Valor para capitalizar
 * @param firstLetterOnly
 *     Se capitaliza apenas a primeira letra da string
 */
export const capitalize = (value: string, firstLetterOnly = false): string => {
  if (firstLetterOnly) {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  let matches = value.normalize("NFD").match(/[\w\u0300-\u036f][^\s,]*/g);
  let words = [];

  for (let n = 0; n < matches.length; n++) {
    let curr = matches[n];
    words.push(curr.charAt(0).toUpperCase() + curr.slice(1));
  }

  return words.join(" ");
};

/**
 * Uma quase implementação local de `jQuery.param()`, usado para serializar
 * dados de um objeto ou array em uma string URL-encoded.
 *
 * Original pode ser encontrado em:
 * https://github.com/knowledgecode/jquery-param/blob/master/jquery-param.js
 *
 * @param input
 *     Objeto ou array para serialização
 */
export const serialize = (input: any): string => {
  /**
   * Armazena os dados prontos para serialização.
   */
  let serialized: HashMap<any> = {};

  /**
   * Adiciona uma `key` com `value` dentro de `serialized`.
   *
   * @param key
   *     Nome da chave a ser adicionada
   * @param value
   *     Valor da chave
   */
  const add = (key: string, value: any) => {
    value = (typeof value === "function") ? value() : value;
    value = (value === null || undefined) ? "" : value;
    serialized[key] = value;
  };

  /**
   * Serializa os dados em `value`, adicionando o prefixo, quando necessário.
   *
   * @param value
   *     Valor a ser serializado (objeto ou array)
   * @param prefix
   *     Prefixo para namespacing
   */
  const params = (value: any, prefix: string): HashMap<any> => {
    let index: number | string;
    let length: number;
    let key: string;

    if (prefix) {
      if (Array.isArray(value)) {
        for (index = 0, length = value.length; index < length; index++) {
          params(
            value[index],
            prefix
            + "["
            + ((value[index] && typeof value[index] === "object") ? index : "")
            + "]"
          );
        }
      } else if (String(value) === "[object Object]") {
        for (key in value) {
          params(value[key], `${prefix}[${key}]`);
        }
      } else {
        add(prefix, value);
      }
    } else if (Array.isArray(value)) {
      for (index = 0, length = value.length; index < length; index++) {
        if (hasOwn(value[index], "name") && hasOwn(value[index], "value")) {
          add(value[index].name, value[index].value);
        } else {
          params(value[index], `[${index}]`);
        }
      }
    } else {
      for (key in value) {
        params(value[key], key);
      }
    }

    return serialized;
  };

  params(input, "");

  return Object.keys(serialized).map(item => {
    return `${encodeURIComponent(item)}=${encodeURIComponent(serialized[item])}`;
  }).join("&");
};

/**
 * Retorna uma versão URL-safe de uma string.
 *
 * @param value
 *     Valor a ser limpo
 * @param trim
 *     Se executamos trimming
 */
export const toSafeUrlName = (value: any, trim = false): string => {
  let _value = value;

  if (typeof _value !== "string" && _value.toString) {
    _value = _value.toString();
  } else if (!_value.toString) {
    return "";
  }

  if (true === trim) _value = _value.trim();

  return _value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s\s/g, "-")
    .replace(/\s/g, "-");
};

/**
 * Copia o texto de um elemento com um determinado ID ou classe para a área de
 * transferência.
 *
 * Um callback que recebe o status de sucesso ou falha pode ser usado, caso
 * precise acompanhar.
 *
 * IMPORTANTE:
 * Não pode ser executado no console, o documento precisa ter o foco para
 * que esta função funcione.
 *
 * @param classOrId
 *     Classe ou ID, precisa incluir ponto ou hash (.classe ou #id)
 * @param callback
 *     Callback para informar status
 */
export const copyToClipboard = (classOrId: string, callback?: (boolean) => any) => {
  if (!document && !navigator) {
    if (callback) callback(false);
    return;
  }

  const element: HTMLElement & HTMLInputElement = document.querySelector(classOrId);
  const value = element.innerText || element.value;
  // @ts-ignore
  const isFirefox = typeof InstallTrigger !== "undefined";
  // @ts-ignore
  const isIE = /*@cc_on!@*/false || !!document.documentMode;
  const isEdge = !isIE && !!window.StyleMedia;
  let textArea;

  if (isFirefox || isIE || isEdge) {
    textArea = document.createElement("textarea");
    textArea.innerText = value;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    const copied = document.execCommand("copy");
    textArea.remove();

    if (callback) callback(copied);
  } else {
    navigator
      .clipboard
      .writeText(value)
      .then(() => {
        if (callback) callback(true);
      })
      .catch(err => {
        console.error("Não foi possível copiar.");
        if (callback) callback(false);
      });
  }
};
