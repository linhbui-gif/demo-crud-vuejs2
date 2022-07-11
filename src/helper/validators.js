import is from "is_js";
import moment from "moment";

export const isEmpty = value =>
  value === "" || value === [] || is.null(value) || is.undefined(value);
export const isNotEmpty = value => !isEmpty(value);
export const isEmptyObject = obj =>
  isEmpty(obj) || ( is.object(obj) && Object.keys(obj).length === 0 );

export const isEmail = value => is.email(value);

export const isTel = value => {
  if (isEmpty(value)) {
    return true;
  }
  if (String(value).length === 0) {
    return true;
  }
  const tel = value.replace(/[━.*‐.*―.*－.*\-.*ー.*-]/gi, "");
  const result = tel.match(/^(0[5-9]0[0-9]{8}|0[1-9][1-9][0-9]{7})$/);
  return is.not.null(result);
};

export const isPassowrd = value => {
  if (String(value).length === 0) {
    return false;
  }
  const result = value.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$/);
  return is.not.null(result);
};

export const isZipCode = value => {
  if (isEmpty(value)) {
    return true;
  }

  const reg = new RegExp(/^([0-9０-９]{7})$/);
  return reg.test(value);
}

export const isExpectLength = (value, { max = Infinity, min = 0 } = {}) => {
  if (isEmpty(value)) {
    return true;
  }
  const str = String(value);
  if (str.length > max) {
    return false;
  }
  if (str.length < min) {
    return false;
  }
  return true;
};

export const isInteger = value => {
  const num = Number(value);
  return is.integer(num) && num >= -2147483648 && num <= 2147483647;
};

export const isFlag = value => ["0", "1"].includes(value);

export const isDate = value => {
  if (isEmpty(value)) {
    return true;
  }
  return moment(value).isValid();
};

export const isBirthDay = value => {
  if (isEmpty(value)) {
    return true;
  }
  /* dateTimePickerで選択された日付を正しく評価するためにformat()でmoment()をフォーマット */
  /* Config.jsに定義されているISO_DATE_FORMAT（"yyyy-MM-dd"）では正しくフォーマットできないため"YYYY-MM-DD"でフォーマット */
  return moment(value).isBefore(moment().format("YYYY-MM-DD"));
};

// 小数点を含む数値を判定する
export const isDecimalNumberFormat = (
  value,
  { numberLength = Infinity, decimalLength = Infinity } = {}) => {
  const tmp = value.toString().split('.');
  const integer = tmp[0];
  const decimal = tmp[1];
  // 整数部・小数点部のチェック
  if (
    !integer ||
    integer.toString().length > Number(numberLength) ||
    (decimal && decimal.toString().length > Number(decimalLength))
  ) {
    return false;
  }
  // 0-9のみOK
  if (
    value
      .toString()
      .replace(".", "")
      .match(/[^0-9]+/)
  ) {
    return false;
  }
  return true;
};

// ひらがな
export const isKana = value => {
  if (isEmpty(value)) {
    return true;
  }
  const reg = new RegExp(/^[ぁ-ん]*$/);
  return reg.test(value);
};
// カタカナ（全半角無視）
export const isKataKana = value => {
  if (isEmpty(value)) {
    return true;
  }
  const reg = new RegExp(/^[ァ-ヶｦ-ﾟー]*$/);
  return reg.test(value);
};
// 数字（全半角無視）
export const isNumericIgnoreWidth = value => {
  if (isEmpty(value)) {
    return true;
  }
  const reg = new RegExp(/^[0-9０-９]*$/);
  return reg.test(value);
};

// 英字(全半角無視) + 数字(全半角無視) + 半角記号
export const isAlphabetAndNumericAndMarks = value => {
  if (isEmpty(value)) {
    return true;
  }
  const reg = new RegExp(/^[a-zA-Zａ-ｚＡ-Ｚ0-9０-９!-/:-@¥[-`{-~]*$/);
  return reg.test(value);
};
