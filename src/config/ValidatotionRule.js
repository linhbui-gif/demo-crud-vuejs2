import * as validators from "@/helper/validators";

const trigger = "blur";

export const email = {
  required: true,
  type: "string",
  pattern: "^[a-zA-Z0-9.!#$%&'*+\\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$",
  trigger,
  message: "Vui lòng nhập vào định dạng địa chỉ email。"
};

const validatePassword = (rule, value, callback) => {
  if (!validators.isPassowrd(value)) {
    callback(
      new Error(
        "Nhập kết hợp các bảng chữ cái (chữ hoa và chữ thường) và số từ 8 đến 16 ký tự。"
      )
    );
  } else {
    callback();
  }
};
export const passowrdRule = {
  required: true,
  trigger,
  validator: validatePassword
};

export const required = target => ({
  required: true,
  trigger,
  message: `${target}Vui lòng nhập。`
});

// プルダウン用必須チェック
export const requiredSelect = target => ({
  required: true,
  trigger: 'change',
  message: `${target}Vui lòng nhập。`
});

const validateTel = (rule, value, callback) => {
  if (!validators.isTel(value)) {
    callback(new Error("Vui lòng nhập ở định dạng số điện thoại."));
  } else {
    callback();
  }
};

export const tel = { required: false, trigger, validator: validateTel };

export const telWithoutDash = target => ({
  trigger,
  validator: (rule, value, callback) => {
    if (!validators.isNumericIgnoreWidth(value) || !validators.isExpectLength(value, { min: 10, max: 11 })) {
      callback(new Error(`${target}は数字10桁、もしくは11桁で入力してください。`));
    } else {
      callback();
    }
  }
});

export const mobileTelWithoutDash = target => ({
  trigger,
  validator: (rule, value, callback) => {
    if (!validators.isNumericIgnoreWidth(value) || !validators.isExpectLength(value, { min: 11, max: 11 })) {
      callback(new Error(`${target}は数字11桁で入力してください。`));
    } else {
      callback();
    }
  }
});

export const zipCode = target => ({
  trigger,
  validator: (rule, value, callback) => {
    if (!validators.isZipCode(value)) {
      callback(new Error(`${target}は数字7桁で入力してください。`));
    } else {
      callback();
    }
  }
});

const validateInteger = (rule, value, callback) => {
  if (!validators.isInteger(value)) {
    callback(new Error("数値で入力してください。"));
  } else {
    callback();
  }
};

export const integer = { required: false, trigger, validator: validateInteger };

// 文字列長範囲チェック
export const lengthRange = (target, { max = Infinity, min = 0 } = {}) => ({
  trigger,
  validator: (rule, value, callback) => {
    if (!validators.isExpectLength(value, { max, min })) {
      // max,minの指定有無に応じてエラー文言を出し分ける
      if (Number.isFinite(max) && min !== 0) {
        callback(new Error(`${target}は${min}文字以上${max}文字以下で入力してください。`));
      } else if (Number.isFinite(max) && min === 0) {
        callback(new Error(`${target}は${max}文字以下で入力してください。`));
      } else {
        callback(new Error(`${target}は${min}文字以上で入力してください。`));
      }
    } else {
      callback();
    }
  }
});

// 文字列長チェック
export const equalLength = (target, acceptedLength) => ({
  required: true,
  len: acceptedLength,
  trigger,
  message: `${target}は${acceptedLength}文字で入力してください。`
});

// 小数点を含む数値か
export const decimalNumber = (
  target,
  { numberLength = Infinity, decimalLength = Infinity } = {}
) => ({
  trigger,
  validator: (rule, value, callback) => {
    if (!validators.isDecimalNumberFormat(value, { numberLength, decimalLength })) {
      callback(
        new Error(
          `${target}は整数${numberLength}桁以内、小数点${decimalLength}桁以内の数値で入力してください。`
        )
      );
    } else {
      callback();
    }
  }
});

// ひらがな
export const kana = target => ({
  trigger,
  validator: (rule, value, callback) => {
    if (!validators.isKana(value)) {
      callback(new Error(`${target}はひらがなで入力してください。`));
    } else {
      callback();
    }
  }
});
// カタカナ（全半角無視）
export const katakana = target => ({
  trigger,
  validator: (rule, value, callback) => {
    if (!validators.isKataKana(value)) {
      callback(new Error(`${target}はカタカナで入力してください。`));
    } else {
      callback();
    }
  }
});
// 数字（全半角無視）
export const numericIgnoreWidth = target => ({
  trigger,
  validator: (rule, value, callback) => {
    if (!validators.isNumericIgnoreWidth(value)) {
      callback(new Error(`${target}は数字で入力してください。`));
    } else {
      callback();
    }
  }
})

// 英字(全半角無視) + 数字(全半角無視) + 半角記号
export const alphabetAndNumericAndMarks = target => ({
  trigger,
  validator: (rule, value, callback) => {
    if (!validators.isAlphabetAndNumericAndMarks(value)) {
      callback(new Error(`${target}は英数字、半角記号で入力してください。`));
    } else {
      callback();
    }
  }
})


