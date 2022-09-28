import {createSlice} from '@reduxjs/toolkit';

export interface DiaryState {
  postCount: number;
  refresh: boolean;
}

const diary = createSlice({
  name: 'diary',
  initialState: {
    postCount: 0,
    refresh: true,
  },
  reducers: {
    setPostCount: (state, action) => {
      state.postCount = action.payload;
    },
    setRefresh: (state, action) => {
      state.refresh = action.payload;
    },
  },
});

export const {setPostCount, setRefresh} = diary.actions;

const diaryReducer = diary.reducer;

export default diaryReducer;
