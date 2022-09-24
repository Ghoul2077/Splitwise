import React, { FC } from "react";
import { StyleSheet, Image, StyleProp, ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Constants from "expo-constants";

export interface ScreenProps {
  headerShown?: boolean;
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}

const Screen: FC<ScreenProps> = ({ headerShown = false, children, style }) => {
  return (
    <SafeAreaView
      style={[styles.screen, headerShown && styles.screenPadding, style]}
    >
      {children}
    </SafeAreaView>
  );
};

export default Screen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  screenPadding: {
    paddingTop: -(Constants.statusBarHeight + 2.5),
  },
});
