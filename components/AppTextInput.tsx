import React, { forwardRef, ReactNode, useState } from "react";
import {
  GestureResponderEvent,
  Pressable,
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import useThemeColors from "../hooks/useThemeColors";

export interface AppTextInputProps extends TextInputProps {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  onPressIcon?: (event: GestureResponderEvent) => void;
  style?: StyleProp<ViewStyle>;
  fontStyle?: StyleProp<TextStyle>;
}

export interface AppTextInputPropsWithFocusedProps extends AppTextInputProps {
  focusedProps?: AppTextInputProps;
}

const AppTextInput = forwardRef<TextInput, AppTextInputPropsWithFocusedProps>(
  (
    {
      leftIcon: LeftIcon,
      rightIcon: RightIcon,
      onPressIcon,
      style,
      fontStyle,
      focusedProps,
      onFocus,
      onBlur,
      ...others
    },
    ref
  ) => {
    const {
      style: focusedStyle,
      fontStyle: focusedFontStyle,
      onPressIcon: focusedOnPressIcon,
      rightIcon: FocusedRightIcon,
      leftIcon: FocusedLeftIcon,
      ...otherFocusedProps
    } = focusedProps || {};
    const colors = useThemeColors();
    const [isFocused, setIsFocused] = useState(false);

    return (
      <View
        style={[
          styles.container,
          { backgroundColor: colors.grey },
          style,
          isFocused && focusedStyle,
        ]}
      >
        {isFocused && !!FocusedLeftIcon ? FocusedLeftIcon : LeftIcon}
        <TextInput
          ref={ref}
          onFocus={(props) => {
            setIsFocused(true);
            if (onFocus) onFocus(props);
          }}
          onBlur={(props) => {
            setIsFocused(false);
            if (onBlur) onBlur(props);
          }}
          style={[
            styles.input,
            { color: colors.text },
            fontStyle,
            isFocused && focusedFontStyle,
          ]}
          {...others}
          {...(isFocused ? otherFocusedProps : {})}
        />
        <Pressable
          onPress={
            isFocused && !!focusedOnPressIcon ? focusedOnPressIcon : onPressIcon
          }
        >
          {isFocused && !!FocusedRightIcon ? FocusedRightIcon : RightIcon}
        </Pressable>
      </View>
    );
  }
);

export default AppTextInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 25,
    marginVertical: 10,
    padding: 10,
  },
  input: {
    flex: 1,
    fontSize: 18,
    marginLeft: 10,
  },
});
