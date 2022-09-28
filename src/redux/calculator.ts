import {createSlice} from '@reduxjs/toolkit';
import {setData} from '../helpers/utils';

export interface CalculatorState {
  calculator: number;
  clear: boolean;
  memory: string;
  output: string;
  refresh: boolean;
  tab: number;
  updatePic: boolean;
}

const calculator = createSlice({
  name: 'calculator',
  initialState: {
    calculator: 0,
    clear: false,
    memory: '0',
    output: '0',
    refresh: false,
    tab: 0,
    updatePic: false,
  },
  reducers: {
    setAll: (state, action) => {
      const {calculator, memory, output} = action.payload;
      state.calculator = calculator;
      state.memory = memory;
      state.output = output;
    },
    setCalculator: (state, action) => {
      const calculator = action.payload;
      state.calculator = calculator;
      setData('calc_calculator', calculator.toString());
    },
    setClear: (state, action) => {
      state.clear = action.payload;
    },
    setMemory: (state, action) => {
      const memory = action.payload;
      state.memory = memory;
      setData('calc_memory', memory);
    },
    setOutput: (state, action) => {
      state.output = action.payload;
    },
    setRefresh: (state, action) => {
      state.refresh = action.payload;
    },
    setTab: (state, action) => {
      state.tab = action.payload;
    },
    setUpdatePic: (state, action) => {
      state.updatePic = action.payload;
    },
  },
});

export const {
  setAll,
  setCalculator,
  setClear,
  setMemory,
  setOutput,
  setRefresh,
  setTab,
  setUpdatePic,
} = calculator.actions;

const calculatorReducer = calculator.reducer;

export default calculatorReducer;
