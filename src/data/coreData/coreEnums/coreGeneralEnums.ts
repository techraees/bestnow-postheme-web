interface EnumModel {
  NAME: string;
  MODEL_NAME: string;
  FIELD_NAME: string;
}

interface BlankCashName {
  fldName: string;
}

interface Month {
  id: number;
  name: string;
}

// Allowed Enums
export const ALLOWED_ENUMS = Object.freeze({
  PROVINCE: "province",
  DISTRICT: "district",
  SALE_PERSON: "sale_person",
  COURIER_MODE: "courier_mode",
  CITIES: "cities",
});

// Allowed Enums With Model Name
export const ALLOWED_ENUMS_WITH_MODEL_NAME: Record<string, EnumModel> =
  Object.freeze({
    [ALLOWED_ENUMS.PROVINCE]: {
      NAME: "province",
      MODEL_NAME: "tblprovince",
      FIELD_NAME: "fldName",
    },
    [ALLOWED_ENUMS.DISTRICT]: {
      NAME: "district",
      MODEL_NAME: "tbldistrict",
      FIELD_NAME: "fldName",
    },
    [ALLOWED_ENUMS.SALE_PERSON]: {
      NAME: "sale_person",
      MODEL_NAME: "users",
      FIELD_NAME: "UserName",
    },
    [ALLOWED_ENUMS.COURIER_MODE]: {
      NAME: "courier_mode",
      MODEL_NAME: "tblcourier",
      FIELD_NAME: "fldName",
    },
    [ALLOWED_ENUMS.CITIES]: {
      NAME: "cities",
      MODEL_NAME: "tblcity",
      FIELD_NAME: "fldName",
    },
  });

// Theme Enums
export const THEME_DATA = Object.freeze({
  KEY: "theme",
  LIGHT: "light",
  DARK: "dark",
});

// Blank/Cash Name
export const BLANK_CASH_NAMES: BlankCashName[] = [
  {
    fldName: "CUSTOMER",
  },
];

// Used to Define the errors for admin auth
export const REFRESH_TOKEN_ERROR = Object.freeze({
  EXPIRED_TOKEN: "Expired Refresh Token",
});

// Used to define error while getting the profile
export const GETTING_PROFILE_ERRORS = Object.freeze({
  UNAUTHORIZED: "UNAUTHORIZED",
  FORBIDDEN: "FORBIDDEN",
});

// Used to get Allowed Query Params for Products
export const ALLOWED_QUERY_PARAMS_PRODUCTS: string[] = [
  "q",
  "fldCategory1",
  "fldMaker1",
  "fldSalRate.gte",
  "fldSalRate.lte",
  "page",
  "limit",
];
export const ALLOWED_QUERY_PARAMS_PRODUCTS_HOME_PAGE: string[] = [
  "fldCategory1",
  "fldMaker1",
  "fldSalRate.gte",
  "fldSalRate.lte",
];

// Used to Define Allowed key presses
export const ALLOWED_KEYDOWN_KEYS = Object.freeze({
  TAB: "Tab",
  DELETE: "Delete",
  // BACKSPACE: "Backspace",
  ESCAPE: "Escape",
  ARROWRIGHT: "ArrowRight",
  ENTER: "Enter",
});

// Used to check whether it is showing price alert or not
export const ALLOWED_LOCATIONS_PRICE_ALERT = Object.freeze({
  HOME: "/",
  SEARCH: "/search",
});

// Common Table Data
export const COMMON_TABLE_DATA = Object.freeze({
  LIMIT: 10,
});

// Pre order Status
export const PRE_ORDERS_STATUS = Object.freeze({
  PENDING: "IN-PROCESS",
  CONFIRMED: "CONFIRMED",
  CANCELED: "CANCELED",
});

// Pre order Status
export const PRE_ORDERS_STATUS_SHOWING_STATUS = Object.freeze({
  PENDING: "Pending",
  CONFIRMED: "Accepted",
  CANCELED: "Rejected",
});

// Order Confirmed Status
export const ORDER_CONFIRMED_STATUS = Object.freeze({
  PENDING: "PENDING",
  DISPATCHED: "DISPATCHED",
  "IN-PROCESS": "IN-PROCESS",
  CANCELED: "CANCELED",
});

// Login Token Cookies Name
export const COOKIES_LOGIN_TOKENS = Object.freeze({
  ACCESS_TOKEN: "access_token",
  REFRESH_TOKEN: "refresh_token",
});

export const ALLOWED_SIGNUP_REFERAL_USERS_ROLES = Object.freeze({
  SUPERVISOR: "Supervisor",
  REFERRER: "Referrer",
});

export const ALLOWED_SIGNUP_CONTACT_NUMBER_TYPE = Object.freeze({
  NEW_ACCOUNT: "new_account",
  COMPLAINT: "complaint",
});

export const ALL_MONTHS_NAMES: Month[] = [
  { id: 1, name: "January" },
  { id: 2, name: "February" },
  { id: 3, name: "March" },
  { id: 4, name: "April" },
  { id: 5, name: "May" },
  { id: 6, name: "June" },
  { id: 7, name: "July" },
  { id: 8, name: "August" },
  { id: 9, name: "September" },
  { id: 10, name: "October" },
  { id: 11, name: "November" },
  { id: 12, name: "December" },
];

export const DAYS_IN_MONTH = Object.freeze({
  JANUARY: 31,
  FEBRUARY: 28,
  MARCH: 31,
  APRIL: 30,
  MAY: 31,
  JUNE: 30,
  JULY: 31,
  AUGUST: 31,
  SEPTEMBER: 30,
  OCTOBER: 31,
  NOVEMBER: 30,
  DECEMBER: 31,
});

export const ALLOWED_SORTING_PROPERTIES_OF_SIGNUP_REFERRERS_USER: Record<
  string,
  string
> = {
  "Referal Code": "assigned_referal_code",
  "Full Name": "full_name",
  "R.#": "id",
  CNIC: "CNIC",
  "Phone Number": "active_phone_number",
  "Email Address": "active_email_address",
  District: "district",
  Province: "province",
  Address: "address",
  "C. Date": "createdAt",
  "C. Time": "createdAt",
  "Created By": "created_by",
  Block: "is_blocked",
  Verified: "is_verified",
};

export const ALLOWED_SORTING_PROPERTIES_OF_CUSTOMERS_USER: Record<
  string,
  string
> = {
  "C.ID": "RecordNo",
  Username: "fldUsername",
  Password: "fldPass",
  "Customer Name": "fldName",
  City: "fldCity",
  "Created By": "referral_source_id",
  "C.Date": "fldEntryDate",
  "C.Time": "fldEntryDate",
  Address: "fldAddress",
  Contact: "fldTel",
};

// Journels Ledgers
export const ALLOWED_SORTING_PROPERTIES_OF_JOURNELS_LEDGERS_DATA: Record<
  string,
  string
> = {
  ID: "RecordNo",
  "Inv. #": "fldNo",
  Type: "fldType",
  fldDate: "fldDate",
  "Debit From": "fldDebit",
  "Credit To": "fldCredit",
  Details: "fldDetails",
  Amount: "fldAmount",
  "Confirmed By": "fldUser",
  "C.Date": "fldEntryDate",
  "C.Time": "fldEntryDate",
  Discount: "fldDiscount",
  "Created By": "fldCreated",
  fldInvNo: "fldInvNo",
  fldInvType: "fldInvType",
  fldRP: "fldRP",
  chkVoc: "chkVoc",
  fldCourier: "fldCourier",
  fldQty: "fldQty",
  fldRate: "fldRate",
  Mode: "fldMode",
};

export const ALLOWED_WEB_USER = Object.freeze({
  WEB_USER: "web_users",
  TBLCHART: "customers",
});

export const ALLOWED_USER_TYPES = Object.freeze({
  WEB_USER: "web_users",
  TBLCHART: "customers",
});

export const ALLOWED_MESSAGE_TYPE_FOR_CHAT_MESSAGES = Object.freeze({
  TEXT: "text",
  IMAGE: "image",
  VIDEO: "video",
  AUDIO: "audio",
  FILE: "file",
  CALL_LOG: "call_log",
});

export const ALLOWED_MESSAGE_DELIVERY_STATUS = Object.freeze({
  UNSENT: "unsent",
  FAILED: "failed",
  SENT: "sent",
  DELIVERED: "delivered",
  READ: "read",
});

export const ALLOWED_CALL_LOGS_CALL_STATUS = Object.freeze({
  MISSED: "missed",
  COMPLETED: "completed",
  REJECTED: "rejected",
});

export const ALLOWED_COMMUNITY_SYSTEM_USER_PERMISSIONS_POST = Object.freeze({
  CANNOT_SAVE_POST: "cannot_save_post",
  CANNOT_SHARE_POST: "cannot_share_post",
  CANNOT_LIKE_POST: "cannot_like_post",
  CANNOT_COMMENT_POST: "cannot_comment_post",
});

export const ALLOWED_COMMUNITY_SYSTEM_USER_PERMISSIONS_STATUS = Object.freeze({
  CANNOT_LIKE_STATUS: "cannot_like_status",
  CANNOT_COMMENT_STATUS: "cannot_comment_status",
});

export const ALLOWED_FILE_UPLOAD_MIME_TYPES: string[] = [
  // Images
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
  "image/bmp",
  "image/tiff",

  // Videos
  "video/mp4",
  "video/webm",
  "video/x-msvideo",
  "video/quicktime",
  "video/mpeg",

  // Audio
  "audio/mpeg",
  "audio/wav",
  "audio/webm",
  "audio/ogg",
  "audio/aac",

  // Documents
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",

  // Text
  "text/plain",
  "text/csv",
  "application/json",
  "application/xml",

  // Code
  "text/html",
  "text/javascript",
  "text/css",
  "application/x-sh",
  "application/x-python",
  "application/x-httpd-php",

  // Archives
  "application/zip",
  "application/x-rar-compressed",
  "application/x-7z-compressed",
  "application/x-tar",
  "application/gzip",
];

// Stock Product Card Labels
export const STOCK_PRODUCT_CARD_LABEL = Object.freeze({
  COMING_SOON: {
    LABEL: "COMING SOON",
    COLOR: "bg-yellow-500",
  },
  OUT_OF_STOCK: {
    LABEL: "OUT OF STOCK",
    COLOR: "bg-red-500",
  },
  IN_STOCK: {
    LABEL: "IN STOCK",
    COLOR: "bg-green-500",
  },
});
