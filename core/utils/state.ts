import { Couple } from "core/types";
import { STATE_ACTION_STATUS } from "core/expressions";

/**
 * core/utils/state
 * ----------------------------------------------------------------------
 * @author    Fabio Y. Goto <lab@yuiti.dev>
 * @since     0.0.1
 */

/**
 * Verifica se é uma action de status de request e, se for, retorna o
 * nome do tipo de ação e a flag de status (sucesso, request ou falha).
 *
 * @param status
 *     Nome da action completa, para verificação
 */
export const getStateActionStatus = (
  status: string
): Couple<string, string>|null => {
  const match = STATE_ACTION_STATUS.exec(status);
  if (!match) return null;
  const [, actionName, actionStatus] = match;
  return [actionName, actionStatus];
};
