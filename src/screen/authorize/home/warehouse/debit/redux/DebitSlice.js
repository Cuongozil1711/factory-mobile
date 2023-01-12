import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  data: [],
  status: 'idle',
};
export const DebitSlice = createSlice({
  name: 'debit',
  initialState,
  reducers: {
    setDebit: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const {setDebit} = DebitSlice.actions;

export const getDebit = state => {
  return state.debit.data ?? [];
};

export default DebitSlice.reducer;
