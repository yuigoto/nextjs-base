import { BaseProps, HashMap } from "core/types";
import { usePaginate } from "core/hooks/paginate";
import { classnames } from "core/utils";
import { PaginationButton } from "components/widgets/pagination/PaginationButton";

import Styles from "components/widgets/pagination/Pagination.module.scss";

interface IPagination extends BaseProps {
  /**
   * Página atual.
   */
  page?: number;

  /**
   * Total de páginas.
   */
  totalPages?: number;

  /**
   * URL para navegação e substituição.
   *
   * Ex.:
   * - `/blog/page/` resultará em `/blog/page/1`
   */
  path?: string;

  /**
   * Caso deseje que a primeira página seja diferente, forneça este parâmetro.
   */
  firstPagePath?: string;

  /**
   * Caso deseje uma classe custom para botões.
   */
  buttonClass?: string;

  /**
   * Caso deseje uma classe custom para botões desativados.
   */
  buttonDisabledClass?: string;

  /**
   * Classe para botões numéricos.
   */
  numberClass?: string;

  /**
   * Classe para botões numéricos ativos.
   */
  numberActiveClass?: string;

  /**
   * Ativa/desativa paginação numérica.
   */
  numeric?: boolean;

  /**
   * Texto link primeira página.
   */
  firstText?: string;

  /**
   * Texto link página anterior.
   */
  prevText?: string;

  /**
   * Texto link próxima página.
   */
  nextText?: string;

  /**
   * Texto link última página.
   */
  lastText?: string;
}

export const Pagination = ({
  id,
  className,
  page,
  totalPages,
  path,
  firstPagePath,
  buttonClass,
  buttonDisabledClass,
  numberClass,
  numberActiveClass,
  numeric,
  firstText,
  prevText,
  nextText,
  lastText
}: IPagination) => {
  const {
    first,
    prev,
    next,
    last,
    getRange
  } = usePaginate(page, totalPages);

  let _path = path.trim();
  if (!/^\//.test(_path)) _path = `/${_path}`;
  if (!/\/$/.test(_path)) _path = `${_path}/`;

  const _attr: HashMap<any> = {};
  if (id) _attr.id = id;
  if (className) _attr.className = classnames(className);

  return (
    <nav {..._attr}>
      <PaginationButton
        href={firstPagePath || _path + first}
        className={{
          [buttonClass]: true,
          [buttonDisabledClass]: first < 1
        }}
        active={first > 0}>
        {firstText}
      </PaginationButton>
      <PaginationButton
        href={(prev === 1) ? (firstPagePath || _path + prev) : _path + prev}
        className={{
          [buttonClass]: true,
          [buttonDisabledClass]: prev < 1
        }}
        active={prev > 0}>
        {prevText}
      </PaginationButton>
      {numeric && (() => {
        const [ initial, final ] = getRange(2);
        const navigation: any = [];

        for (let i = initial; i <= final; i++) {
          let href = (firstPagePath && i === 1)
            ? firstPagePath
            : _path + i;

          navigation.push(
            <PaginationButton
              key={i}
              href={href}
              className={{
                [numberClass]: true,
                [numberActiveClass]: i === page
              }}
              active={i !== page}>
              {i.toString()}
            </PaginationButton>
          );
        }

        return navigation;
      })()}
      <PaginationButton
        href={_path + next}
        className={{
          [buttonClass]: true,
          [buttonDisabledClass]: next < 1
        }}
        active={next > 0}>
        {nextText}
      </PaginationButton>
      <PaginationButton
        href={_path + last}
        className={{
          [buttonClass]: true,
          [buttonDisabledClass]: last < 1
        }}
        active={last > 0}>
        {lastText}
      </PaginationButton>
    </nav>
  );
};

Pagination.defaultProps = {
  page: 1,
  totalPages: 1,
  path: "/",
  firstPagePath: null,
  className: Styles["pagination"],
  buttonClass: Styles["item"],
  buttonDisabledClass: Styles["disabled"],
  numberClass: Styles["number"],
  numberActiveClass: Styles["active"],
  numeric: false,
  firstText: <>&laquo;</>,
  prevText: <>&lsaquo;</>,
  nextText: <>&rsaquo;</>,
  lastText: <>&raquo;</>
};
