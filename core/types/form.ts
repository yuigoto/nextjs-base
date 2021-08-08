import {
  DetailedHTMLProps, FunctionComponent,
  InputHTMLAttributes, LabelHTMLAttributes
} from "react";

/**
 * core/types/form
 * ----------------------------------------------------------------------
 * @author    Fabio Y. Goto <lab@yuiti.dev>
 * @since     0.0.1
 */

/**
 * Tipo genérico para uso com inputs de formulário.
 */
export type InputComponentType<T> = DetailedHTMLProps<InputHTMLAttributes<T>, T>;

/**
 * Assinatura de tipo genérica para um componente de input.
 */
export type InputComponent<T> = FunctionComponent<InputComponentType<T>>;

/**
 * Tipo genérico para uso com labels de formulário.
 */
export type LabelComponentType<T> = DetailedHTMLProps<LabelHTMLAttributes<T>, T>;

/**
 * Assinatura de tipo genérica para um componente de label.
 */
export type LabelComponent<T> = FunctionComponent<LabelComponentType<T>>;
