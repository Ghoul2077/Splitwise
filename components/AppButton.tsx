import React, { forwardRef, Fragment, ReactNode } from "react";
import {
  Pressable,
  PressableAndroidRippleConfig,
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import AppText from "./AppText";
import useThemeColors from "../hooks/useThemeColors";

export interface AppButtonProps extends Omit<TouchableOpacityProps, "onPress"> {
  title?: string | React.ReactElement | React.ComponentType<any>;
  textStyle?: StyleProp<TextStyle>;
  leftIconName?: keyof typeof Ionicons.glyphMap;
  leftIcon?: ReactNode | JSX.Element;
  leftIconSize?: number;
  rightIconName?: keyof typeof Ionicons.glyphMap;
  rightIcon?: ReactNode | JSX.Element;
  rightIconSize?: number;
  iconSize?: number;
  iconColor?: string;
  containerStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  ripple?: boolean | (PressableAndroidRippleConfig & { overflow?: boolean });
  onPress?: Function;
  vibrationIntensity?: "Light" | "Medium" | "Heavy";
  numberOfLines?: number;
  gap?: number;
}

const AppButton = forwardRef<TouchableOpacity, AppButtonProps>(
  (
    {
      title: Title,
      textStyle,
      leftIconName,
      leftIcon: LeftIcon,
      leftIconSize,
      rightIconName,
      rightIcon: RightIcon,
      rightIconSize,
      iconSize = 30,
      iconColor = "white",
      style,
      containerStyle,
      ripple,
      onPress,
      numberOfLines,
      vibrationIntensity,
      gap,
      ...others
    },
    ref
  ) => {
    const colors = useThemeColors();
    const TouchableComponent: typeof Pressable | typeof TouchableOpacity =
      ripple ? Pressable : TouchableOpacity;
    const isRippleOverflowAllowed =
      typeof ripple == "object" && ripple?.overflow;
    const WrapperComponent: typeof Fragment | typeof View =
      isRippleOverflowAllowed ? Fragment : View;
    const flattenedStyle = StyleSheet.flatten(style);

    return (
      <WrapperComponent
        {...(!isRippleOverflowAllowed
          ? {
              style: [
                containerStyle,
                styles.overflowWrapper,
                {
                  borderRadius: flattenedStyle?.borderRadius ?? 10,
                  marginTop: flattenedStyle?.marginTop,
                  marginBottom: flattenedStyle?.marginBottom,
                  marginLeft: flattenedStyle?.marginLeft,
                  marginRight: flattenedStyle?.marginRight,
                  marginHorizontal: flattenedStyle?.marginHorizontal,
                  marginVertical: flattenedStyle?.marginVertical,
                  marginStart: flattenedStyle?.marginStart,
                  marginEnd: flattenedStyle?.marginEnd,
                  width: flattenedStyle?.width,
                },
              ],
            }
          : {})}
      >
        <TouchableComponent
          ref={ref}
          android_ripple={{
            color: colors.ripple,
            ...(typeof ripple === "object" ? ripple : {}),
          }}
          style={[
            styles.container,
            { backgroundColor: colors.primary },
            style,
            !isRippleOverflowAllowed && styles.overRideMargins,
          ]}
          onPress={async () => {
            if (vibrationIntensity)
              await Haptics.impactAsync(
                Haptics.ImpactFeedbackStyle[vibrationIntensity]
              );
            if (onPress) onPress();
          }}
          {...others}
        >
          {leftIconName && (
            <Ionicons
              name={leftIconName}
              size={leftIconSize || iconSize}
              color={iconColor}
            />
          )}
          {!leftIconName && <>{LeftIcon}</>}
          {typeof Title === "string" && (
            <AppText
              style={[
                styles.text,
                (leftIconName || rightIconName) && styles.textWithIcon,
                leftIconName &&
                  flattenedStyle?.flexDirection !== "column" && {
                    marginLeft: gap || 5,
                  },
                rightIconName &&
                  flattenedStyle?.flexDirection !== "column" && {
                    marginRight: gap || 5,
                  },
                textStyle,
              ]}
              numberOfLines={numberOfLines}
            >
              {Title}
            </AppText>
          )}
          {React.isValidElement(Title) && Title}
          {typeof Title === "function" && <Title />}
          {rightIconName && (
            <Ionicons
              name={rightIconName}
              size={rightIconSize || iconSize}
              color={iconColor}
            />
          )}
          {!rightIconName && <>{RightIcon}</>}
        </TouchableComponent>
      </WrapperComponent>
    );
  }
);

const styles = StyleSheet.create({
  overflowWrapper: {
    overflow: "hidden",
  },
  container: {
    padding: 10,
    borderRadius: 10,
    overflow: "hidden",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  text: {
    color: "white",
    fontSize: 15,
  },
  textWithIcon: {
    textAlign: "center",
    flexShrink: 0,
    flexGrow: 1,
  },
  overRideMargins: {
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    marginHorizontal: 0,
    marginVertical: 0,
    marginStart: 0,
    marginEnd: 0,
  },
});

export default AppButton;
