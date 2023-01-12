import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  value: 0,
  order: [],
  customer: [],
  status: 'idle',
};
export const orderShopSlice = createSlice({
  name: 'orderShop',
  initialState,
  reducers: {
    setOrder: (state, action) => {
      state.order = action.payload;
    },
    setCustomer: (state, action) => {
      state.customer = action.payload;
    },
  },
});

export const {setOrder} = orderShopSlice.actions;
export const {setCustomer} = orderShopSlice.actions;

export const getOrder = state => {
  return state.orderShop.order ?? {};
};

export const getCustomer = state => {
  return state.orderShop.customer ?? {};
};

export default orderShopSlice.reducer;
