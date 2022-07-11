import _ from "lodash";
import is from "is_js";
import * as validators from "@/helpers/validators";

/*
 * {key1:'val1', key2: 'val2'}, ['key1','replase1'] => {replace1: 'val1'}
 * {key1:'val1', key2: 'val2'}, ['key1','replase1'], ['key2','replase2']
 *          => {replace1:'val1', replace2:'val2'}
 */
export const convertKeys = (obj, ...targets) =>
  Object.entries(obj)
    .filter(([name]) => targets.map(target => target[0]).includes(name))
    .reduce(
      (o, [name, val]) => ({
        ...o,
        [_.head(targets.filter(target => target[0] === name))[1]]: val
      }),
      {}
    );

export const notNullValue = obj =>
  Object.entries(obj)
    .filter(([, val]) => validators.isNotEmpty(val)) // 空文字を除去
    .reduce((o, [name, val]) => ({ ...o, [name]: val }), {});

export const convertValueToString = obj =>
  Object.entries(obj)
    .map(([name, val]) => {
      if (validators.isNotEmpty(val) && is.number(val)) {
        // NumberをStirngに変換して返却
        return [name, String(val)];
      }
      return [name, val];
    })
    .reduce((o, [name, val]) => ({ ...o, [name]: val }), {});
