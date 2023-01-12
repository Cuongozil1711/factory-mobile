import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  data: [],
  status: 'idle',
};
export const ReceiptImportWareHouseSlice = createSlice({
  name: 'receiptImportWareHouse',
  initialState,
  reducers: {
    setListReceiptImportWareHouse: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const {setListReceiptImportWareHouse} =
  ReceiptImportWareHouseSlice.actions;

export const getListReceiptImportWareHouse = state => {
  return state.receiptImportWareHouse.data ?? [];
};

export default ReceiptImportWareHouseSlice.reducer;
