import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useRef, FC } from "react";
import { Image, ScrollView, StyleSheet, TextInput, View } from "react-native";
import * as Yup from "yup";
import AppButton from "../components/AppButton";
import AppText from "../components/AppText";
import {
  AppForm,
  AppFormField,
  AppFormErrorMessage,
  AppFormImageInput,
  AppFormPicker,
  SubmitButton,
} from "../components/Form";
import Screen from "../components/Screen";
import useThemeColors from "../hooks/useThemeColors";
import { MainStackParamsList } from "../navigation/types";

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required().label("Email"),
  password: Yup.string().required().label("Password"),
  name: Yup.string().required().label("name"),
  phone: Yup.number().label("Phone"),
});

export type SignupScreenProps = {
  navigation: NativeStackNavigationProp<MainStackParamsList>;
};

const SignupScreen: FC<SignupScreenProps> = ({ navigation }) => {
  const colors = useThemeColors();
  const passwordInputRef = useRef<TextInput>(null);

  return (
    <Screen style={{ backgroundColor: colors.background }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        <View style={styles.header}>
          <Image
            style={styles.logo}
            source={require("../assets/images/appicon.png")}
            resizeMode="cover"
            resizeMethod="resize"
          />
          <AppText style={styles.title}>Splitwise</AppText>
        </View>
        <AppForm
          initialValues={{ email: "", password: "", profileImage: "" }}
          validationSchema={validationSchema}
          onSubmit={(values) => console.log(values)}
        >
          <AppFormErrorMessage />
          <AppFormField
            autoFocus
            style={styles.input}
            fontStyle={styles.inputTxt}
            placeholder="Full name"
            placeholderTextColor={colors.text_light}
            autoCapitalize="none"
            autoCorrect={false}
            textContentType="name"
            returnKeyType="next"
            name="name"
          />
          <View style={styles.dataContainer}>
            <AppFormImageInput
              size={110}
              style={styles.imageInput}
              name="profileImage"
            />
            <View style={styles.dataInputWrapper}>
              <AppFormField
                fontStyle={styles.inputTxt}
                onSubmitEditing={() => passwordInputRef.current?.focus()}
                blurOnSubmit={false}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                textContentType="emailAddress"
                returnKeyType="next"
                placeholder="Email address"
                placeholderTextColor={colors.text_light}
                name="email"
              />
              <AppFormField
                ref={passwordInputRef}
                textContentType="password"
                autoComplete="password"
                autoCorrect={false}
                secureTextEntry={true}
                style={styles.input}
                fontStyle={styles.inputTxt}
                placeholder="Password"
                placeholderTextColor={colors.text_light}
                name="password"
              />
            </View>
          </View>
          <View style={styles.phoneInputContainer}>
            <AppFormPicker
              style={styles.inputPicker}
              headerText="Choose a country"
              title={({ selection }) => (
                <AppText style={styles.pickerTxt}>+91</AppText>
              )}
              renderItem={() => null}
            />
            <AppFormField
              textContentType="telephoneNumber"
              autoComplete="tel"
              autoCorrect={false}
              style={[styles.input, styles.phoneInput]}
              fontStyle={styles.inputTxt}
              placeholder="Phone # (optional)"
              placeholderTextColor={colors.text_light}
              name="phone"
            />
          </View>
          <View style={styles.currencyContainer}>
            <AppText style={styles.currencyText}>
              I use INR (₹) as my currency.
            </AppText>
            <AppFormPicker
              style={styles.currencyBtn}
              headerText="Choose a currency"
              title={({ selection }) => (
                <AppText
                  style={[
                    styles.currencyText,
                    styles.currencyBtnText,
                    { color: colors.secondary },
                  ]}
                >
                  Change ≫
                </AppText>
              )}
              renderItem={() => null}
            />
          </View>
          <View style={styles.actionBtnContainer}>
            <AppButton
              ripple
              onPress={() => navigation.pop()}
              textStyle={styles.actionBtnTxt}
              style={[
                styles.actionBtn,
                styles.backBtn,
                { borderColor: colors.grey },
              ]}
              title="Back"
            />
            <SubmitButton
              ripple
              textStyle={styles.actionBtnTxt}
              style={[styles.actionBtn, { borderColor: colors.grey }]}
              title="Done"
            />
          </View>
        </AppForm>
        <View style={styles.tncContainer}>
          <AppText style={[styles.tnc, { color: colors.text_light }]}>
            By signing up, you accept the Splitwise Terms of Service.
          </AppText>
        </View>
      </ScrollView>
    </Screen>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    flexGrow: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  logo: {
    height: 40,
    width: 40,
    marginRight: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
  },
  input: {
    marginVertical: 10,
    position: "relative",
    paddingVertical: 3.25,
  },
  inputTxt: { fontSize: 16 },
  dataContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  imageInput: { marginRight: 15 },
  dataInputWrapper: { flex: 1 },
  phoneInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  phoneInput: { flex: 1 },
  inputPicker: {
    backgroundColor: "transparent",
    marginRight: 10,
  },
  pickerTxt: {
    fontSize: 16,
    paddingVertical: 3.25,
  },
  currencyContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
    marginBottom: 40,
  },
  currencyBtn: {
    borderBottomWidth: 0,
    paddingVertical: 0,
    marginVertical: 0,
  },
  currencyText: {
    fontSize: 16,
  },
  currencyBtnText: {
    fontWeight: "900",
  },
  actionBtnContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 25,
  },
  actionBtn: {
    borderRadius: 4,
    marginHorizontal: 18,
    paddingVertical: 10,
    paddingHorizontal: 45,
    borderBottomWidth: 3,
  },
  actionBtnTxt: {
    fontSize: 18,
    fontWeight: "600",
  },
  backBtn: {
    backgroundColor: "transparent",
    borderBottomWidth: 3,
    borderWidth: 1,
  },
  tncContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  tnc: {
    textDecorationLine: "underline",
    textAlign: "center",
    fontWeight: "500",
  },
});