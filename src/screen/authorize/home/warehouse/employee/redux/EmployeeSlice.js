import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  data: [],
  orderEmpId: [],
  status: 'idle',
};
export const EmployeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    setListEmployee: (state, action) => {
      //console.log('action.payload1: ' + JSON.stringify(action.payload));

      state.data = action.payload;
    },
    setOrderEmpId: (state, action) => {
      state.orderEmpId = action.payload;
    },
  },
});

export const {setListEmployee} = EmployeeSlice.actions;
export const {setOrderEmpId} = EmployeeSlice.actions;

export const getListEmployee = state => {
  return state.employee.data ?? [];
};

export const getOrderEmpId = state => {
  return state.employee.orderEmpId ?? [];
};

export default EmployeeSlice.reducer;
