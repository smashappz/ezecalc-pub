import React from 'react';
import {connect} from 'react-redux';
import {RootState} from '../../redux';
import {DiscountCalculator} from './discount';
import {GeneralCalculator} from './general';

type Props = {
  calculator: number;
};

const mapStateToProps = (state: RootState) => ({
  calculator: state.calculator.calculator,
});

export const Calculator = connect(mapStateToProps)(function (props: Props) {
  const {calculator} = props;

  const content = (() => {
    switch (calculator) {
      default:
        return <GeneralCalculator />;
      case 1:
        return <DiscountCalculator />;
    }
  })();

  return <>{content}</>;
});
