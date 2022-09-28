import {createSlice} from '@reduxjs/toolkit';

export interface ImageState {
  height: number;
  image: string;
  showPic: boolean;
  width: number;
}

const image = createSlice({
  name: 'image',
  initialState: {
    height: 0,
    image: '',
    showPic: false,
    width: 0,
  },
  reducers: {
    setHeight: (state, action) => {
      state.height = action.payload;
    },
    setImage: (state, action) => {
      state.image = action.payload;
    },
    setShowPic: (state, action) => {
      state.showPic = action.payload;
    },
    setWidth: (state, action) => {
      state.width = action.payload;
    },
  },
});

export const {setHeight, setImage, setShowPic, setWidth} = image.actions;

const imageReducer = image.reducer;

export default imageReducer;
