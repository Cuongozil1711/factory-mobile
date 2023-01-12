import React from 'react';
import {translate} from '../../common/i18n/translate';

export const dialogRef = React.createRef();

export const dialogLoadingRef = React.createRef();

export const showDialog = (
  msg = '',
  arrayButton = [],
  title = translate('dialog:notification'),
  isOut = false,
) => {
  if (dialogRef.current) {
    dialogRef.current.show(msg, arrayButton, title, isOut);
  }
};

/**
 *
 * @param {string} msg
 * @param {Function | null} callback
 */
export const showLoading = (
  msg = translate('dialog:loading'),
  callback = null,
) => {
  if (dialogLoadingRef.current) {
    ////console.log('loading');
    dialogLoadingRef.current.show(msg, callback);
  }
};

export const hideLoading = () => {
  if (dialogLoadingRef.current) {
    dialogLoadingRef.current.hidden();
  }
};
