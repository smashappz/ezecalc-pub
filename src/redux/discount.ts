import {createSlice} from '@reduxjs/toolkit';
import {setData} from '../helpers/utils';

export interface DiscountState {
  activeRow: number;
  discount: string;
  discount1: string;
  discount2: string;
  discount3: string;
  fixedPrice: string;
  numProducts: string;
  pay: string;
  prevActiveRow: number;
  price: string;
  product1: string;
  product2: string;
  product3: string;
  product4: string;
  save: string;
  tax: string;
  type: number;
  unitPrice: string;
}

const discount = createSlice({
  name: 'discount',
  initialState: {
    activeRow: 1,
    discount: '0',
    discount1: '0',
    discount2: '0',
    discount3: '0',
    fixedPrice: '0',
    numProducts: '0',
    pay: '0',
    prevActiveRow: -1,
    price: '0',
    product1: '0',
    product2: '0',
    product3: '0',
    product4: '0',
    save: '0',
    tax: '0',
    type: 1,
    unitPrice: '0',
  },
  reducers: {
    setAll: (state, action) => {
      const {
        discount,
        discount1,
        discount2,
        discount3,
        fixedPrice,
        numProducts,
        pay,
        price,
        product1,
        product2,
        product3,
        product4,
        save,
        tax,
        type,
        unitPrice,
      } = action.payload;
      state.discount = discount;
      state.discount1 = discount1;
      state.discount2 = discount2;
      state.discount3 = discount3;
      state.fixedPrice = fixedPrice;
      state.numProducts = numProducts;
      state.pay = pay;
      state.price = price;
      state.product1 = product1;
      state.product2 = product2;
      state.product3 = product3;
      state.product4 = product4;
      state.save = save;
      state.tax = tax;
      state.type = type;
      state.unitPrice = unitPrice;
    },
    setActiveRow: (state, action) => {
      state.activeRow = action.payload;
    },
    setDiscount: (state, action) => {
      state.discount = action.payload;
    },
    setDiscount1: (state, action) => {
      state.discount1 = action.payload;
    },
    setDiscount2: (state, action) => {
      state.discount2 = action.payload;
    },
    setDiscount3: (state, action) => {
      state.discount3 = action.payload;
    },
    setFixedPrice: (state, action) => {
      state.fixedPrice = action.payload;
    },
    setNumProducts: (state, action) => {
      state.numProducts = action.payload;
    },
    setPay: (state, action) => {
      state.pay = action.payload;
    },
    setPrevActiveRow: (state, action) => {
      state.prevActiveRow = action.payload;
    },
    setPrice: (state, action) => {
      state.price = action.payload;
    },
    setProduct1: (state, action) => {
      state.product1 = action.payload;
    },
    setProduct2: (state, action) => {
      state.product2 = action.payload;
    },
    setProduct3: (state, action) => {
      state.product3 = action.payload;
    },
    setProduct4: (state, action) => {
      state.product4 = action.payload;
    },
    setSave: (state, action) => {
      state.save = action.payload;
    },
    setTax: (state, action) => {
      state.tax = action.payload;
    },
    setType: (state, action) => {
      const type = action.payload;
      state.type = type;
      setData('disc_type', type.toString());
    },
    setUnitPrice: (state, action) => {
      state.unitPrice = action.payload;
    },
  },
});

export const {
  setAll,
  setActiveRow,
  setDiscount,
  setDiscount1,
  setDiscount2,
  setDiscount3,
  setFixedPrice,
  setNumProducts,
  setPay,
  setPrevActiveRow,
  setPrice,
  setProduct1,
  setProduct2,
  setProduct3,
  setProduct4,
  setSave,
  setTax,
  setType,
  setUnitPrice,
} = discount.actions;

const discountReducer = discount.reducer;

export default discountReducer;
