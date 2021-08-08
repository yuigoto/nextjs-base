import { ContextAction } from "core/types";

/**
 * state/ducks/counter
 * ----------------------------------------------------------------------
 * @author    Fabio Y. Goto <lab@yuiti.dev>
 * @since     0.0.1
 */

// TYPES
// ----------------------------------------------------------------------

/**
 * Tipos de ação.
 */
export const Types = {
  COUNTER_INCREASE: "Counter/INCREASE",
  COUNTER_DECREASE: "Counter/DECREASE"
};

// STATE
// ----------------------------------------------------------------------

/**
 * Estado inicial desta store.
 */
const initialState = {
  count: 0
};

/**
 * Reducer para esta store.
 *
 * @param state
 *     Estado atual
 * @param action
 *     Action despachada
 * @constructor
 */
const Reducer = (state = initialState, action: ContextAction) => {
  switch (action.type) {
    case Types.COUNTER_INCREASE:
    case Types.COUNTER_DECREASE:
      return Object.assign(
        {},
        state,
        {
          count: state.count + action.payload.count
        }
      );
    default:
      return state;
  }
};

export default Reducer;

// THUNKS
// ----------------------------------------------------------------------

// ... nenhum por enquanto ...

// ACTION CREATORS
// ----------------------------------------------------------------------

/**
 * Incrementa o contador por `value`.
 *
 * @param value
 *     Valor a incrementar
 * @constructor
 */
export const CountIncrease = (value = 1): any => ({
  type: Types.COUNTER_INCREASE,
  payload: {
    count: (value < 0) ? value * -1 : value
  }
});

/**
 * Diminui o contador por `value`.
 *
 * @param value
 *     Valor a reduzir
 * @constructor
 */
export const CountDecrease = (value = -1): any => ({
  type: Types.COUNTER_DECREASE,
  payload: {
    count: (value > 0) ? value * -1 : value
  }
});
