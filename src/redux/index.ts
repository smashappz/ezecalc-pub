import {combineReducers} from 'redux';
import adsReducer, {AdsState} from './ads';
import calculatorReducer, {CalculatorState} from './calculator';
import configReducer, {ConfigState} from './config';
import diaryReducer, {DiaryState} from './diary';
import discountReducer, {DiscountState} from './discount';
import imageReducer, {ImageState} from './image';
import purchasesReducer, {PurchaseState} from './purchase';

export default combineReducers({
  ads: adsReducer,
  calculator: calculatorReducer,
  config: configReducer,
  diary: diaryReducer,
  discount: discountReducer,
  image: imageReducer,
  purchases: purchasesReducer,
});

export interface RootState {
  ads: AdsState;
  calculator: CalculatorState;
  config: ConfigState;
  diary: DiaryState;
  discount: DiscountState;
  image: ImageState;
  purchases: PurchaseState;
}
