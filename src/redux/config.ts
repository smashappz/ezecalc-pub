import {createSlice} from '@reduxjs/toolkit';

export interface ConfigState {
  darkMode: boolean;
  decSep: string;
  freqList: Record<string, number>;
  freqTotal: number;
  inplace: boolean;
  negRed: boolean;
  palette: boolean;
  precision: number;
  radians: boolean;
  shape: number;
  speech: boolean;
  subtotal: boolean;
  theme: number;
  thouSep: string;
  vibrate: boolean;
}

export const initialState = {
  darkMode: true,
  decSep: '.',
  freqList: {},
  freqTotal: 5,
  inplace: false,
  negRed: false,
  palette: false,
  precision: 10,
  radians: false,
  shape: 0,
  speech: false,
  subtotal: true,
  theme: 0,
  thouSep: '',
  vibrate: false,
};

const config = createSlice({
  name: 'config',
  initialState,
  reducers: {
    setAll: (state, action) => {
      const {
        darkMode,
        decSep,
        freqList,
        freqTotal,
        inplace,
        negRed,
        palette,
        precision,
        radians,
        shape,
        speech,
        subtotal,
        theme,
        thouSep,
        vibrate,
      } = action.payload;
      state.darkMode = darkMode;
      state.decSep = decSep;
      state.freqList = freqList;
      state.freqTotal = freqTotal;
      state.inplace = inplace;
      state.negRed = negRed;
      state.palette = palette;
      state.precision = precision;
      state.radians = radians;
      state.shape = shape;
      state.speech = speech;
      state.subtotal = subtotal;
      state.theme = theme;
      state.thouSep = thouSep;
      state.vibrate = vibrate;
    },
    setDarkMode: (state, action) => {
      state.darkMode = action.payload;
    },
    setDecSep: (state, action) => {
      state.decSep = action.payload;
    },
    setFreqList: (state, action) => {
      state.freqList = action.payload;
    },
    setFreqTotal: (state, action) => {
      state.freqTotal = action.payload;
    },
    setInplace: (state, action) => {
      state.inplace = action.payload;
    },
    setNegRed: (state, action) => {
      state.negRed = action.payload;
    },
    setPalette: (state, action) => {
      state.palette = action.payload;
    },
    setPrecision: (state, action) => {
      state.precision = action.payload;
    },
    setRadians: (state, action) => {
      state.radians = action.payload;
    },
    setShape: (state, action) => {
      state.shape = action.payload;
    },
    setSpeech: (state, action) => {
      state.speech = action.payload;
    },
    setSubtotal: (state, action) => {
      state.subtotal = action.payload;
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    setThouSep: (state, action) => {
      state.thouSep = action.payload;
    },
    setVibrate: (state, action) => {
      state.vibrate = action.payload;
    },
  },
});

export const {
  setAll,
  setDarkMode,
  setDecSep,
  setFreqList,
  setFreqTotal,
  setInplace,
  setNegRed,
  setPalette,
  setPrecision,
  setRadians,
  setShape,
  setSpeech,
  setSubtotal,
  setTheme,
  setThouSep,
  setVibrate,
} = config.actions;

const configReducer = config.reducer;

export default configReducer;
