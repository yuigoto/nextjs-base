import { HashMap, StateAction } from "core/types";

/**
 * state/ducks/Test
 * ----------------------------------------------------------------------
 * Duck para gerenciamento de uma fatia do state.
 * 
 * @since 0.3.0
 */

/**
 * Lista os tipos de actions possíveis dentro do duck.
 */
export const Types = {
  COUNT_INCREASE: "test/COUNT_INCREASE",
  COUNT_DECREASE: "test/COUNT_DECREASE"
};

/**
 * Interface para o estado.
 */
interface ITestState {
  count: number;
}

/**
 * Estado inicial.
 */
const initialState: ITestState = {
  count: 0
};

// REDUCER
// ----------------------------------------------------------------------

/**
 * Função redutora.
 * 
 * @param state 
 *     Estado inicial ou atual
 * @param action 
 *     Action para execução
 */
const Reducer = (
  state: ITestState = initialState, 
  action: StateAction<ITestState>
): ITestState => {
  switch (action.type) {
    case Types.COUNT_INCREASE:
    case Types.COUNT_DECREASE:
      return Object.assign(
        {},
        state,
        {
          count: state.count + action.payload.count
        }
      );
    default:
      return state;
  };
};

export default Reducer;

// ACTIONS
// ----------------------------------------------------------------------

export const CountIncrease = (value: number = 1): StateAction<ITestState> => ({
  type: Types.COUNT_INCREASE,
  payload: {
    count: (value < 0) ? value * -1 : value
  }
});

export const CountDecrease = (value: number = -1): StateAction<ITestState> => ({
  type: Types.COUNT_DECREASE,
  payload: {
    count: (value > 0) ? value * -1 : value
  }
});
