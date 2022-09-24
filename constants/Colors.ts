const common = {
  primary: "#009688",
  secondary: "#ACE4D6",
  error: "#FF697C",
  success: "#53B87F",
  grey: "#44474F",
  text: "#FFFFFF",
  text_light: "#BDC9D4",
  white: "#FFFFFF",
  black: "#000000",
  background: "#282D2F",
  ripple: "#464A4C",
  tabIconDefault: "#90A4AE",
};

export default {
  light: {
    ...common,
  },
  dark: {
    ...common,
  },
};

export interface ColorTypes {
  text: string;
  text_light: string;
  background: string;
  tabIconDefault: string;
  primary: string;
  secondary: string;
  error: string;
  success: string;
  grey: string;
  white: string;
  black: string;
  ripple: string;
}

export interface ThemeType {
  light: ColorTypes;
  dark: ColorTypes;
}
