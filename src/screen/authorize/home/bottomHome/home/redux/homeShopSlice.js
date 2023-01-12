import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  data: {},
  orderCount: [],
  listItem: [],
  exportAll: [],
};
export const homeShopSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
    setCount: (state, action) => {
      state.orderCount = action.payload;
    },
    setListItem: (state, action) => {
      state.listItem = action.payload;
    },
    setExportAll: (state, action) => {
      state.exportAll = action.payload?.content;
    },
  },
});

export const {setData} = homeShopSlice.actions;
export const {setCount} = homeShopSlice.actions;
export const {setListItem} = homeShopSlice.actions;
export const {setExportAll} = homeShopSlice.actions;

export const getData = state => {
  ////console.log(state);
  return state?.home?.data ?? {};
};

export const getCount = state => {
  return state?.home?.orderCount ?? [];
};

export const getListItem = state => {
  return state?.home?.listItem ?? [];
};

export const getExportAll = state => {
  return state?.home?.exportAll ?? [];
};

export default homeShopSlice.reducer;
