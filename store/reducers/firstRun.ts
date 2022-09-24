import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import routes from "../../navigation/routes";

export type firstRunType = {
  masterFlag: boolean;
  screens: {
    [key in routes]: boolean;
  };
};

const INITIAL_STATE: firstRunType = {
  masterFlag: true,
  screens: (Object.keys(routes) as Array<keyof typeof routes>).reduce(
    (acc, type) => {
      const value: routes = routes[type];
      acc[value] = true;
      return acc;
    },
    {} as { [key in routes]: boolean }
  ),
};

const slice = createSlice({
  name: "firstRun",
  initialState: INITIAL_STATE,
  reducers: {
    setFirstRun: (firstRun) => {
      if (firstRun.masterFlag) firstRun.masterFlag = false;
    },
    setFirstRunForScreen: (
      firstRun,
      action: PayloadAction<{ screen: routes }>
    ) => {
      const initialStateOfScreen = firstRun.screens[action.payload.screen];
      if (initialStateOfScreen) firstRun.screens[action.payload.screen] = false;
    },
    resetFirstRun: () => INITIAL_STATE,
  },
});

export const { setFirstRun, setFirstRunForScreen } = slice.actions;
export default slice.reducer;
