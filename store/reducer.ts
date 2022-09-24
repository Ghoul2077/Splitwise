import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import themeReducer from "./reducers/theme";
import firstRunReducer from "./reducers/firstRun";
import settingsReducer from "./reducers/settings";
import favouriteReducer from "./reducers/settings";
import persistConfig from "./config/persistConfig";

const combinedReducer = combineReducers({
  theme: themeReducer,
  firstRun: firstRunReducer,
});

export default persistReducer(persistConfig, combinedReducer);
