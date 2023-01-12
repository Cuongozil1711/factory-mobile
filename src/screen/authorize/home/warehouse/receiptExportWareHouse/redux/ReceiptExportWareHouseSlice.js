import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  data: [],
  company: [],
  wareHouseTo: [],
  supplier: [],
  status: 'idle',
};
export const ReceiptExportWareHouseSlice = createSlice({
  name: 'receiptExportWareHouse',
  initialState,
  reducers: {
    setListReceiptExportWareHouse: (state, action) => {
      state.data = action.payload;
    },
    setCompany: (state, action) => {
      state.company = action.payload;
    },
    setSupplier: (state, action) => {
      state.supplier = action.payload;
    },
    setWareHouseTo: (state, action) => {
      state.wareHouseTo = action.payload;
    },
  },
});

export const {
  setListReceiptExportWareHouse,
  setCompany,
  setWareHouseTo,
  setSupplier,
} = ReceiptExportWareHouseSlice.actions;

export const getListReceiptExportWareHouse = state => {
  return state.receiptExportWareHouse.data ?? [];
};

export const getCompany = state => {
  return state.receiptExportWareHouse.company ?? [];
};

export const getSupplier = state => {
  return state.receiptExportWareHouse.supplier ?? [];
};

export const getWareHouseTo = state => {
  return state.receiptExportWareHouse.wareHouseTo ?? [];
};

export default ReceiptExportWareHouseSlice.reducer;
