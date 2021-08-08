import {
  applyMiddleware,
  createStore,
  combineReducers
} from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { createWrapper } from "next-redux-wrapper";

/**
 * state
 * ----------------------------------------------------------------------
 * Fornece um store básico para Redux.
 *
 * @author    Fabio Y. Goto <lab@yuiti.dev>
 * @since     0.0.1
 */

// DUCKS
// ----------------------------------------------------------------------
import CounterReducer from "state/ducks/Counter";
import LoaderReducer from "state/ducks/Loader";

/**
 * Combina todos os reducers da store em um master.
 */
const Reducers = combineReducers({
  counter: CounterReducer,
  loader: LoaderReducer
});

/**
 * Agrupa todos os middlewares a serem aplicados.
 */
const middleware = [
  thunk
];

/**
 * Enhancer de store em modo de desenvolvimento, habilita o Redux Dev Tools.
 */
const composeEnhancers = composeWithDevTools({
  trace: true,
  traceLimit: 25
});

/**
 * Inicializa uma instância de store do Redux.
 *
 * @param initialState
 *     Estado inicial da store
 * @constructor
 */
export const InitializeStore = (initialState = {}) => {
  return createStore(
    Reducers,
    initialState,
    (process.env.NODE_ENV === "production")
      ? applyMiddleware(...middleware)
      : composeEnhancers(applyMiddleware(...middleware))
  );
};

/**
 * Inicializa um wrapper de Redux para uso com o Next.
 */
export const StoreWrapper = createWrapper(
  InitializeStore,
  {
    debug: false
  }
);
