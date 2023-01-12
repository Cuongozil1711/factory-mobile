import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  data: [],
  status: 'idle',
};
export const PromotionSlice = createSlice({
  name: 'promotion',
  initialState,
  reducers: {
    setListPromotion: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const {setListPromotion} = PromotionSlice.actions;

export const getListPromotion = state => {
  return state.promotion.data ?? [];
};

export default PromotionSlice.reducer;
