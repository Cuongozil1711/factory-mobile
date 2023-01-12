import axios from 'axios';
import {API_URL_DEV} from '../library/networking';
import {loadString} from '../until/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect} from 'react';

const config = {
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  },
};

const readUrl = async () => {
  try {
    const value = (await AsyncStorage.getItem('url')) ?? API_URL_DEV;
    return value;
  } catch (e) {
    alert('Failed to fetch the input from storage');
  }
};

const readData = async () => {
  try {
    const value = await AsyncStorage.getItem('token');
    return value;
  } catch (e) {
    alert('Failed to fetch the input from storage');
  }
};

const readDataUid = async () => {
  try {
    const value = await AsyncStorage.getItem('uid');
    return value;
  } catch (e) {
    alert('Failed to fetch the input from storage');
  }
};

const readDataCid = async () => {
  try {
    const value = await AsyncStorage.getItem('cid');
    //console.log(value);
    return value;
  } catch (e) {
    alert('Failed to fetch the input from storage');
  }
};

const readDataToken = async () => {
  try {
    const value = await AsyncStorage.getItem('tokenFirebase');
    return value;
  } catch (e) {
    alert('Failed to fetch the input from storage');
  }
};

const base = async param => {
  const CancelToken = axios.CancelToken;
  let source = CancelToken.source();
  let token = await readData();
  let uid = await readDataUid();
  let cid = await readDataCid();
  let url = await readUrl();
  setTimeout(() => {
    source.cancel();
  }, 10000);
  return await axios({
    method: param.method,
    baseURL: url,
    url: param.url,
    headers: {
      ...config.headers,
      Authorization: token,
      cid: parseInt(cid),
      uid: uid,
    },
    cancelToken: source.token,
    data: param.data,
  })
    .then(res => {
      return Promise.resolve(res);
    })
    .catch(err => {
      if (err.response) {
        return Promise.reject(err.response);
      } else {
        return Promise.reject('TIMEOUT');
      }
    });
};

const requestImage = async param => {
  const CancelToken = axios.CancelToken;
  let source = CancelToken.source();
  let token = await readData();
  let uid = await readDataUid();
  let cid = await readDataCid();
  let url = await readUrl();
  setTimeout(() => {
    source.cancel();
  }, 60000);
  return await axios({
    method: param.method,
    baseURL: url,
    url: param.url,
    headers: {
      ...config.headers,
      Authorization: token,
      cid: parseInt(cid),
      uid: uid,
      'Content-Type': 'multipart/form-data',
    },
    cancelToken: source.token,
    data: param.data,
  })
    .then(res => {
      return Promise.resolve(res);
    })
    .catch(err => {
      if (err.response) {
        return Promise.reject(err.response);
      } else {
        return Promise.reject('TIMEOUT');
      }
    });
};

const request = async (method, url) => {
  return await base({method, url})
    .then(res => Promise.resolve(res))
    .catch(err => Promise.reject(err));
};

const requestData = async (method, url, data) => {
  // ////console.log('url', url);
  return await base({method, url, data})
    .then(res => Promise.resolve(res))
    .catch(err => Promise.reject(err));
};

const postImage = async (method, url, data) => {
  // ////console.log('url', url);
  return await requestImage({method, url, data})
    .then(res => Promise.resolve(res))
    .catch(err => Promise.reject(err));
};

export default {
  request,
  requestData,
  postImage,
};
