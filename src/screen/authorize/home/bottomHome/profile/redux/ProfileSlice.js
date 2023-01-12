import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  data: {},
  status: 'idle',
  province: [],
  district: [],
  wards: [],
};
export const ProfileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.data = action.payload;
    },
    setProvince: (state, action) => {
      state.province = action.payload.province;
    },
    setDistrict: (state, action) => {
      state.district = action.payload.district;
    },
    setWards: (state, action) => {
      state.wards = action.payload.wards;
    },
  },
});

export const {setUser, setProvince, setDistrict, setWards} =
  ProfileSlice.actions;

export const getUser = state => {
  return state.profile.data ?? {};
};

export const getProvince = state => {
  return state.profile.province ?? [];
};

export const getDistrict = state => {
  return state.profile.district ?? [];
};

export const getWards = state => {
  return state.profile.wards ?? [];
};

export default ProfileSlice.reducer;
