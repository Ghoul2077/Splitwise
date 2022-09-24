import React from "react";
import { StyleSheet, View } from "react-native";
import AppButton from "../components/AppButton";
import AppText from "../components/AppText";
import AppTextInput from "../components/AppTextInput";
import Screen from "../components/Screen";
import useThemeColors from "../hooks/useThemeColors";

const LoginScreen = () => {
  const colors = useThemeColors();

  return (
    <Screen
      headerShown
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <AppText style={styles.title}>Welcome back to Splitwise!</AppText>
      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <AppText style={styles.label}>Email address</AppText>
          <AppTextInput
            focusedProps={{
              style: [styles.input, { borderBottomColor: colors.primary }],
            }}
            style={[styles.input, { borderBottomColor: colors.white }]}
            fontStyle={styles.inputTxt}
          />
        </View>
        <View>
          <AppText style={styles.label}>Password</AppText>
          <AppTextInput
            focusedProps={{
              style: [styles.input, { borderBottomColor: colors.primary }],
            }}
            style={[styles.input, { borderBottomColor: colors.white }]}
            fontStyle={styles.inputTxt}
          />
        </View>
      </View>
      <View style={styles.btnContainer}>
        <AppButton
          ripple
          style={styles.loginBtn}
          textStyle={styles.loginBtnText}
          title="Log in"
        />
        <AppButton
          ripple
          textStyle={[styles.forgotPassBtnTxt, { color: colors.secondary }]}
          style={styles.forgotPassBtn}
          title="Forgot your password?"
        />
      </View>
    </Screen>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 21,
    marginBottom: 25,
    marginTop: 10,
  },
  btnContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  loginBtn: {
    paddingHorizontal: 55,
    paddingVertical: 12,
    borderRadius: 5,
    marginBottom: 15,
  },
  loginBtnText: {
    fontSize: 17,
    fontWeight: "500",
  },
  forgotPassBtn: {
    backgroundColor: "transparent",
  },
  forgotPassBtnTxt: {
    fontSize: 17,
    fontWeight: "500",
  },
  form: {
    marginBottom: 25,
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
  inputGroup: {
    marginBottom: 10,
  },
  label: {
    fontSize: 12.5,
  },
});
