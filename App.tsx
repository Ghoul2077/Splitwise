import React, { useEffect } from "react";
import { LogBox } from "react-native";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import Navigator from "./navigation/MainNavigator";
import useCachedResources from "./hooks/useCachedResources";
import createStore from "./store/configureStore";
import SnackbarProvider from "./contexts/SnackbarProvider";

const { store, persistor } = createStore();

export default function Initializer() {
  const cacheLoading = useCachedResources();

  useEffect(() => {
    LogBox.ignoreLogs(["Setting a timer for a long period of time"]);
  }, []);

  useEffect(() => {
    if (cacheLoading) {
      SplashScreen.preventAutoHideAsync();
    } else {
      SplashScreen.hideAsync();
    }
  }, [cacheLoading]);

  if (cacheLoading) {
    return null;
  }

  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <SnackbarProvider>
            <Navigator />
          </SnackbarProvider>
        </PersistGate>
      </Provider>
      <StatusBar style="light" />
    </>
  );
}
