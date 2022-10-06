import React, { useState, useEffect } from "react";
import { FormikValues, useFormikContext } from "formik";
import { ScrollView, StyleSheet } from "react-native";
import useThemeColors from "../../hooks/useThemeColors";
import AppModalDialog from "../AppModalDialog";
import AppText from "../AppText";

const AppErrorMessage = () => {
  const colors = useThemeColors();
  const { errors, isSubmitting, isValid } = useFormikContext<FormikValues>();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (Object.keys(errors).length > 0 && !isValid && !isSubmitting) {
      setVisible(true);
    }
  }, [errors, isSubmitting, isValid]);

  return (
    <AppModalDialog
      mode="alert"
      animateAppear
      visible={visible}
      onClose={() => setVisible(false)}
      popupComponent={
        <ScrollView>
          <AppText style={[styles.errorMsg, { color: colors.text_light }]}>
            {errors[Object.keys(errors)[0]] as string}
          </AppText>
        </ScrollView>
      }
    />
  );
};

export default AppErrorMessage;

const styles = StyleSheet.create({
  errorMsg: {
    fontSize: 16,
    textTransform: "none",
  },
});
