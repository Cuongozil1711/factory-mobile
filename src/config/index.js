export const CODE_DEFAULT = -200;
export const CODE_SUCCESS = 200;
export const ERROR_NETWORK_CODE = -100;
export const RESULT_CODE_PUSH_OUT = 401;
export const APP_THEME = 'APP_THEME';
export const APP_COLOR = 'rgb(0,74,173)';
export const APP_COLOR_FAKE = 'rgb(136,168,243)';
export const TIME_OUT = 30000;
export const TIME_OUT_OCR = 60000;
export const CODE_TIME_OUT = 'ECONNABORTED';
export const DATA_ID_OTHER_WARE_HOUSE = 3;
export const HTTP_CODE = {
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  NOT_ACCEPTABLE: 406,
};
export const EXIST = '99';

export const dvt = [
  {
    dvtCode: '000',
    quality: '1',
    name: 'Lẻ',
  },
  {
    dvtCode: '001',
    name: 'Thùng',
  },
  {
    dvtCode: '002',
    name: 'Vỉ',
  },
  {
    dvtCode: '003',
    name: 'Bịch',
  },
];

export const timesData = [
  {
    id: 1,
    name: 'Hôm nay',
    code: 'now',
  },
  {
    id: 2,
    name: 'Tuần trước',
    code: 'week',
  },
  {
    id: 3,
    name: 'Tháng trước',
    code: 'month',
  },
  {
    id: 4,
    name: 'Tất cả',
    code: 'all',
  },
];

export const getCode = code => {
  return code + new Date().getTime();
};

export axiosConfig from './axiosConfig';
