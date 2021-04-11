import { capitalize, pad } from "core/utils";
import { FunctionComponent } from "react";
import { BaseProps } from "core/types";

interface IDateTime extends BaseProps {
  /**
   * String de data válida ou objeto `Date`.
   */
  date: string|Date;

  /**
   * Formato de data desejado.
   */
  format?: "iso"|"utc"|"long"|"short"|"short-time"|"time"|null|undefined;
}

/**
 * components/atoms/basic/DateTime
 * ----------------------------------------------------------------------
 * Componente para renderização simples de datas em formato human-readable.
 */
export const DateTime: FunctionComponent<IDateTime> = ({
  date,
  format
}) => {
  let _date = (date instanceof Date) ? date : new Date(date);

  if (!_date) return null;

  let day = pad(_date.getDate(), 2, "0");
  let month = pad(_date.getMonth() + 1, 2, "0");
  let year = pad(_date.getFullYear(), 4, "0");
  let monthName = _date.toLocaleDateString("pt-BR", {
    month: "long"
  });
  let hour = pad(_date.getHours(), 2, "0");
  let minute = pad(_date.getMinutes(), 2, "0");

  let _datetime;

  switch (format) {
    case "iso":
      _datetime = _date.toISOString();
      break;
    case "utc":
      _datetime = _date.toUTCString();
      break;
    case "long":
      _datetime = `${day} de ${capitalize(monthName)} de ${year}`;
      break;
    case "short":
      _datetime = `${day}/${month}/${year}`;
      break;
    case "short-time":
      _datetime = `${day}/${month}/${year} - ${hour}:${minute}`;
      break;
    case "time":
      _datetime = `${hour}:${minute}`;
      break;
    default:
      _datetime = `${day} de ${capitalize(monthName)} de ${year} às ${hour}:${minute}`;
      break;
  }

  return <>{_datetime}</>
};

DateTime.defaultProps = {
  format: null
};
