import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  wareHouse: [],
  item: [],
  status: 'idle',
};
export const ManagerSlice = createSlice({
  name: 'manager',
  initialState,
  reducers: {
    setWareHouse: (state, action) => {
      state.wareHouse = action.payload;
    },
    setItem: (state, action) => {
      state.item = action.payload?.content;
    },
  },
});

export const {setWareHouse} = ManagerSlice.actions;
export const {setItem} = ManagerSlice.actions;

export const getWareHouse = state => {
  return state.manager.wareHouse ?? [];
};

export const getItem = state => {
  return state.manager.item ?? [];
};

export const getAddress = state => {
  return state.manager.address ?? [];
};

export default ManagerSlice.reducer;
