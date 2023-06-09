import { isDate } from "lodash";

declare global {
  interface JSON {
    parse(text: string, reviver?: (this: any, key: string, value: any) => any, automaticallyConvertDates?: boolean): any;
  }
}
// remember the original parse method.
const originalParse = JSON.parse;
/**
 * JSON.parse transformer method to convert dates from strings into objects when detected.
 * @param {string} key
 * @param value
 */
const dateParser = (key: string, value: any) => {
  if (typeof value === "string") {
    const reISO = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}\.\d*)(?:Z|([+-])([\d|:]*))?$/;
    const reMsAjax = /^\/Date\((d|-|.*)\)[/|\\]$/;

    try {
      const isPossibleDate = reISO.exec(value);
      if (isPossibleDate) {
        const result = new Date(value);
        if (isDate(result)) return result;
      }
      const isPossibleMSAjaxDate = reMsAjax.exec(value);
      if (isPossibleMSAjaxDate) {
        const MSAjaxDate = isPossibleMSAjaxDate[1].split(/[-+,.]/);
        const result = new Date(MSAjaxDate[0] ? +MSAjaxDate[0] : 0 - +MSAjaxDate[1]);
        if (isDate(result)) return result;
      }
    } catch (err) {
      // if there was an error, then it's not a date.
    }
  }
  return value;
};

JSON.parse = (text: string, reviver?: (this: any, key: string, value: any) => any, automaticallyConvertDates?: boolean) => {
  if (automaticallyConvertDates === true) {
    return originalParse(text, (key: string, value: any) => {
      value = dateParser(key, value);
      if (reviver) value = reviver(key, value);
      return value;
    });
  } else {
    return originalParse(text, reviver);
  }
};

export {};
