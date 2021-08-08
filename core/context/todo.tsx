import React, { createContext, useContext, useReducer } from "react";
import { ContextDispatcher, ContextReducer, HashMap } from "core/types";

/**
 * core/context/todo
 * ----------------------------------------------------------------------
 * Providers e consumers para um contexto de to-do list.
 *
 * Exemplo de consumers, dispatchers e providers, com um reducer mínimo,
 * para state management simples, sem Redux.
 *
 * @author    Fabio Y. Goto <lab@yuiti.dev>
 * @since     0.0.1
 */

/**
 * Contexto para consumo de state.
 */
const TodoState = createContext(null);

/**
 * Contexto para despacho de actions ao state.
 */
const TodoDispatch = createContext(null);

// TYPINGS
// ----------------------------------------------------------------------

/**
 * Descreve o estado para o contexto atual.
 */
type StateItem = HashMap<any> & {
  id: string|number,
  date: number,
  value: string
};

// REDUCER
// ----------------------------------------------------------------------

/**
 * Função redutora para o context.
 *
 * @param state
 *     Estado exclusivo do contexto
 * @param action
 *     Objeto com a ação e payload da mesma
 * @constructor
 */
const TodoContextReducer: ContextReducer<StateItem[]> = (state, action) => {
  switch (action.type) {
    case "TODO_ADD":
      return [ ...state, action.payload ];
    case "TODO_REMOVE":
      let _clone = [ ...state ];
      _clone.splice(action.payload, 1);
      return _clone;
    case "TODO_CLEAR":
      return [];
    default:
      return state;
  }
};

// PROVIDER
// ----------------------------------------------------------------------

/**
 * Wrapper de contexto, torna possível fornecer o state do contexto à qualquer
 * filho.
 *
 * @param children
 *     Componentes filho autorizados a receberem informações do contexto
 * @constructor
 */
const TodoProvider = ({ children }) => {
  const [ state, dispatch ] = useReducer(TodoContextReducer, []);

  return (
    <TodoState.Provider value={state}>
      <TodoDispatch.Provider value={dispatch}>
        {children}
      </TodoDispatch.Provider>
    </TodoState.Provider>
  );
};

// CONSUMERS
// ----------------------------------------------------------------------

/**
 * Componente que fornece informações do contexto para `children`, para ser
 * usado em caso de componentes do tipo classe.
 *
 * É importante que você passe uma `render prop` como children, vistp que
 * precisa ser uma função.
 *
 * @param children
 *     Componentes filho que receberão informações do contexto como props
 * @constructor
 */
const TodoConsumer = ({ children }) => {
  return (
    <TodoState.Consumer>
      {context => {
        if (undefined === context) {
          throw new Error(`[TodoContext] Precisa ser usado dentro de um provider.`);
        }

        return children(context);
      }}
    </TodoState.Consumer>
  );
};

/**
 * Permite que componentes funcionais obtenham acesso ao state do context.
 */
const useTodoContext = () => {
  const context = useContext(TodoState);
  if (context === undefined) {
    throw new Error(`[useTodoContext] Precisa ser usado dentro de um provider.`);
  }
  return context;
};

/**
 * Permite que componentes funcionais obtenham acesso ao dispatcher do context.
 */
const useTodoDispatch = (): ContextDispatcher => {
  const context = useContext(TodoDispatch);
  if (context === undefined) {
    throw new Error(`[useTodoDispatch] Precisa ser usado dentro de um provider.`);
  }
  return (context as ContextDispatcher);
};

export {
  TodoProvider,
  TodoConsumer,
  useTodoContext,
  useTodoDispatch
};
