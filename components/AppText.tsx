import React, { FC } from "react";
import { Animated, StyleSheet, TextProps } from "react-native";
import useThemeColors from "../hooks/useThemeColors";

export interface AppTextProps extends Animated.AnimatedProps<TextProps> {}

const AppText: FC<AppTextProps> = ({ children, style, ...others }) => {
  const colors = useThemeColors();

  return (
    <Animated.Text
      style={[
        styles.text,
        {
          color: colors.text,
        },
        style,
      ]}
      {...others}
    >
      {children}
    </Animated.Text>
  );
};

const styles = StyleSheet.create({
  text: {},
});

export default AppText;
