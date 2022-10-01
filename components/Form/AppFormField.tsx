import React, { useRef, forwardRef, useImperativeHandle } from "react";
import {
  Pressable,
  StyleProp,
  StyleSheet,
  TextInput,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { FormikValues, useFormikContext } from "formik";
import AppTextInput, {
  AppTextInputPropsWithFocusedProps,
} from "../AppTextInput";
import AppText from "../AppText";
import useThemeColors from "../../hooks/useThemeColors";

export interface AppFormFieldProps extends AppTextInputPropsWithFocusedProps {
  name: string;
  label?: string;
  labelStyle?: StyleProp<TextStyle>;
  inputStyle?: StyleProp<ViewStyle>;
}

const AppFormField = forwardRef<TextInput | null, AppFormFieldProps>(
  (
    { name, style, label, labelStyle, inputStyle, fontStyle, ...otherProps },
    ref
  ) => {
    const colors = useThemeColors();
    const inputRef = useRef<TextInput>(null);
    const { handleChange, handleBlur, values, errors } =
      useFormikContext<FormikValues>();

    useImperativeHandle(ref, () => inputRef?.current as TextInput);

    return (
      <View style={style}>
        <Pressable onPress={() => inputRef.current?.focus()}>
          <AppText style={[styles.label, labelStyle]}>{label ?? name}</AppText>
        </Pressable>
        <AppTextInput
          ref={inputRef}
          onChangeText={handleChange(name)}
          onBlur={handleBlur(name)}
          value={values[name]}
          focusedProps={{
            style: !errors[name] && { borderBottomColor: colors.primary },
          }}
          style={[
            styles.input,
            { borderBottomColor: colors.white },
            inputStyle,
            !!errors[name] && { borderBottomColor: colors.error },
          ]}
          fontStyle={[styles.inputTxt, fontStyle]}
          {...otherProps}
        />
      </View>
    );
  }
);

export default AppFormField;

const styles = StyleSheet.create({
  label: {
    fontSize: 12.5,
    textTransform: "capitalize",
  },
  input: {
    backgroundColor: "transparent",
    borderBottomWidth: 1,
    paddingHorizontal: 0,
    paddingVertical: 3,
    borderRadius: 0,
  },
  inputTxt: {
    marginLeft: 0,
  },
});
