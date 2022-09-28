import React from 'react';
import {DarkTheme, DefaultTheme} from 'react-native-paper';
import {Theme} from 'react-native-paper/lib/typescript/types';

type CalcTheme = {
  backgroundColor: string;
  buttonBack: {
    backgroundColor: string;
    color: string;
  };
  buttonClear: {
    backgroundColor: string;
    color: string;
  };
  buttonDigit: {
    backgroundColor: string;
    color: string;
  };
  buttonDot: {
    backgroundColor: string;
    color: string;
  };
  buttonEquals: {
    backgroundColor: string;
    color: string;
  };
  buttonExtra: {
    backgroundColor: string;
    color: string;
  };
  buttonMem: {
    backgroundColor: string;
    color: string;
  };
  buttonOp: {
    backgroundColor: string;
    color: string;
  };
  displayDigits: {
    color: string;
  };
  displayDigitsNeg: {
    color: string;
  };
};

const calcThemes: Record<string, CalcTheme> = {
  black: {
    backgroundColor: 'rgba(32, 32, 32, 1)',
    buttonBack: {
      backgroundColor: 'gray',
      color: 'white',
    },
    buttonClear: {
      backgroundColor: 'rgb(255,0,127)',
      color: 'white',
    },
    buttonDigit: {
      backgroundColor: 'rgb(0,128,255)',
      color: 'white',
    },
    buttonDot: {
      backgroundColor: 'gray',
      color: 'white',
    },
    buttonEquals: {
      backgroundColor: 'olivedrab',
      color: 'white',
    },
    buttonExtra: {
      backgroundColor: '#ff8080',
      color: 'white',
    },
    buttonMem: {
      backgroundColor: 'gray',
      color: 'white',
    },
    buttonOp: {
      backgroundColor: '#ff00ff',
      color: 'white',
    },
    displayDigits: {
      color: 'white',
    },
    displayDigitsNeg: {
      color: 'red',
    },
  },
  blue: {
    backgroundColor: 'rgba(0, 0, 255, 1)',
    buttonBack: {
      backgroundColor: 'cornflowerblue',
      color: 'white',
    },
    buttonClear: {
      backgroundColor: 'salmon',
      color: 'white',
    },
    buttonDigit: {
      backgroundColor: 'cadetblue',
      color: 'white',
    },
    buttonDot: {
      backgroundColor: 'cornflowerblue',
      color: 'white',
    },
    buttonEquals: {
      backgroundColor: 'mediumseagreen',
      color: 'white',
    },
    buttonExtra: {
      backgroundColor: 'cadetblue',
      color: 'white',
    },
    buttonMem: {
      backgroundColor: 'cornflowerblue',
      color: 'white',
    },
    buttonOp: {
      backgroundColor: 'deepskyblue',
      color: 'white',
    },
    displayDigits: {
      color: 'lightblue',
    },
    displayDigitsNeg: {
      color: 'red',
    },
  },
  cyan: {
    backgroundColor: 'rgba(0 ,255, 255, 1)',
    buttonBack: {
      backgroundColor: 'darkcyan',
      color: 'white',
    },
    buttonClear: {
      backgroundColor: 'lightcoral',
      color: 'white',
    },
    buttonDigit: {
      backgroundColor: 'midnightblue',
      color: 'white',
    },
    buttonDot: {
      backgroundColor: 'darkcyan',
      color: 'white',
    },
    buttonEquals: {
      backgroundColor: 'forestgreen',
      color: 'white',
    },
    buttonExtra: {
      backgroundColor: '#8080ff',
      color: 'white',
    },
    buttonMem: {
      backgroundColor: 'darkcyan',
      color: 'white',
    },
    buttonOp: {
      backgroundColor: 'steelblue',
      color: 'white',
    },
    displayDigits: {
      color: 'darkslategray',
    },
    displayDigitsNeg: {
      color: '#b00000',
    },
  },
  green: {
    backgroundColor: 'rgba(0, 255, 0, 1)',
    buttonBack: {
      backgroundColor: 'darkolivegreen',
      color: 'white',
    },
    buttonClear: {
      backgroundColor: 'lightcoral',
      color: 'white',
    },
    buttonDigit: {
      backgroundColor: 'olive',
      color: 'white',
    },
    buttonDot: {
      backgroundColor: 'darkolivegreen',
      color: 'white',
    },
    buttonEquals: {
      backgroundColor: 'green',
      color: 'white',
    },
    buttonExtra: {
      backgroundColor: 'olive',
      color: 'white',
    },
    buttonMem: {
      backgroundColor: 'darkolivegreen',
      color: 'white',
    },
    buttonOp: {
      backgroundColor: 'seagreen',
      color: 'white',
    },
    displayDigits: {
      color: 'darkgreen',
    },
    displayDigitsNeg: {
      color: '#600000',
    },
  },
  orange: {
    backgroundColor: 'rgba(255, 204, 153, 1)',
    buttonBack: {
      backgroundColor: 'brown',
      color: 'white',
    },
    buttonClear: {
      backgroundColor: 'red',
      color: 'white',
    },
    buttonDigit: {
      backgroundColor: 'orangered',
      color: 'white',
    },
    buttonDot: {
      backgroundColor: 'brown',
      color: 'white',
    },
    buttonEquals: {
      backgroundColor: 'green',
      color: 'white',
    },
    buttonMem: {
      backgroundColor: 'brown',
      color: 'white',
    },
    buttonExtra: {
      backgroundColor: 'orangered',
      color: 'white',
    },
    buttonOp: {
      backgroundColor: 'indianred',
      color: 'white',
    },
    displayDigits: {
      color: '#FF2000',
    },
    displayDigitsNeg: {
      color: '#b00000',
    },
  },
  pink: {
    backgroundColor: 'rgba(255, 192, 203, 1)',
    buttonBack: {
      backgroundColor: '#CD5C5C',
      color: 'white',
    },
    buttonClear: {
      backgroundColor: 'palevioletred',
      color: 'white',
    },
    buttonDigit: {
      backgroundColor: 'salmon',
      color: 'white',
    },
    buttonDot: {
      backgroundColor: '#CD5C5C',
      color: 'white',
    },
    buttonEquals: {
      backgroundColor: 'olivedrab',
      color: 'white',
    },
    buttonExtra: {
      backgroundColor: 'salmon',
      color: 'white',
    },
    buttonMem: {
      backgroundColor: '#CD5C5C',
      color: 'white',
    },
    buttonOp: {
      backgroundColor: 'maroon',
      color: 'white',
    },
    displayDigits: {
      color: '#d00000',
    },
    displayDigitsNeg: {
      color: '#d00000',
    },
  },
  purple: {
    backgroundColor: 'rgba(255, 0, 255, 1)',
    buttonBack: {
      backgroundColor: 'slateblue',
      color: 'white',
    },
    buttonClear: {
      backgroundColor: 'darkred',
      color: 'white',
    },
    buttonDigit: {
      backgroundColor: 'rgb(153,0,176)',
      color: 'white',
    },
    buttonDot: {
      backgroundColor: 'slateblue',
      color: 'white',
    },
    buttonEquals: {
      backgroundColor: 'darkolivegreen',
      color: 'white',
    },
    buttonExtra: {
      backgroundColor: 'rgb(153,0,176)',
      color: 'white',
    },
    buttonMem: {
      backgroundColor: 'indigo',
      color: 'white',
    },
    buttonOp: {
      backgroundColor: 'rgb(255,153,255)',
      color: 'white',
    },
    displayDigits: {
      color: 'white',
    },
    displayDigitsNeg: {
      color: '#a00000',
    },
  },
  red: {
    backgroundColor: 'rgba(255, 0, 0, 1)',
    buttonBack: {
      backgroundColor: '#6B0000',
      color: 'white',
    },
    buttonClear: {
      backgroundColor: 'darksalmon',
      color: 'white',
    },
    buttonDigit: {
      backgroundColor: 'salmon',
      color: 'white',
    },
    buttonDot: {
      backgroundColor: '#6B0000',
      color: 'white',
    },
    buttonEquals: {
      backgroundColor: 'yellowgreen',
      color: 'white',
    },
    buttonExtra: {
      backgroundColor: 'salmon',
      color: 'white',
    },
    buttonMem: {
      backgroundColor: '#6B0000',
      color: 'white',
    },
    buttonOp: {
      backgroundColor: 'rgb(255,153,51)',
      color: 'white',
    },
    displayDigits: {
      color: 'pink',
    },
    displayDigitsNeg: {
      color: '#300000',
    },
  },
  white: {
    backgroundColor: 'rgba(224, 224, 224, 1)',
    buttonBack: {
      backgroundColor: 'gray',
      color: 'white',
    },
    buttonClear: {
      backgroundColor: 'lightcoral',
      color: 'white',
    },
    buttonDigit: {
      backgroundColor: 'rgb(0,128,255)',
      color: 'white',
    },
    buttonDot: {
      backgroundColor: 'gray',
      color: 'white',
    },
    buttonEquals: {
      backgroundColor: 'olive',
      color: 'white',
    },
    buttonMem: {
      backgroundColor: 'gray',
      color: 'white',
    },
    buttonExtra: {
      backgroundColor: '#8080ff',
      color: 'white',
    },
    buttonOp: {
      backgroundColor: 'purple',
      color: 'white',
    },
    displayDigits: {
      color: 'black',
    },
    displayDigitsNeg: {
      color: 'red',
    },
  },
  yellow: {
    backgroundColor: 'rgba(255, 255, 0, 1)',
    buttonBack: {
      backgroundColor: 'darkolivegreen',
      color: 'white',
    },
    buttonClear: {
      backgroundColor: 'lightcoral',
      color: 'white',
    },
    buttonDigit: {
      backgroundColor: 'green',
      color: 'white',
    },
    buttonDot: {
      backgroundColor: 'darkolivegreen',
      color: 'white',
    },
    buttonEquals: {
      backgroundColor: 'green',
      color: 'white',
    },
    buttonExtra: {
      backgroundColor: 'olive',
      color: 'white',
    },
    buttonMem: {
      backgroundColor: 'darkolivegreen',
      color: 'white',
    },
    buttonOp: {
      backgroundColor: 'limegreen',
      color: 'white',
    },
    displayDigits: {
      color: 'olive',
    },
    displayDigitsNeg: {
      color: '#b00000',
    },
  },
};

export type AppTheme = Theme & {
  colors: {
    accent2: string;
    backgroundColor: string;
    backgroundColor2: string;
    backgroundColor3: string;
    modal: string;
    primary2: string;
    primary3: string;
  };
};

export const darkTheme: AppTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    accent2: '#018786',
    backgroundColor: DarkTheme.colors.background,
    backgroundColor2: 'rgba(40,40,40,1)',
    backgroundColor3: 'rgba(32,32,32,1)',
    modal: '#303030',
    primary2: '#3700b3',
    primary3: '#bb86fc',
  },
};

export const lightTheme: AppTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    accent2: '#018786',
    backgroundColor: DefaultTheme.colors.background,
    backgroundColor2: 'rgba(255, 255, 255, 1)',
    backgroundColor3: 'rgba(248, 248, 248, 1)',
    modal: '#f0f0f0',
    primary2: '#3700b3',
    primary3: '#bb86fc',
  },
};

export const getCalcTheme = (theme = 0): CalcTheme => {
  switch (theme) {
    default:
    case 0:
      return calcThemes.black;
    case 1:
      return calcThemes.red;
    case 2:
      return calcThemes.pink;
    case 3:
      return calcThemes.orange;
    case 4:
      return calcThemes.yellow;
    case 5:
      return calcThemes.green;
    case 6:
      return calcThemes.cyan;
    case 7:
      return calcThemes.blue;
    case 8:
      return calcThemes.purple;
    case 9:
      return calcThemes.white;
  }
};

export const isDarkTheme = (name: string): boolean => {
  return name.toLowerCase() === 'dark';
};

export const themes: Record<string, Record<string, string>> = {
  dark: {
    ...darkTheme.colors,
    actionButtonColor: darkTheme.colors.accent,
    backgroundColor: darkTheme.colors.background,
    backgroundColor2: 'rgba(40,40,40,1)',
    backgroundColor3: 'rgba(32,32,32,1)',
    barStyle: 'light-content',
    borderColor: '#383838',
    color: darkTheme.colors.text,
    color2: 'rgba(255, 255, 255, 0.60)',
    color3: 'rgba(255, 255, 255, 0.38)',
    color4: 'rgba(255, 255, 255, 0.80)',
    expandColor: darkTheme.colors.accent,
    highlight: '#303030',
    iconColor: darkTheme.colors.accent,
    link: darkTheme.colors.accent,
    modal: '#303030',
    name: 'dark',
    textInput: '#404040',
  },
  light: {
    ...lightTheme.colors,
    actionButtonColor: 'blue',
    backgroundColor: lightTheme.colors.background,
    backgroundColor2: 'rgba(255, 255, 255, 1)',
    backgroundColor3: 'rgba(248, 248, 248, 1)',
    barStyle: 'dark-content',
    borderColor: '#c0c0c0',
    color: lightTheme.colors.text,
    color2: 'rgba(0, 0, 0, 0.60)',
    color3: 'rgba(0, 0, 0, 0.38)',
    color4: 'rgba(0, 0, 0, 0.80)',
    expandColor: darkTheme.colors.primary2,
    highlight: '#f0f0f0',
    iconColor: lightTheme.colors.primary2,
    link: 'blue',
    modal: '#f0f0f0',
    name: 'light',
    textInput: '#eaeaea',
  },
};

export const ThemeContext = React.createContext({
  theme: themes.light,
  toggleTheme: Function,
});
