import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  token: null,
  cid: null,
  userData: {},
  role: '',
  url: null,
  dvtCode: [],
};

const appReducers = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setUrl: (state, action) => {
      state.url = action.payload;
    },
    setDvtCode: (state, action) => {
      state.dvtCode = action.payload;
    },
    setToken: (state, action) => {
      state.userData = action.payload;
      state.token = action.payload?.accessToken;
      state.cid = action.payload?.companyId;
      state.role = action.payload?.role;
    },
  },
});

export const {setToken, setUrl, setDvtCode} = appReducers.actions;

export const getToken = state => {
  return state.app.token ?? null;
};

export const getRole = state => {
  return state.app.role ?? null;
};

export const getUid = state => {
  return state.app.cid ?? null;
};

export const getUrl = state => {
  return state.app.url;
};

export const getDvtCode = state => {
  return state.app.dvtCode;
};

export const getUserData = state => {
  return state.app.userData ?? null;
};

export default appReducers.reducer;
