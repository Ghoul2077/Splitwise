import React, { FC } from "react";
import { Image, StyleSheet, View } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import AppButton from "../components/AppButton";
import Screen from "../components/Screen";
import useThemeColors from "../hooks/useThemeColors";
import AppText from "../components/AppText";
import { MainStackParamsList } from "../navigation/types";
import routes from "../navigation/routes";

export type OnboardingScreenProps = {
  navigation: NativeStackNavigationProp<MainStackParamsList>;
};

const OnboardingScreen: FC<OnboardingScreenProps> = ({ navigation }) => {
  const colors = useThemeColors();

  return (
    <Screen style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require("../assets/images/appicon.png")}
          resizeMode="cover"
          resizeMethod="resize"
        />
        <AppText style={styles.appName}>Splitwise</AppText>
      </View>
      <View style={styles.actionContainer}>
        <AppButton
          ripple
          style={[
            styles.btn,
            { backgroundColor: colors.primary, borderWidth: 0 },
          ]}
          textStyle={styles.btnText}
          title="Sign up"
        />
        <AppButton
          ripple
          onPress={() => navigation.navigate(routes.LOGIN_SCREEN)}
          style={[styles.btn, { borderColor: colors.grey }]}
          textStyle={styles.btnText}
          title="Log in"
        />
        <AppButton
          ripple
          style={[styles.btn, { borderColor: colors.grey }]}
          textStyle={styles.btnText}
          leftIcon={
            <Ionicons
              style={styles.google}
              color={colors.white}
              size={22}
              name="logo-google"
            />
          }
          title="Sign in with Google"
        />
      </View>
      <View style={styles.tnc}>
        <AppButton
          textStyle={[styles.tncText, { color: colors.text_light }]}
          style={styles.tncBtn}
          title="Terms"
        />
        <AppText style={{ color: colors.text_light }}>|</AppText>
        <AppButton
          textStyle={[styles.tncText, { color: colors.text_light }]}
          style={styles.tncBtn}
          title="Privacy Policy"
        />
        <AppText style={{ color: colors.text_light }}>|</AppText>
        <AppButton
          textStyle={[styles.tncText, { color: colors.text_light }]}
          style={styles.tncBtn}
          title="Contact us"
        />
      </View>
    </Screen>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  btn: {
    backgroundColor: "transparent",
    borderRadius: 5,
    borderWidth: 2,
    marginBottom: 20,
    paddingVertical: 12,
  },
  btnText: {
    fontSize: 17,
    fontWeight: "bold",
  },
  logoContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  google: {
    marginRight: 8,
  },
  tnc: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
  },
  tncBtn: {
    backgroundColor: "transparent",
  },
  tncText: {
    fontSize: 14,
    textDecorationLine: "underline",
  },
  logo: {
    width: 120,
    height: 125,
    marginBottom: 10,
  },
  appName: {
    fontSize: 28,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
  actionContainer: {
    paddingVertical: 20,
  },
});
