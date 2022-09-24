import { createSlice } from "@reduxjs/toolkit";
import { ThemeType } from "../../constants/Colors";

const INITIAL_STATE = "light" as keyof ThemeType;

const slice = createSlice({
  name: "theme",
  initialState: INITIAL_STATE,
  reducers: {
    lightSelected: (_theme) => "light",
    darkSelected: (_theme) => "dark",
    toggleTheme: (theme) => (theme === "light" ? "dark" : "light"),
  },
});

export const { lightSelected, darkSelected, toggleTheme } = slice.actions;
export default slice.reducer;
