import {createSlice} from '@reduxjs/toolkit';

export interface PurchaseState {
  discount: boolean;
  isPurchasing: boolean;
  isRestoring: boolean;
  noAds: boolean;
  purchased: boolean;
}

const purchases = createSlice({
  name: 'purchases',
  initialState: {
    discount: false,
    isPurchasing: false,
    isRestoring: false,
    noAds: false,
    purchased: false,
  },
  reducers: {
    setDiscount: (state, action) => {
      state.discount = action.payload;
    },
    setIsPurchasing: (state, action) => {
      state.isPurchasing = action.payload;
    },
    setIsRestoring: (state, action) => {
      state.isRestoring = action.payload;
    },
    setNoAds: (state, action) => {
      state.noAds = action.payload;
    },
    setPurchased: (state, action) => {
      state.purchased = action.payload;
    },
  },
});

export const {
  setDiscount,
  setIsPurchasing,
  setIsRestoring,
  setNoAds,
  setPurchased,
} = purchases.actions;

const purchasesReducer = purchases.reducer;

export default purchasesReducer;
