/**
 * 定数定義
 */
export default {
  MY_APP_PREFIX: "sample-vue-app",

  DEFAULT_ROWS: "10",
  LOG_RETRY_MAX: 5, // アクセスログ保存のリトライ上限

  REDIRECT_URL: "redirectUrl",

  COOKIE_ID: "sid=",
  FUNCTION_ID: "fid=",

  SEPARATOR: ", ",

  ERROR_PATH: ["systemError", "sessionTimeOut", "badRequest"], // エラーのパスリスト

  ISO_DATE_FORMAT: "yyyy-MM-dd",
  ISO_DATETIME_FORMAT: "yyyy-MM-ddTHH:mm:ss",
  ISO_TIME_FORMAT: "HH:mm:ss",

  LOCAL_HOST: "localhost:8080",

  PREFECTURES_LIST: [
    { key: "北海道", value: "北海道", displayOrder: 1 },
    { key: "青森県", value: "青森県", displayOrder: 2 },
    { key: "岩手県", value: "岩手県", displayOrder: 3 },
    { key: "宮城県", value: "宮城県", displayOrder: 4 },
    { key: "秋田県", value: "秋田県", displayOrder: 5 },
    { key: "山形県", value: "山形県", displayOrder: 6 },
    { key: "福島県", value: "福島県", displayOrder: 7 },
    { key: "茨城県", value: "茨城県", displayOrder: 8 },
    { key: "栃木県", value: "栃木県", displayOrder: 9 },
    { key: "群馬県", value: "群馬県", displayOrder: 10 },
    { key: "埼玉県", value: "埼玉県", displayOrder: 11 },
    { key: "千葉県", value: "千葉県", displayOrder: 12 },
    { key: "東京都", value: "東京都", displayOrder: 13 },
    { key: "神奈川県", value: "神奈川県", displayOrder: 14 },
    { key: "新潟県", value: "新潟県", displayOrder: 15 },
    { key: "富山県", value: "富山県", displayOrder: 16 },
    { key: "石川県", value: "石川県", displayOrder: 17 },
    { key: "福井県", value: "福井県", displayOrder: 18 },
    { key: "山梨県", value: "山梨県", displayOrder: 19 },
    { key: "長野県", value: "長野県", displayOrder: 20 },
    { key: "岐阜県", value: "岐阜県", displayOrder: 21 },
    { key: "静岡県", value: "静岡県", displayOrder: 22 },
    { key: "愛知県", value: "愛知県", displayOrder: 23 },
    { key: "三重県", value: "三重県", displayOrder: 24 },
    { key: "滋賀県", value: "滋賀県", displayOrder: 25 },
    { key: "京都府", value: "京都府", displayOrder: 26 },
    { key: "大阪府", value: "大阪府", displayOrder: 27 },
    { key: "兵庫県", value: "兵庫県", displayOrder: 28 },
    { key: "奈良県", value: "奈良県", displayOrder: 29 },
    { key: "和歌山県", value: "和歌山県", displayOrder: 30 },
    { key: "鳥取県", value: "鳥取県", displayOrder: 31 },
    { key: "島根県", value: "島根県", displayOrder: 32 },
    { key: "岡山県", value: "岡山県", displayOrder: 33 },
    { key: "広島県", value: "広島県", displayOrder: 34 },
    { key: "山口県", value: "山口県", displayOrder: 35 },
    { key: "徳島県", value: "徳島県", displayOrder: 36 },
    { key: "香川県", value: "香川県", displayOrder: 37 },
    { key: "愛媛県", value: "愛媛県", displayOrder: 38 },
    { key: "高知県", value: "高知県", displayOrder: 39 },
    { key: "福岡県", value: "福岡県", displayOrder: 40 },
    { key: "佐賀県", value: "佐賀県", displayOrder: 41 },
    { key: "長崎県", value: "長崎県", displayOrder: 42 },
    { key: "熊本県", value: "熊本県", displayOrder: 43 },
    { key: "大分県", value: "大分県", displayOrder: 44 },
    { key: "宮崎県", value: "宮崎県", displayOrder: 45 },
    { key: "鹿児島県", value: "鹿児島県", displayOrder: 46 },
    { key: "沖縄県", value: "沖縄県", displayOrder: 47 }
  ],

  URL: {
    LOGIN_PATH: "/login",
    LOGOUT_PATH: "/logout",
    SYSERR_PATH: "/systemError",
    SESSION_TIMEOUT_PATH: "/sessionTimeOut",
    BAD_REQUEST_PATH: "/badRequest",
    ADMIN_PATH: "/admin",
  },

  ROLE: {
    ALL: "all", // 全てのロールに許可する
    ADMIN: "system_admin", // rexev
    CARSHARE_CORP: "carshare_corp", // カーシェア事業者
    CARSHARE_USE_CORP: "carshare_use_corp", // カーシェア利用法人
    CLEANING_CORP: "cleaning_corp", // 清掃会社
    MAINTENANCE_CORP: "maintenance_corp", // メンテナンス会社
    ENERGY_MANAGEMENT_CORP: "energy_management_corp" // エネマネ事業者
  },

  COGNITO: {
    ATTRIBUTE_ACTIVATE: "custom:activate"
  }
};
