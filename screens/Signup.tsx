import React, { useRef, FC, useState, memo } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  Image,
  ImageSourcePropType,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import * as Yup from "yup";
import "yup-phone";
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
import countryCode from "../assets/images/flags/country_code";
import countryCurrency from "../assets/data/country_currency";

export type CountryCodeOptionProps = {
  countryName: string;
  countryCode?: string;
  countryPrefix: string;
  countryFlag: ImageSourcePropType;
};

const CountryCodeOption: FC<CountryCodeOptionProps> = memo(
  ({ countryName, countryFlag, countryPrefix }) => {
    const colors = useThemeColors();

    return (
      <View style={styles.countryItem}>
        <View style={styles.countryFlagAndName}>
          <Image
            style={styles.countryFlag}
            source={countryFlag}
            resizeMode="cover"
            resizeMethod="resize"
          />
          {!!countryName && (
            <AppText numberOfLines={1} style={styles.countryName}>
              {countryName}
            </AppText>
          )}
        </View>
        {!!countryPrefix && (
          <AppText style={[styles.countryCode, { color: colors.text_light }]}>
            +{countryPrefix}
          </AppText>
        )}
      </View>
    );
  }
);

export type CountryCurrencyOptionProps = {
  countryName: string;
  currencyCode: string;
  currencyName: string;
  currencySymbol: string;
};

const CountryCurrencyOption: FC<CountryCurrencyOptionProps> = memo(
  ({ countryName, currencyCode, currencyName, currencySymbol }) => {
    const colors = useThemeColors();

    return (
      <View style={styles.currencyItem}>
        <AppText style={styles.currencyData}>
          {countryName} {currencyName} ({currencySymbol})
        </AppText>
        <AppText style={[styles.currencyCode, { color: colors.text_light }]}>
          {currencyCode}
        </AppText>
      </View>
    );
  }
);

const defaultValidationSchema = {
  email: Yup.string().email().required().label("Email"),
  password: Yup.string().required().label("Password"),
  name: Yup.string().required().label("Name"),
  phone: Yup.number().label("Phone").typeError("Not a valid phone number"),
  currency: Yup.object().label("Currency").required(),
  dialCode: Yup.object()
    .label("Dial Code")
    .when("phone", {
      is: (val: any) => !!val,
      then: Yup.object().required("Choose a dial code for you phone number"),
    }),
};

export type SignupScreenProps = {
  navigation: NativeStackNavigationProp<MainStackParamsList>;
};

const SignupScreen: FC<SignupScreenProps> = ({ navigation }) => {
  const colors = useThemeColors();
  const [countryCodes] = useState<typeof countryCode>(countryCode);
  const [countryCurrencies] = useState<typeof countryCurrency>(countryCurrency);
  const [validationSchema, setValidationSchema] = useState<{
    [key: string]: any;
  }>(defaultValidationSchema);

  const emailRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const phoneRef = useRef<TextInput>(null);

  return (
    <Screen style={{ backgroundColor: colors.background }}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
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
          validationSchema={Yup.object().shape(validationSchema)}
          onSubmit={(values) => console.log(values)}
        >
          <AppFormErrorMessage />
          <AppFormField
            autoFocus
            style={styles.input}
            onSubmitEditing={() => emailRef.current?.focus()}
            blurOnSubmit={false}
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
                ref={emailRef}
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
                onSubmitEditing={() => phoneRef.current?.focus()}
                blurOnSubmit={false}
                textContentType="password"
                autoComplete="password"
                returnKeyType="next"
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
              name="dialCode"
              style={styles.inputPicker}
              onSelectionChange={(newSelection: any) => {
                setValidationSchema((prevSchema) => ({
                  ...prevSchema,
                  phone: Yup.string()
                    .phone(
                      newSelection.code,
                      false,
                      `Phone must be valid number from ${newSelection.name} region`
                    )
                    .label("Phone")
                    .notRequired(),
                }));
              }}
              initialData={countryCodes}
              headerText="Choose a country"
              title={({ selection }) => (
                <View style={styles.countryCodeTitle}>
                  {selection?.flag && (
                    <Image
                      style={styles.smallCountryFlag}
                      source={selection.flag}
                      resizeMode="cover"
                      resizeMethod="resize"
                    />
                  )}
                  <AppText style={styles.pickerTxt}>
                    +{selection?.dial_code}
                  </AppText>
                </View>
              )}
              renderItem={({ item }) => (
                <CountryCodeOption
                  countryPrefix={item.dial_code}
                  countryFlag={item.flag}
                  countryName={item.name}
                />
              )}
              dataKeys={["name", "dial_code", "code"]}
            />
            <AppFormField
              ref={phoneRef}
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
            <AppFormPicker
              name="currency"
              style={styles.currencyBtn}
              headerText="Choose a currency"
              initialData={countryCurrencies}
              title={({ selection }) => (
                <View style={styles.currencyTextContainer}>
                  <AppText style={styles.currencyText}>
                    I use{" "}
                    {selection
                      ? `${selection.name} (${selection.symbol})`
                      : "___"}{" "}
                    as my currency.
                  </AppText>
                  <AppText
                    style={[
                      styles.currencyText,
                      styles.currencyBtnText,
                      { color: colors.secondary },
                    ]}
                  >
                    Change ≫
                  </AppText>
                </View>
              )}
              renderItem={({ item }) => (
                <CountryCurrencyOption
                  countryName={item.country}
                  currencyCode={item.code}
                  currencyName={item.name}
                  currencySymbol={item.symbol}
                />
              )}
              dataKeys={["country", "code", "name", "symbol"]}
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
    marginBottom: 10,
  },
  phoneInput: { flex: 1 },
  inputPicker: {
    paddingHorizontal: 0,
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
    marginBottom: 30,
  },
  currencyBtn: {
    paddingVertical: 10,
    borderRadius: 5,
    borderBottomWidth: 0,
    marginVertical: 0,
  },
  currencyText: {
    fontSize: 16,
  },
  currencyBtnText: {
    fontWeight: "900",
    marginLeft: 5,
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
  countryItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  countryCode: {
    fontSize: 17,
    fontWeight: "500",
    marginLeft: "auto",
  },
  countryFlagAndName: {
    flexGrow: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  countryFlag: {
    width: 45,
    height: 30,
    marginRight: 25,
  },
  countryName: {
    fontSize: 16,
  },
  smallCountryFlag: {
    width: 20,
    height: 25,
    marginRight: 10,
  },
  countryCodeTitle: {
    minWidth: 20,
    justifyContent: "space-around",
    flexDirection: "row",
    alignItems: "center",
  },
  currencyTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    minWidth: 275,
  },
  currencyItem: { paddingHorizontal: 15, paddingVertical: 10 },
  currencyData: { fontSize: 17.5, marginBottom: 3 },
  currencyCode: {
    fontSize: 15,
    textTransform: "uppercase",
  },
});
