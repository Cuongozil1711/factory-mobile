import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  data: [],
  orderEmpId: [],
  status: 'idle',
};
export const CustomerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    setListCustomer: (state, action) => {
      //console.log('action.payload1: ' + JSON.stringify(action.payload));

      state.data = action.payload;
    },
    setOrderEmpId: (state, action) => {
      state.orderEmpId = action.payload;
    },
  },
});

export const {setListCustomer} = CustomerSlice.actions;
export const {setOrderEmpId} = CustomerSlice.actions;

export const getListCustomer = state => {
  return state.customer.data ?? [];
};

export const getOrderEmpId = state => {
  return state.customer.orderEmpId ?? [];
};

export default CustomerSlice.reducer;
