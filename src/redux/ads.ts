import {createSlice} from '@reduxjs/toolkit';

export interface AdProvider {
  companyName: string;
  privacyPolicyUrl: string;
}

export interface AdsState {
  adProviders: Array<AdProvider>;
  consent: number;
  isEEA: boolean;
  showConsent: boolean;
  showProviders: boolean;
}

const ads = createSlice({
  name: 'ads',
  initialState: {
    adProviders: [],
    consent: null,
    isEEA: false,
    showConsent: false,
    showProviders: false,
  },
  reducers: {
    setAll: (state, action) => {
      const {adProviders, consent, isEEA} = action.payload;
      state.adProviders = adProviders;
      state.consent = consent;
      state.isEEA = isEEA;
    },
    setConsent: (state, action) => {
      state.consent = action.payload;
    },
    setShowConsent: (state, action) => {
      state.showConsent = action.payload;
    },
    setShowProviders: (state, action) => {
      state.showProviders = action.payload;
    },
  },
});

export const {setAll, setConsent, setShowConsent, setShowProviders} =
  ads.actions;

const adsReducer = ads.reducer;

export default adsReducer;
