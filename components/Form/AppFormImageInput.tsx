import React, { FC } from "react";
import { FormikValues, useFormikContext } from "formik";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import AppImageInput from "../AppImageInput";

export type AppFormImageInputProps = {
  name: string;
  style?: StyleProp<ViewStyle>;
  size?: number;
};

const AppFormImageInput: FC<AppFormImageInputProps> = ({
  name,
  style,
  size,
}) => {
  const { values, setFieldValue } = useFormikContext<FormikValues>();
  const imageUri = values[name];

  const handleChange = (imageUri: string) => {
    setFieldValue(name, imageUri);
  };

  return (
    <View style={style}>
      <AppImageInput
        imageUri={imageUri}
        onChangeImage={handleChange}
        size={size || 120}
      />
    </View>
  );
};

export default AppFormImageInput;

const styles = StyleSheet.create({});
