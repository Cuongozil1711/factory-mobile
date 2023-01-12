import {formatCurrency} from 'react-native-format-currency';
export const numberFormat = value => {
  let amount = formatCurrency({amount: Number(value), code: 'VND'});
  ////console.log(amount);
  return amount[0];
};

const createFormDataWithPhoto = (photo, body, keyPhoto = 'image') => {
  const data = new FormData();
  if (Array.isArray(photo)) {
    photo.forEach(element => {
      data.append(keyPhoto, {
        name: element.filename,
        uri: element.uri,
        type: element.type,
      });
    });
  }

  Object.keys(body).forEach(key => {
    data.append(key, body[key]);
  });
  return data;
};
export {createFormDataWithPhoto};
