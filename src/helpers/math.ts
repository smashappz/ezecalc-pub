import {createPost} from '../db/db';
import {store} from '../store';
import i18n from './i18n';
import {speak} from './utils';

type options = {
  callback?: () => void;
  log?: boolean;
  radians?: boolean;
};
const MATH_CONSTANTS = [
  'lg2(e)',
  'log(e)',
  'ln(10)',
  'ln(2)',
  '-1/ϕ',
  '√2',
  '√½',
  'e',
  'π',
  'ϕ',
];

const MATH_FUNCS = [
  'acosh',
  'asinh',
  'atanh',
  'cosh',
  'sinh',
  'tanh',
  'acos',
  'asin',
  'atan',
  'cos',
  'sin',
  'tan',
  'log',
  'lg2',
  'ln',
  '³√',
  '√',
];

const MATH_FUNCS_2 = [
  'Math.acos',
  'Math.acosh',
  'Math.asin',
  'Math.asinh',
  'Math.atan',
  'Math.atanh',
  'Math.cbrt',
  'Math.cos',
  'Math.cosh',
  'Math.log',
  'Math.log2',
  'Math.log10',
  'Math.sin',
  'Math.sinh',
  'Math.sqrt',
  'Math.tan',
  'Math.tanh',
];

export const abs = (input: string): string => calculate(input, Math.abs);

export const acos = (input: string): string => constant(input, 'acos(');

export const acos2 = (input: string): string => calculate(input, Math.acos);

export const acosh = (input: string): string => constant(input, 'acosh(');

export const acosh2 = (input: string): string => calculate(input, Math.acosh);

export const asin = (input: string): string => constant(input, 'asin(');

export const asin2 = (input: string): string => calculate(input, Math.asin);

export const asinh = (input: string): string => constant(input, 'asinh(');

export const asinh2 = (input: string): string => calculate(input, Math.asinh);

export const atan = (input: string): string => constant(input, 'atan(');

export const atan2 = (input: string): string => calculate(input, Math.atan);

export const atanh = (input: string): string => constant(input, 'atanh(');

export const atanh2 = (input: string): string => calculate(input, Math.atanh);

export const ceil = (input: string): string => calculate(input, Math.ceil);

export const cos = (input: string): string => constant(input, 'cos(');

export const cos2 = (input: string): string => calculate(input, Math.cos);

export const cosh = (input: string): string => constant(input, 'cosh(');

export const cosh2 = (input: string): string => calculate(input, Math.cosh);

export const cubed = (input: string): string =>
  calculate(input, (n: number) => n ** 3);

export const cbrt = (input: string): string => constant(input, '³√(');

export const cbrt2 = (input: string): string => calculate(input, Math.cbrt);

export const equals = (input: string, options?: options): string => {
  try {
    if (!input || isError(input)) {
      return '0';
    }

    let cleanInput = input.slice();

    MATH_CONSTANTS.forEach(c => {
      let p = 0;

      while (p < cleanInput.length) {
        const i = cleanInput.indexOf(c, p);

        if (i === -1) {
          return;
        }

        const l = c.length;
        let q = 0;

        if (
          i > 0 &&
          (isDigitOrSymbol(cleanInput[i - 1], ')') ||
            isConstantPrefix(cleanInput.slice(0, i))) &&
          cleanInput[i - 1] !== '*'
        ) {
          cleanInput = `${cleanInput.slice(0, i)}*${cleanInput.slice(i)}`;
          q = 1;
        }

        p = i + l + q;

        if (
          p < cleanInput.length &&
          (isDigitOrSymbol(cleanInput[p], '(') ||
            isConstantSuffix(cleanInput.slice(p))) &&
          cleanInput[p - 1] !== '*'
        ) {
          cleanInput = `${cleanInput.slice(0, p)}*${cleanInput.slice(p)}`;
        }
      }
    });

    let p = 0;

    while (p < cleanInput.length) {
      const i = cleanInput.indexOf('(', p);

      if (i === -1) {
        break;
      }

      if (
        (isDigit(cleanInput[i - 1]) ||
          isConstantPrefix(cleanInput.slice(0, i))) &&
        cleanInput.slice(i - 3, i) !== 'lg2' &&
        cleanInput[i - 1] !== '*'
      ) {
        cleanInput = `${cleanInput.slice(0, i)}*${cleanInput.slice(i)}`;
      }

      p = i + 1;
    }

    p = 0;

    while (p < cleanInput.length) {
      const i = cleanInput.indexOf(')', p);

      if (i === -1) {
        break;
      }

      p = i + 1;

      if (
        (isDigit(cleanInput[p]) || isConstantSuffix(cleanInput.slice(p))) &&
        cleanInput[p] !== '*'
      ) {
        cleanInput = `${cleanInput.slice(0, p)}*${cleanInput.slice(p)}`;
      }
    }

    cleanInput = cleanInput
      .replace(/lg2(e)/g, Math.LOG2E.toString())
      .replace(/log(e)/g, Math.LOG10E.toString())
      .replace(/ln(10)/g, Math.LN10.toString())
      .replace(/ln(2)/g, Math.LN2.toString())
      .replace(/-1\/ϕ/g, ((1 - Math.sqrt(5)) / 2).toString())
      .replace(/√2/g, Math.SQRT2.toString())
      .replace(/√½/g, Math.SQRT1_2.toString())
      .replace(/ϕ/g, ((1 + Math.sqrt(5)) / 2).toString())
      .replace(/e/g, Math.E.toString())
      .replace(/π/g, Math.PI.toString())
      .replace(/÷/g, '/')
      .replace(/×/g, '*')
      .replace(/−/g, '-')
      .replace(/\^/g, '**')
      .replace(/--/g, '- -');

    // Insert Math.(f)unc and delete old one of length j if given, from position i
    const cleanInputFunc = (s: string, i: number, f = '', l = 0) =>
      `${s.slice(0, i)}Math.${f}${s.slice(i + (f ? l : 0))}`;

    MATH_FUNCS.forEach(f => {
      let p = 0;

      while (p < cleanInput.length) {
        const i = cleanInput.indexOf(f, p);

        if (i === -1) {
          return;
        }

        const l = f.length;
        let q = 0;

        if (cleanInput.slice(i, i + l) === `${f}`) {
          switch (f) {
            case 'ln':
              cleanInput = cleanInputFunc(cleanInput, i, 'log', 2);
              q = 8; // Math.log
              break;

            case 'log':
              cleanInput = cleanInputFunc(cleanInput, i, 'log10', 3);
              q = 10; // Math.log10
              break;

            case 'lg2':
              cleanInput = cleanInputFunc(cleanInput, i, 'log2', 3);
              q = 9; // Math.log2
              break;

            case '³√':
              cleanInput = cleanInputFunc(cleanInput, i, 'cbrt', 2);
              q = 9; // Math.cbrt
              break;

            case '√':
              cleanInput = cleanInputFunc(cleanInput, i, 'sqrt', 1);
              q = 9; // Math.sqrt
              break;

            case 'acos':
            case 'asin':
            case 'atan':
              if (cleanInput[i + l] !== 'h') {
                if (options?.radians) {
                  cleanInput = cleanInputFunc(cleanInput, i);
                  q = 5; // Math.
                } else {
                  let a = cleanInput.slice(0, i);

                  if (isConstantPrefix(a) || isDigit(a[i - 1])) {
                    a = `${a}*`;
                  }

                  cleanInput = `${a}(180/Math.PI)*${cleanInputFunc(
                    cleanInput.slice(i),
                    0,
                  )}`;
                  q = 19 + l; // (180/Math.PI)*Math. + func length
                }
              }
              break;

            case 'cos':
            case 'sin':
            case 'tan':
              if (
                i === 0 ||
                !(cleanInput[i - 1] === 'a' || cleanInput[i + l] === 'h')
              ) {
                if (options?.radians) {
                  cleanInput = cleanInputFunc(cleanInput, i);
                  q = 5; // Math.
                } else {
                  cleanInput = `${cleanInput.slice(
                    0,
                    i,
                  )}Math.${cleanInput.slice(
                    i,
                    i + l + 1,
                  )}Math.PI/180*${cleanInput.slice(i + l + 1)}`;
                  q = 17; // Math. + Math.PI/180*
                }
              }
              break;

            case 'cosh':
            case 'sinh':
            case 'tanh':
              if (i === 0 || cleanInput[i - 1] !== 'a') {
                cleanInput = cleanInputFunc(cleanInput, i);
                q = 5; // Math.
              }
              break;

            default:
              cleanInput = cleanInputFunc(cleanInput, i);
              q = 5; // Math.
          }
        }

        p = i + 1 + q;
      }
    });

    MATH_FUNCS_2.forEach(f => {
      let p = 0;

      while (p < cleanInput.length) {
        const i = cleanInput.indexOf(f, p);

        if (i === -1) {
          return;
        }

        const l = f.length;
        let q = 0;

        if (
          p < cleanInput.length &&
          (isDigit(cleanInput[i - 1]) ||
            isConstantSuffix(cleanInput.slice(i - 1))) &&
          cleanInput[i - 1] !== '*'
        ) {
          cleanInput = `${cleanInput.slice(0, i)}*${cleanInput.slice(i)}`;
          q = 1;
        }

        p = i + l + q;
      }
    });

    const output = eval(cleanInput);

    if (isError(output)) {
      return i18n.t('calc.error');
    }

    const result = tidyResult(output);

    if (options?.log) {
      createPost(input, result).then(success => {
        if (success) {
          options.callback?.();
        }
      });
    }

    return result;
  } catch (e) {
    console.log(e);
  }

  return i18n.t('calc.error');
};

export const euler = (input: string): string => constant(input, 'e');

export const exp = (input: string): string => calculate(input, Math.exp);

export const expm1 = (input: string): string => calculate(input, Math.expm1);

export const floor = (input: string): string => calculate(input, Math.floor);

export const fround = (input: string): string => calculate(input, Math.fround);

export const golden = (input: string): string => constant(input, 'ϕ');

export const golden2 = (input: string): string => constant(input, '-1/ϕ');

export const inverse = (input: string): string =>
  calculate(input, (n: number) => (n === 0 ? 0 : 1 / n));

export const isConstantPrefix = (input: string): boolean => {
  let found = false;

  for (let i = 0, l = MATH_CONSTANTS.length; i < l; i++) {
    const item = MATH_CONSTANTS[i];

    if (input.endsWith(item)) {
      found = true;
      break;
    }
  }

  return found;
};

export const isConstantSuffix = (input: string): boolean => {
  let found = false;

  for (let i = 0, l = MATH_CONSTANTS.length; i < l; i++) {
    const item = MATH_CONSTANTS[i];

    if (input.startsWith(item)) {
      found = true;
      break;
    }
  }

  return found;
};

export const isDigit = (char?: string): boolean => {
  if (!char) {
    return false;
  }

  switch (char) {
    case '0':
    case '1':
    case '2':
    case '3':
    case '4':
    case '5':
    case '6':
    case '7':
    case '8':
    case '9':
      return true;
    default:
  }

  return false;
};

export const isDigitOrSymbol = (char: string, sym: string): boolean => {
  const digit = isDigit(char);

  return digit ? true : char === sym;
};

export const isOp = (char: string): boolean => {
  switch (char) {
    case '÷':
    case '/':
    case '×':
    case '+':
    case '−':
    case '^':
    case '%':
    case '(':
    case '.':
      return true;
    default:
  }

  return false;
};

export const isError = (input: unknown): boolean => {
  if (input === undefined || input === null) {
    return true;
  }

  switch (typeof input) {
    case 'number':
      if (input === -Infinity || input === Infinity || isNaN(input)) {
        return true;
      }
      break;

    case 'string':
      const stringInput = input.toLowerCase();
      return stringInput.includes('error') || stringInput.includes('nan');

    default:
  }

  return false;
};

export const ln2 = (input: string): string => constant(input, 'ln(2)');

export const ln10 = (input: string): string => constant(input, 'ln(10)');

export const log = (input: string): string => constant(input, 'ln(');

export const log_f = (input: string): string => calculate(input, Math.log);

export const log1p = (input: string): string => calculate(input, Math.log1p);

export const log2 = (input: string): string => constant(input, 'lg2(');

export const log2_f = (input: string): string => calculate(input, Math.log2);

export const log2e = (input: string): string => constant(input, 'lg2(e)');

export const log10 = (input: string): string => constant(input, 'log(');

export const log10_f = (input: string): string => calculate(input, Math.log10);

export const log10e = (input: string): string => constant(input, 'log(e)');

export const memoryAdd = (
  memory: string,
  output: string,
  options: {
    callback: () => void;
    radians: boolean;
  },
): string => {
  const result = Number(memory) + Number(equals(output, options));
  return result.toString();
};

export const memorySubtract = (
  memory: string,
  output: string,
  options: {
    callback: () => void;
    radians: boolean;
  },
): string => {
  const result = Number(memory) - Number(equals(output, options));
  return result.toString();
};

export const negate = (input: string): string =>
  calculate(input, (n: number) => n * -1);

export const percent = (
  input: string,
  options: {
    radians: boolean;
  },
): string => {
  try {
    const calculate = () => {
      const lastOp = lastOpFlag(input);

      if (lastOp === -1) {
        return input;
      }

      const percentage =
        Number(equals(input.slice(lastOp + 1), {...options})) / 100;

      if (isNaN(percentage) || !percentage) {
        return input;
      }

      const lastOpInput = input.slice(0, lastOp);
      const beforeLastOp = lastOpFlag(lastOpInput);

      const lastLeftBracket = lastOpInput.lastIndexOf('(');
      const lastRightBracket = lastOpInput.lastIndexOf(')');

      const brackets =
        lastRightBracket === beforeLastOp && lastLeftBracket < lastRightBracket;

      const totalInput = brackets
        ? input.slice(lastLeftBracket, lastRightBracket + 1)
        : input.slice(beforeLastOp + 1, lastOp);

      const total = Number(equals(totalInput, {...options}));

      if (isNaN(total) || !total) {
        return input;
      }

      const percentageTotal = total * percentage;

      const op = input[lastOp]
        .replace(/÷/g, '/')
        .replace(/×/g, '*')
        .replace(/−/g, '-');

      let result = 0;

      switch (op) {
        case '/':
          result = total / percentage;
          break;
        case '*':
          result = total * percentage;
          break;
        case '+':
          result = total + percentageTotal;
          break;
        case '-':
          result = total - percentageTotal;
          break;
        default:
      }

      return beforeLastOp === -1
        ? `${result}`
        : `${input.slice(
            0,
            brackets ? lastLeftBracket : beforeLastOp + 1,
          )}${result}`;
    };

    if (!input) {
      return input;
    }

    const lastChar = input.slice(-1);

    if (lastChar === '.') {
      return input;
    }

    const lastOp = lastOpFlag(input);

    if (!lastOp || lastOp === input.length - 1) {
      return input;
    }

    return calculate();
  } catch (e) {
    console.log(e);
  }

  return input;
};

export const pie = (input: string): string => constant(input, 'π');

export const rand = (input: string): string =>
  constant(input, Math.random().toString());

export const round = (input: string): string => calculate(input, Math.round);

export const sin = (input: string): string => constant(input, 'sin(');

export const sin2 = (input: string): string => calculate(input, Math.sin);

export const sinh = (input: string): string => constant(input, 'sinh(');

export const sinh2 = (input: string): string => calculate(input, Math.sinh);

export const speakInput = (input: string, speech: boolean): void => {
  if (speech) {
    speak(input);
  }
};

export const square = (input: string): string =>
  calculate(input, (n: number) => n ** 2);

export const sqrt = (input: string): string => constant(input, '√(');

export const sqrt_f = (input: string): string => calculate(input, Math.sqrt);

export const sqrt1_2 = (input: string): string => constant(input, '√½');

export const sqrt2 = (input: string): string => constant(input, '√2');

export const tan = (input: string): string => constant(input, 'tan(');

export const tan2 = (input: string): string => calculate(input, Math.tan);

export const tanh = (input: string): string => constant(input, 'tanh(');

export const tanh2 = (input: string): string => calculate(input, Math.tanh);

export const toDegrees = (input: string): string =>
  calculate(input, (n: number) => (n * 180) / Math.PI);

export const toRadians = (input: string): string =>
  calculate(input, (n: number) => (n * Math.PI) / 180);

export const trunc = (input: string): string => calculate(input, Math.trunc);

const calculate = (input: string, func: (x: number) => number): string => {
  try {
    if (!input) {
      return '';
    }

    const lastChar = input.slice(-1);

    if (lastChar === '.') {
      return input;
    }

    const lastOp = lastOpFlag(input);

    if (!lastOp || lastOp === input.length - 1) {
      return input;
    }

    const output = func(Number(equals(input.slice(lastOp + 1))));

    if (isError(output)) {
      return i18n.t('calc.error');
    }

    const result = `${input.slice(0, lastOp + 1)}${tidyResult(output)}`;
    const i = result.indexOf('.');

    if (i === -1) {
      return result;
    }

    const fraction = result.slice(i + 1);
    const firstChar = fraction[0];

    if (firstChar === '0' || firstChar === '9') {
      const same = fraction.split('').every((c: string) => c === firstChar);

      if (same) {
        return Math.round(Number(result)).toString();
      }
    }

    return result;
  } catch (e) {
    console.log(e);
  }

  return '';
};

const constant = (input: string, c: string) => {
  try {
    if (!input) {
      return '';
    }

    const lastChar = input.slice(-1);

    if (lastChar === '.') {
      return input;
    }

    if (!input || input === '0') {
      return c;
    }

    return `${input}${c}`;
  } catch (e) {
    console.log(e);
  }

  return '';
};

const lastOpFlag = (input: string) => {
  if (!input) {
    return -1;
  }

  const lastOp = [
    input.lastIndexOf('÷'),
    input.lastIndexOf('/'),
    input.lastIndexOf('×'),
    input.lastIndexOf('+'),
    input.lastIndexOf('−'),
    input.lastIndexOf('%'),
    input.lastIndexOf('^'),
    input.lastIndexOf('('),
    input.lastIndexOf(')'),
  ].filter(i => i >= 0);

  return lastOp?.length ? Math.max(...lastOp) : -1;
};

const tidyResult = (input: number) => {
  try {
    const result = input
      .toPrecision(store.getState().config.precision)
      .toLowerCase();

    if (result.includes('e')) {
      return result.replace(/e/g, 'E');
    }

    const i = result.indexOf('.');

    if (i === -1) {
      return result;
    }

    const fraction = result.slice(i + 1);

    if (!fraction) {
      return result;
    }

    // remove trailing zeros
    let j = fraction.length - 1;
    let lastChar = fraction[j];

    while (j >= 0 && lastChar === '0') {
      lastChar = fraction[--j];
    }

    const int = `${result.slice(0, i)}`;
    return j === -1 ? int : `${int}.${fraction.slice(0, j + 1)}`;
  } catch (e) {
    console.log(e);
  }

  return input.toString();
};
