import React, { useRef } from "react";
import { ScrollView, StyleSheet, TextInput, View } from "react-native";
import * as Yup from "yup";
import AppButton from "../components/AppButton";
import AppText from "../components/AppText";
import {
  AppForm,
  AppFormField,
  AppFormErrorMessage,
  SubmitButton,
} from "../components/Form";
import Screen from "../components/Screen";
import useThemeColors from "../hooks/useThemeColors";

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required().label("Email"),
  password: Yup.string().required().label("Password"),
});

const LoginScreen = () => {
  const colors = useThemeColors();
  const passwordInputRef = useRef<TextInput>(null);

  return (
    <Screen headerShown style={{ backgroundColor: colors.background }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        <AppText style={styles.title}>Welcome back to Splitwise!</AppText>
        <AppForm
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={(values) => console.log(values)}
        >
          <AppFormErrorMessage />
          <View style={styles.form}>
            <AppFormField
              autoFocus
              style={styles.inputGroup}
              onSubmitEditing={() => passwordInputRef.current?.focus()}
              blurOnSubmit={false}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              textContentType="emailAddress"
              returnKeyType="next"
              label="Email address"
              name="email"
            />
            <AppFormField
              ref={passwordInputRef}
              textContentType="password"
              autoComplete="password"
              autoCorrect={false}
              secureTextEntry={true}
              style={styles.inputGroup}
              label="Password"
              name="password"
            />
          </View>
          <View style={styles.btnContainer}>
            <SubmitButton
              ripple
              title="Log in"
              style={styles.loginBtn}
              textStyle={styles.loginBtnText}
            />
            <AppButton
              ripple
              textStyle={[styles.forgotPassBtnTxt, { color: colors.secondary }]}
              style={styles.forgotPassBtn}
              title="Forgot your password?"
            />
          </View>
        </AppForm>
      </ScrollView>
    </Screen>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flexGrow: 1,
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
