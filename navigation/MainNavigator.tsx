import React, { useEffect } from "react";
import * as SystemUI from "expo-system-ui";
import {
  NavigationContainer,
  useNavigationContainerRef,
} from "@react-navigation/native";
import { enableScreens } from "react-native-screens";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DefaultTheme } from "@react-navigation/native";
import useThemeColors from "../hooks/useThemeColors";
import { TabStack } from "./TabNavigator";
import { useAppDispatch, useAppSelector } from "../store/hook";
import { setFirstRunForScreen } from "../store/reducers/firstRun";
import { MainStackParamsList } from "./types";
import OnboardingScreen from "../screens/Onboarding";
import routes from "./routes";
import LoginScreen from "../screens/Login";
import { StyleSheet } from "react-native";
import SignupScreen from "../screens/Signup";

// This is the main stack where you would wrap up all other stack and serve to
// your app

enableScreens();

const MainStackNavigator = createNativeStackNavigator<MainStackParamsList>();

export default function Navigator() {
  const dispatch = useAppDispatch();

  const colors = useThemeColors();
  const navigationRef = useNavigationContainerRef();
  const firstRun = useAppSelector((state) => state.firstRun);

  useEffect(() => {
    SystemUI.setBackgroundColorAsync(colors.background);
  }, [colors]);

  return (
    <NavigationContainer
      ref={navigationRef}
      onStateChange={() => {
        const routeName = navigationRef.getCurrentRoute()?.name as routes;
        if (firstRun.screens[routeName])
          dispatch(setFirstRunForScreen({ screen: routeName }));
      }}
      theme={{
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          background: colors.background,
        },
      }}
    >
      <MainStackNavigator.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerShadowVisible: false,
          headerTitle: "",
          headerTintColor: colors.white,
        }}
      >
        <MainStackNavigator.Screen
          options={{ headerShown: false }}
          name={routes.ONBOARDING_SCREEN}
          component={OnboardingScreen}
        />
        <MainStackNavigator.Screen
          name={routes.LOGIN_SCREEN}
          component={LoginScreen}
        />
        <MainStackNavigator.Screen
          options={{ headerShown: false }}
          name={routes.SIGNUP_SCREEN}
          component={SignupScreen}
        />
        <MainStackNavigator.Screen name="Tabs" component={TabStack} />
      </MainStackNavigator.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
