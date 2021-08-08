import { combineReducers } from "redux";
import { ContextReducer, HashMap } from "core/types";
import { getStateActionStatus } from "core/utils/state";

/**
 * state/ducks/loader
 * ----------------------------------------------------------------------
 * @author    Fabio Y. Goto <lab@yuiti.dev>
 * @since     0.0.1
 */

/**
 * Estado inicial.
 */
const initialState: HashMap<any> = {};

/**
 * Verifica status de falha para actions da store.
 *
 * @param state
 * @param action
 * @constructor
 */
const Failure: ContextReducer<HashMap<any>> = (
  state = initialState,
  action
) => {
  const {
    payload,
    type
  } = action;

  const matches = getStateActionStatus(type);
  if (!matches) return state;

  const [ name, status ] = matches;
  if (process.env.NODE_ENV === "development") console.log(`> ${name}: ${status}`);

  let error;

  switch (typeof payload) {
    case "undefined":
      error = "Erro desconhecido.";
      break;
    case "number":
      error = `Código do erro: ${payload}`;
      break;
    case "string":
      error = payload;
      break;
    default:
      let temp;

      if (typeof payload.error !== "undefined") {
        temp = payload.error.replace(/^"|"$/g, "");
      } else if (typeof payload.message !== "undefined") {
        temp = payload.message.replace(/^"|"$/g, "");
      } else {
        temp = "Erro desconhecido.";
      }

      if (/(.|!|\?)$/g.test(temp) === false) {
        temp = `${temp}.`;
      }

      error = temp;
      break;
  }

  return Object.assign({}, state, {
    [name]: (status === "FAILURE")
      ? error
      : ""
  });
};

/**
 * Verifica status de pending request para actions da store.
 *
 * @param state
 * @param action
 * @constructor
 */
const Request: ContextReducer<HashMap<any>> = (
  state = initialState,
  action
) => {
  const {
    type
  } = action;

  const matches = getStateActionStatus(type);
  if (!matches) return state;

  const [ name, status ] = matches;
  if (process.env.NODE_ENV === "development") console.log(`> ${name}: ${status}`);

  return Object.assign({}, state, {
    [name]: (status === "REQUEST")
  });
};

/**
 * Verifica status de sucesso para actions da store.
 *
 * @param state
 * @param action
 * @constructor
 */
const Success: ContextReducer<HashMap<any>> = (
  state = initialState,
  action
) => {
  const {
    payload,
    type
  } = action;

  const matches = getStateActionStatus(type);
  if (!matches) return state;

  const [ name, status ] = matches;
  if (process.env.NODE_ENV === "development") console.log(`> ${name}: ${status}`);

  let success;

  switch (typeof payload) {
    case "undefined":
      success = "OK.";
      break;
    case "number":
      success = `Código: ${payload}`;
      break;
    case "string":
      success = payload;
      break;
    default:
      let temp;

      if (typeof payload.message !== "undefined") {
        temp = payload.message.replace(/^"|"$/g, "");
      } else {
        temp = "Status desconhecido.";
      }

      if (/(\.|!|\?)$/g.test(temp) === false) {
        temp = `${temp}.`;
      }

      success = temp;
      break;
  }

  return Object.assign({}, state, {
    [name]: (status === "SUCCESS")
      ? success
      : ""
  });
};

export default combineReducers({
  success: Success,
  failure: Failure,
  request: Request
});
