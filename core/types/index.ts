import {
  NextApiRequest,
  NextApiResponse
} from "next";
import { IClassArray } from "core/interfaces";
import { NextRouter } from "next/router";
import { RenderPageResult } from "next/dist/next-server/lib/utils";

/**
 * core/types
 * ----------------------------------------------------------------------
 * Tipos de uso geral.
 *
 * @since 0.0.1
 */

/**
 * Descreve uma função básica para endpoint de API.
 *
 * @since 0.2.0
 */
export type ApiEndpoint = (req: NextApiRequest, res: NextApiResponse) => any;

/**
 * Type para props usadas na lib `classnames`.
 *
 * @since 0.0.1
 */
export type ClassValue = string|number|HashMap<any>|IClassArray|undefined|null|boolean;

/**
 * HashMap para uso genérico.
 *
 * @since 0.0.1
 */
export type HashMap<T> = {
  [key: string]: T
};

/**
 * Define um objeto com conteúdo responsivo.
 *
 * @since 0.2.0
 */
export type Responsive<T> = {
  default: T,
  sm?: T,
  md?: T,
  lg?: T,
  xl?: T
};

/**
 * Props básicas para componente roteável.
 * 
 * @since 0.3.0
 */
export type NextRouterProps = {
  router: NextRouter
};

/**
 * Representa um payload de uma action do state.
 * 
 * @since 0.3.0
 */
export type StateAction<T> = {
  type: string,
  payload?: Partial<T>
};
