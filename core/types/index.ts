import { NextApiRequest, NextApiResponse } from "next";
import { NextRouter } from "next/router";
import { IClassArray } from "core/interfaces";
import { 
  ButtonHTMLAttributes, 
  DetailedHTMLProps, 
  FunctionComponent, 
  HTMLAttributes 
} from "react";

/**
 * core/types
 * ----------------------------------------------------------------------
 * @author    Fabio Y. Goto <lab@yuiti.dev>
 * @since     0.0.1
 */

/**
 * Hashmap simples.
 */
export type HashMap<T> = {
  [key: string]: T
};

/**
 * Ênuplo (tuple) de 2 elementos.
 */
export type Couple<T, S> = [T, S];

/**
 * Ênuplo (tuple) de 3 elementos.
 */
export type Triplet<T, S, C> = [T, S, C];

/**
 * Ênuplo (tuple) de 4 elementos.
 */
export type Quad<T, S, C, X> = [T, S, C, X];

/**
 * Ênuplo (tuple) de 5 elementos.
 */
export type Quint<T, S, C, X, Y> = [T, S, C, X, Y];

/**
 * Ênuplo (tuple) de 6 elementos.
 */
export type Sextet<T, S, C, X, Y, Z> = [T, S, C, X, Y, Z];

/**
 * Objeto com propriedades responsivas.
 */
export type Responsive<T> = {
  default: T,
  sm?: T,
  md?: T,
  lg?: T,
  xl?: T
};

// GENÉRICOS
// ----------------------------------------------------------------------

/**
 * Endpoint de API básico.
 */
export type ApiEndpoint = (req: NextApiRequest, res: NextApiResponse) => any;

/**
 * Objeto com props comuns à diversos elementos e componentes.
 */
export type BaseProps = Omit<HTMLAttributes<any>, "className"> & {
  className?: ClassValue;
};

/**
 * Tipo genérico para uso com botões.
 */
export type ButtonComponentType<T> = DetailedHTMLProps<ButtonHTMLAttributes<T>, T>;

/**
 * Tipo genérico para uso com componentes de botão.
 */
export type ButtonComponent<T> = FunctionComponent<ButtonComponentType<T>>;

/**
 * Valor válido para uma classe CSS.
 *
 * Usado pela lib `classnames`.
 */
export type ClassValue = string | number | HashMap<any> | IClassArray | undefined | null | boolean;

/**
 * Ação para reducer de contexto.
 */
export type ContextAction = HashMap<any> & {
  type: string,
  payload: any
};

/**
 * Função de despacho de actions para o reducer de contexto.
 */
export type ContextDispatcher = (data: ContextAction) => void;

/**
 * Reducer para contexto.
 */
export type ContextReducer<T> = (state: T, action: ContextAction) => T;

/**
 * Formatos de data suportados.
 */
export type DateFormats = "iso"|"utc"|"long"|"short"|"short-time"|"time"|null|undefined;

/**
 * Props básicas para componentes de classe com route awareness.
 */
export type NextRouterProps = {
  router: NextRouter
};
