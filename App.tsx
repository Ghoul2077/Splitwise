import React, { useEffect, useCallback } from "react";
import { LogBox, View, StyleSheet } from "react-native";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useAuthState } from "react-firebase-hooks/auth";
import Navigator from "./navigation/MainNavigator";
import useCachedResources from "./hooks/useCachedResources";
import createStore from "./store/configureStore";
import SnackbarProvider from "./contexts/SnackbarProvider";
import { auth } from "./config/firebase";
import Toast from "./components/Toast";

SplashScreen.preventAutoHideAsync();
const { store, persistor } = createStore();

export default function Initializer() {
  const cacheLoading = useCachedResources();
  const [user, firebaseLoading, firebaseError] = useAuthState(auth);

  useEffect(() => {
    LogBox.ignoreLogs(["Setting a timer for a long period of time"]);
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (!cacheLoading && !firebaseLoading) {
      await new Promise((resolve) => setTimeout(resolve, 200));
      await SplashScreen.hideAsync();
    }
  }, [cacheLoading, firebaseLoading]);

  useEffect(() => {
    if (firebaseError) {
      Toast(firebaseError.message);
      console.log(firebaseError.message);
    }
  }, [firebaseError]);

  if (cacheLoading || firebaseLoading) {
    return null;
  }

  return (
    <View style={styles.topLevelWrapper} onLayout={onLayoutRootView}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <SnackbarProvider>
            <Navigator isLoggedin={!!user && !firebaseError} />
          </SnackbarProvider>
        </PersistGate>
      </Provider>
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  topLevelWrapper: {
    flex: 1,
  },
});
