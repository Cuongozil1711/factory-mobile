import {API_URL} from 'babel-dotenv';
// export const API_URL_DEV = 'http://192.168.1.3:8080/';
// export const API_URL_DEV = 'http://192.168.15.198:8080/';
// export const API_URL_DEV = 'http://192.168.1.133:8080/';
// export const API_URL_DEV = 'http://172.16.32.143:8080/';
export const API_URL_DEV = 'http://103.159.51.154/manager_service';
// export const API_URL_DEV = 'http://cuong.nsmp-system.com/';

export const APP_MODE = {
  API_URL_COMPANY: 'http://172.16.32.143:8080/',
  API_URL_DEV: API_URL_DEV,
  API_URL_1: 'http://192.168.0.12:8080/',
  API_URL_2: 'http://192.168.1.3:8080/',
  API_URL_3: 'http://192.168.1.5:8080/',
};

export const VERSION_APP = 'V_Test: 2022.10.06.001';
export const RELEASE = true;
// https://codesandbox.io/s/yjdwp?file=/src/features/todoSlice.js
// hệ thống dùng redux toolkit
export const API_LOGIN = '/user/login';
export const GET_BY_USER = '/user/getByUser';
export const GET_ITEM = '/items/search?page=0&&size=1000&&search=';
export const GET_STALLS = '/stalls/search';
export const GET_PUBLISHER = '/publisher/search';
export const GET_CATEGORY = '/category/search';
export const GET_DETAILS_ITEM = '/items';
export const GET_DETAILS_ITEM_SCANNER = '/items/getByImport';
export const UPDATE_PRICE_ITEM = '/items';
export const GET_ORDER = '/order/searchState';
export const GET_ORDER_DETAILS = '/order';
export const GET_ORDER_CUSTOMER = '/order/customer';
export const GET_ORDER_EMPLOYEE = '/order/employee';
export const GET_CUSTOMER = '/customer/search';
export const GET_STATISTICAL = '/statisticalApi';
export const GET_COUNT_ORDER = '/order/getCountOrder';
export const GET_LIST_TOP_ORDER = '/export-ware-house/getListOrder';
export const GET_IMPORT_WARE_HOUSE = '/import-ware-house/list';
export const IMPORT_WARE_HOUSE = '/import-ware-house/get';
export const POST_IMPORT_WARE_HOUSE = '/import-ware-house/list';
export const API_CHECK_IMPORT = '/import-ware-house/prepare';
export const API_IMPORT_QUICKLY = '/import-ware-house/quickly';
export const POST_EXPORT_WARE_HOUSE = '/export-ware-house/list';
export const GET_EXPORT_WARE_HOUSE = '/export-ware-house/list';
export const GET_DETAIL_IMPORT_WARE_HOUSE = '/import-ware-house';
export const GET_DETAIL_EXPORT_WARE_HOUSE = '/export-ware-house';
export const GET_RECEIPT_IMPORT_WARE_HOUSE = '/receipt-import/search';
export const RECEIPT_IMPORT_WARE_HOUSE = '/receipt-import';
export const GET_RECEIPT_EXPORT_WARE_HOUSE = '/receipt-export/search';
export const RECEIPT_EXPORT_WARE_HOUSE = '/receipt-export';
export const GET_WARE_HOUSE = '/wareHouse/search';
export const GET_WARE_HOUSE_ALL = '/wareHouse/searchAll';
export const PROMOTION = '/promotion';
export const CUSTOMER = '/customer';
export const EMPLOYEE = '/user/employee';
export const ADDRESS = '/address';
export const SUPPLIER = '/supplier/search';
export const COMPANY = '/company/search';
export const UPLOAD_IMAGE = '/upload/image';
