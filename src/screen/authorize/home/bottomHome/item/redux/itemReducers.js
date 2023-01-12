import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  item: [],
  stalls: [],
  publisher: [],
  category: [],
};

const itemReducers = createSlice({
  name: 'item',
  initialState,
  reducers: {
    setItem: (state, action) => {
      state.item = action.payload?.content;
    },
    setStalls: (state, action) => {
      state.stalls = action.payload?.content;
    },
    setPublisher: (state, action) => {
      state.publisher = action.payload?.content;
    },
    setCategory: (state, action) => {
      state.category = action.payload?.content;
    },
  },
});

export const {setItem} = itemReducers.actions;
export const {setStalls} = itemReducers.actions;
export const {setPublisher} = itemReducers.actions;
export const {setCategory} = itemReducers.actions;

export const getItem = state => {
  return state.item.item ?? [];
};

export const getStalls = state => {
  return state.item.stalls ?? null;
};
export const getCategory = state => {
  return state.item.category ?? null;
};
export const getPublisher = state => {
  return state.item.publisher ?? null;
};

export default itemReducers.reducer;
