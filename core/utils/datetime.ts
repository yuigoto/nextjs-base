import { DateFormats } from "core/types";
import { capitalize, pad } from "core/utils/index";

/**
 * Renderiza uma data, de acordo com o formato desejado.
 *
 * @param date
 *     String contendo uma data válida ou uma instância de `Date`
 * @param format
 *     Formato de data desejado
 */
export const renderDate = (
  date: string|Date,
  format?: DateFormats
): string => {
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

  return _datetime;
};
