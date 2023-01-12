import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  data: [],
  status: 'idle',
};
export const ExportWareHouseSlice = createSlice({
  name: 'exportWareHouse',
  initialState,
  reducers: {
    setListExportWareHouse: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const {setListExportWareHouse} = ExportWareHouseSlice.actions;

export const getListExportWareHouse = state => {
  return state.exportWareHouse.data ?? [];
};

export default ExportWareHouseSlice.reducer;
