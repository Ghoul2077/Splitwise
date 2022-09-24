import React, { FC, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  Dimensions,
  Animated,
  StyleProp,
  ViewStyle,
  TextStyle,
} from "react-native";
import useThemeColors from "../hooks/useThemeColors";
import AppButton from "./AppButton";

const { width } = Dimensions.get("window");

export type SnackbarProps = {
  text: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  buttonText: string;
  buttonStyle?: StyleProp<TextStyle>;
  dismissTime: number;
  onDismiss: () => void;
  onPress: () => void;
  showProgressBar: boolean;
};

const Snackbar: FC<SnackbarProps> = ({
  text,
  style,
  textStyle,
  buttonText,
  buttonStyle,
  dismissTime,
  onDismiss,
  onPress,
  showProgressBar,
}) => {
  const colors = useThemeColors();
  const animatedOpacity = useRef(new Animated.Value(0)).current;
  const animatedWidth = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.sequence([
        Animated.timing(animatedOpacity, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.delay(dismissTime),
        Animated.timing(animatedOpacity, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
      ]),
      ...(showProgressBar
        ? [
            Animated.timing(animatedWidth, {
              toValue: 0,
              duration: dismissTime,
              useNativeDriver: true,
            }),
          ]
        : []),
    ]).start(onDismiss);
  }, [dismissTime]);

  return (
    <Animated.View
      style={[
        styles.snackbar,
        { backgroundColor: colors.grey },
        style,
        {
          opacity: animatedOpacity,
          transform: [
            {
              scale: animatedOpacity.interpolate({
                inputRange: [-1, 1],
                outputRange: [0.9, 1],
              }),
            },
          ],
        },
      ]}
    >
      <Text
        style={[
          styles.text,
          styles.textPartition,
          { color: colors.white },
          textStyle,
        ]}
      >
        {text}
      </Text>
      {!!buttonText && (
        <AppButton
          ripple
          title={buttonText}
          style={styles.button}
          textStyle={[styles.text, styles.actionButtonText, buttonStyle]}
          onPress={onPress}
        />
      )}
      {!buttonText && (
        <AppButton
          leftIconName="ios-close"
          vibrationIntensity="Light"
          iconSize={18}
          iconColor={colors.black}
          style={[styles.closeBtn, { backgroundColor: colors.white }]}
          onPress={onPress}
        />
      )}
      {showProgressBar && (
        <Animated.View
          style={[
            styles.indicator,
            {
              backgroundColor: colors.white,
              width,
              transform: [
                {
                  translateX: animatedWidth.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-width, 0],
                  }),
                },
              ],
            },
          ]}
        />
      )}
    </Animated.View>
  );
};

export default Snackbar;

const styles = StyleSheet.create({
  snackbar: {
    position: "absolute",
    bottom: 15,
    left: "50%",
    width: width * 0.95,
    marginLeft: -(width * 0.475),
    minHeight: 50,
    paddingRight: 10,
    paddingLeft: 15,
    paddingVertical: 5,
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 100,
    overflow: "hidden",
    flexDirection: "row",
    elevation: 5,
    borderRadius: 4,
  },
  text: {
    fontSize: 14,
  },
  textPartition: {
    maxWidth: "75%",
  },
  actionButtonText: {
    fontWeight: "500",
  },
  closeBtn: {
    borderRadius: 18,
    padding: 3,
  },
  button: {
    backgroundColor: "transparent",
    borderRadius: 4,
  },
  indicator: {
    position: "absolute",
    bottom: 0,
    height: 3,
  },
});
