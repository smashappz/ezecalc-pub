import i18n from './i18n';

export const getButtonShape = (shape = 0): number => {
  switch (shape) {
    case 0:
      return 64;

    default:
    case 1:
      return 16;

    case 2:
      return 0;
  }
};

export const getCalculatorKeyFromValue = (value?: string): number => {
  if (!value) {
    return 0;
  }

  switch (value) {
    case i18n.t('calc.calc_discount'):
      return 1;

    default:
      return 0;
  }
};

export const getDecSep = (decSep: string): string => {
  switch (decSep) {
    default:
    case i18n.t('config.decSep0'):
      return '.';

    case i18n.t('config.decSep1'):
      return ',';
  }
};

export const getDecSepDesc = (decSep: string): string => {
  switch (decSep) {
    default:
    case '.':
      return i18n.t('config.decSep0');

    case ',':
      return i18n.t('config.decSep1');
  }
};

export const getDiscountTypeFromKey = (key?: number): string => {
  if (!key) {
    return i18n.t('discount.type1');
  }

  return i18n.t(`discount.type${key}`);
};

export const getDiscountTypeKeyFromValue = (value?: string): number => {
  if (!value) {
    return 0;
  }

  switch (value) {
    case i18n.t('discount.type1'):
      return 1;

    case i18n.t('discount.type2'):
      return 2;

    case i18n.t('discount.type3'):
      return 3;

    case i18n.t('discount.type4'):
      return 4;

    case i18n.t('discount.type5'):
      return 5;

    case i18n.t('discount.type6'):
      return 6;

    case i18n.t('discount.type7'):
      return 7;

    case i18n.t('discount.type8'):
      return 8;

    case i18n.t('discount.type9'):
      return 9;

    case i18n.t('discount.type10'):
      return 10;

    default:
      return 0;
  }
};

export const getFont = (font: string): number => {
  switch (font) {
    case i18n.t('config.font0'):
      return 0;
    default:
    case i18n.t('config.font1'):
      return 1;
    case i18n.t('config.font2'):
      return 2;
    case i18n.t('config.font3'):
      return 3;
    case i18n.t('config.font4'):
      return 4;
    case i18n.t('config.font5'):
      return 5;
    case i18n.t('config.font6'):
      return 6;
    case i18n.t('config.font7'):
      return 7;
    case i18n.t('config.font8'):
      return 8;
    case i18n.t('config.font9'):
      return 9;
    case i18n.t('config.font10'):
      return 10;
  }
};

export const getFontDesc = (font: number): string => {
  switch (font) {
    case 0:
      return i18n.t('config.font0');
    default:
    case 1:
      return i18n.t('config.font1');
    case 2:
      return i18n.t('config.font2');
    case 3:
      return i18n.t('config.font3');
    case 4:
      return i18n.t('config.font4');
    case 5:
      return i18n.t('config.font5');
    case 6:
      return i18n.t('config.font6');
    case 7:
      return i18n.t('config.font7');
    case 8:
      return i18n.t('config.font8');
    case 9:
      return i18n.t('config.font9');
    case 10:
      return i18n.t('config.font10');
  }
};

export const getShape = (shape: string): number => {
  switch (shape) {
    case i18n.t('config.shape0'):
      return 0;

    default:
    case i18n.t('config.shape1'):
      return 1;

    case i18n.t('config.shape2'):
      return 2;
  }
};

export const getShapeDesc = (shape: number): string => {
  switch (shape) {
    case 0:
      return i18n.t('config.shape0');

    default:
    case 1:
      return i18n.t('config.shape1');

    case 2:
      return i18n.t('config.shape2');
  }
};

export const getTag = (key: string): string => {
  return i18n.t(`calc.${key}`);
};

export const getTagKeyFromValue = (value?: string): string => {
  if (!value) {
    return '';
  }

  switch (value) {
    case i18n.t('calc.abs'):
      return 'abs';

    case i18n.t('calc.ceil'):
      return 'ceil';

    case i18n.t('calc.cos'):
      return 'cos';

    case i18n.t('calc.cos2'):
      return 'cos2';

    case i18n.t('calc.cos3'):
      return 'cos3';

    case i18n.t('calc.cos4'):
      return 'cos4';

    case i18n.t('calc.cubed'):
      return 'cubed';

    case i18n.t('calc.cube_root'):
      return 'cube_root';

    case i18n.t('calc.e'):
      return 'e';

    case i18n.t('calc.exp'):
      return 'exp';

    case i18n.t('calc.floor'):
      return 'floor';

    case i18n.t('calc.golden'):
      return 'golden';

    case i18n.t('calc.golden2'):
      return 'golden2';

    case i18n.t('calc.inv'):
      return 'inv';

    case i18n.t('calc.ln2'):
      return 'ln2';

    case i18n.t('calc.ln10'):
      return 'ln10';

    case i18n.t('calc.log'):
      return 'log';

    case i18n.t('calc.log2'):
      return 'log2';

    case i18n.t('calc.log2e'):
      return 'log2e';

    case i18n.t('calc.log10'):
      return 'log10';

    case i18n.t('calc.mod'):
      return 'mod';

    case i18n.t('calc.neg'):
      return 'neg';

    case i18n.t('calc.pi'):
      return 'pi';

    case i18n.t('calc.power'):
      return 'power';

    case i18n.t('calc.rand'):
      return 'rand';

    case i18n.t('calc.round'):
      return 'round';

    case i18n.t('calc.sin'):
      return 'sin';

    case i18n.t('calc.sin2'):
      return 'sin2';

    case i18n.t('calc.sin3'):
      return 'sin3';

    case i18n.t('calc.sin4'):
      return 'sin4';

    case i18n.t('calc.square'):
      return 'square';

    case i18n.t('calc.square_root'):
      return 'square_root';

    case i18n.t('calc.sqrt1_2'):
      return 'sqrt1_2';

    case i18n.t('calc.sqrt2'):
      return 'sqrt2';

    case i18n.t('calc.tan'):
      return 'tan';

    case i18n.t('calc.tan2'):
      return 'tan2';

    case i18n.t('calc.tan3'):
      return 'tan3';

    case i18n.t('calc.tan4'):
      return 'tan4';

    case i18n.t('calc.trunc'):
      return 'trunc';

    default:
      return '';
  }
};

export const getThouSep = (thouSep: string): string => {
  switch (thouSep) {
    default:
    case i18n.t('config.thouSep0'):
      return ',';

    case i18n.t('config.thouSep1'):
      return '.';

    case i18n.t('config.thouSep2'):
      return ' ';

    case i18n.t('config.thouSep3'):
      return "'";

    case i18n.t('config.thouSep4'):
      return '';
  }
};

export const getThouSepDesc = (thouSep: string): string => {
  switch (thouSep) {
    default:
    case ',':
      return i18n.t('config.thouSep0');

    case '.':
      return i18n.t('config.thouSep1');

    case ' ':
      return i18n.t('config.thouSep2');

    case "'":
      return i18n.t('config.thouSep3');

    case '':
      return i18n.t('config.thouSep4');
  }
};

export const calcConstOptions = [
  i18n.t('calc.e'),
  i18n.t('calc.golden'),
  i18n.t('calc.golden2'),
  i18n.t('calc.ln2'),
  i18n.t('calc.ln10'),
  i18n.t('calc.log2e'),
  i18n.t('calc.log10e'),
  i18n.t('calc.pi'),
  i18n.t('calc.sqrt1_2'),
  i18n.t('calc.sqrt2'),
];

export const calcGeneralOptions = [
  i18n.t('calc.abs'),
  i18n.t('calc.ceil'),
  i18n.t('calc.floor'),
  i18n.t('calc.mod'),
  i18n.t('calc.neg'),
  i18n.t('calc.rand'),
  i18n.t('calc.round'),
  i18n.t('calc.trunc'),
];

export const calcGeneralDiscountOptions = [
  i18n.t('calc.ceil'),
  i18n.t('calc.floor'),
  i18n.t('calc.neg'),
  i18n.t('calc.round'),
  i18n.t('calc.trunc'),
];

export const calcLogOptions = [
  i18n.t('calc.log2'),
  i18n.t('calc.log'),
  i18n.t('calc.ln'),
];

export const calcPowerOptions = [
  i18n.t('calc.cubed'),
  i18n.t('calc.cube_root'),
  i18n.t('calc.exp'),
  i18n.t('calc.power'),
  i18n.t('calc.inv'),
  i18n.t('calc.square'),
  i18n.t('calc.square_root'),
];

export const calcTrigOptions = [
  i18n.t('calc.cos'),
  i18n.t('calc.sin'),
  i18n.t('calc.tan'),
  i18n.t('calc.cos2'),
  i18n.t('calc.sin2'),
  i18n.t('calc.tan2'),
  i18n.t('calc.cos4'),
  i18n.t('calc.sin4'),
  i18n.t('calc.tan4'),
  i18n.t('calc.cos3'),
  i18n.t('calc.sin3'),
  i18n.t('calc.tan3'),
];

export type CalculatorOptions = {
  discount?: boolean;
};

export const calculatorDiscountOptions = (options?: CalculatorOptions) => {
  const calculatorOptions: string[] = [i18n.t('calc.calc_general')];

  if (options?.discount) {
    // calculatorOptions.push( i18n.t('calc.calc_discount'))
  }

  return calculatorOptions;
};

export const calculatorGeneralOptions = (options?: CalculatorOptions) => {
  const calculatorOptions: string[] = [];

  if (options?.discount) {
    calculatorOptions.push(i18n.t('calc.calc_discount'));
  }

  return calculatorOptions;
};

export const decSepOptions = [
  i18n.t('config.decSep0'),
  i18n.t('config.decSep1'),
];

export const discountTypeOptions = [
  i18n.t('discount.type1'),
  i18n.t('discount.type2'),
  i18n.t('discount.type3'),
  i18n.t('discount.type4'),
  i18n.t('discount.type5'),
  i18n.t('discount.type6'),
  i18n.t('discount.type7'),
  i18n.t('discount.type8'),
  i18n.t('discount.type9'),
  i18n.t('discount.type10'),
];

export const fontOptions = [
  i18n.t('config.font0'),
  i18n.t('config.font1'),
  i18n.t('config.font2'),
  i18n.t('config.font3'),
  i18n.t('config.font4'),
  i18n.t('config.font5'),
  i18n.t('config.font6'),
  i18n.t('config.font7'),
  i18n.t('config.font8'),
  i18n.t('config.font9'),
  i18n.t('config.font10'),
];

export const shapeOptions = [
  i18n.t('config.shape0'),
  i18n.t('config.shape1'),
  i18n.t('config.shape2'),
];

export const thouOptions = [
  i18n.t('config.thouSep0'),
  i18n.t('config.thouSep1'),
  i18n.t('config.thouSep2'),
  i18n.t('config.thouSep3'),
  i18n.t('config.thouSep4'),
];
