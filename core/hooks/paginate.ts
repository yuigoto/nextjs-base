import { useEffect, useState } from "react";
import { Couple } from "core/types";

/**
 * core/hooks/Paginate
 * ----------------------------------------------------------------------
 * Hook para componente de paginação.
 *
 * @author    Fabio Y. Goto <lab@yuiti.dev>
 * @since     0.0.1
 */

/**
 * Define o que é necessário para que sejam calculadas as páginas.
 */
interface IPaginate {
  /**
   * Primeira página.
   */
  first: number;

  /**
   * Página anterior.
   */
  prev: number;

  /**
   * Próxima página.
   */
  next: number;

  /**
   * Última página.
   */
  last: number;

  /**
   * Retorna um range de páginas para paginação numerada.
   *
   * @param range
   *     Range para mais e para menos da página atual
   */
  getRange: (range: number) => Couple<number, number>;
}

/**
 * Hook usado para cálculo de páginas.
 *
 * @param page
 *     Página atual
 * @param totalPages
 *     Total de páginas
 * @constructor
 */
export const usePaginate = (page: number, totalPages: number): IPaginate => {
  // Status inicial das páginas
  const [ first, setFirst ] = useState(-1);
  const [ prev, setPrev ] = useState(-1);
  const [ next, setNext ] = useState(-1);
  const [ last, setLast ] = useState(-1);

  /**
   * Responsável pelo cálculo das páginas.
   */
  const setPage = () => {
    setFirst((page > 1) ? 1 : -1);
    setPrev((page > 1) ? page - 1 : -1);
    setNext((page < totalPages) ? page + 1 : -1);
    setLast((page < totalPages) ? totalPages : -1);
  };

  /**
   * Retorna um range de números para exibição de paginação numerada.
   *
   * @param range
   *     Range para mais e para menos, considere sempre página atual + 2x range
   */
  const getRange = (range = 2): Couple<number, number> => {
    let initial = 1;
    let final = (range * 2) + 1;

    if (totalPages > final) {
      if (page >= totalPages - 1) {
        initial = totalPages - (range * 2);
        final = totalPages;
      } else if (page > 2) {
        initial = page - range;
        final = page + range;
      }
    } else {
      final = Math.min(totalPages, final);
    }
    
    return [ initial, final ];
  };

  // Inicializa state
  useEffect(() => {
    setPage();
  }, [ page ]);

  return {
    first,
    prev,
    next,
    last,
    getRange
  };
};
