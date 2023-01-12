import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  data: [],
  itemScanner: [],
  status: 'idle',
};
export const ImportWareHouseSlice = createSlice({
  name: 'importWareHouse',
  initialState,
  reducers: {
    setListImportWareHouse: (state, action) => {
      state.data = action.payload;
    },
    setListItemScanner: (state, action) => {
      state.itemScanner = action.payload;
    },
  },
});

export const {setListImportWareHouse} = ImportWareHouseSlice.actions;
export const {setListItemScanner} = ImportWareHouseSlice.actions;

export const getListImportWareHouse = state => {
  return state.importWareHouse.data ?? [];
};

export const getListItemScanner = (state, payload) => {
  return state.importWareHouse.data ?? [];
};

export default ImportWareHouseSlice.reducer;
