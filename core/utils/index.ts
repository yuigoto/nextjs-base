import { ClassValue } from "core/types";

/**
 * core/utils
 * ----------------------------------------------------------------------
 * Fornece funções utilitárias.
 *
 * @since 0.1.0
 */

/**
 * Retorna a dimensão, em pixels, de um determinado breakpoint.
 *
 * @param size
 */
export const breakpoint = (size?: string): number => {
  switch (size) {
    case "sm": return 576;
    case "md": return 768;
    case "lg": return 992;
    case "xl": return 1200;
    default: return 0;
  }
};

/**
 * Realiza merge de nomes de classes, de acordo com valores e condições
 * fornecidos.
 *
 * Implementação local da biblioteca `classnames`, para evitar instalação de
 * algumas dependências.
 *
 * @param args
 */
export const classnames = (
  ...args: ClassValue[]
): string => {
  const hasOwn: Function = {}.hasOwnProperty;
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
        hasOwn.call(argument, "toString")
        && argument.toString !== Object.prototype.toString
      ) {
        returnable.push(argument.toString());
      } else {
        for (let key in (argument as any)) {
          if (hasOwn.call(argument, key) && argument[key]) {
            returnable.push(key);
          }
        }
      }
    }
  }

  return returnable.join(" ");
}
