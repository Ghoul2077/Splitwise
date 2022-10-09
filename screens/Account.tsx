import React, { FC, useRef, useState, useLayoutEffect } from "react";
import {
  StyleSheet,
  View,
  Animated,
  LayoutChangeEvent,
  Image,
  TouchableOpacity,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { CompositeNavigationProp } from "@react-navigation/native";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { useAuthState } from "react-firebase-hooks/auth";
import Screen from "../components/Screen";
import { useAppDispatch, useAppSelector } from "../store/hook";
import { MainStackParamsList, TabsParamsList } from "../navigation/types";
import useThemeColors from "../hooks/useThemeColors";
import routes from "../navigation/routes";
import AppText from "../components/AppText";
import AppButton from "../components/AppButton";
import useFirebaseAuth from "../hooks/useFirebaseAuth";
import { auth } from "../config/firebase";

export interface AccountScreenProps {
  navigation: CompositeNavigationProp<
    BottomTabNavigationProp<TabsParamsList, routes.ACTIVITY_SCREEN>,
    NativeStackNavigationProp<MainStackParamsList>
  >;
}

const AccountScreen: FC<AccountScreenProps> = ({ navigation }) => {
  const colors = useThemeColors();
  const dispatch = useAppDispatch();
  const { logoutHandler } = useFirebaseAuth();
  const [user, firebaseLoading, firebaseError] = useAuthState(auth);
  const scrollPosition = useRef(new Animated.Value(0)).current;
  const [headerSize, setHeaderSize] = useState(0);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <AppText
          style={[
            styles.navigationHeaderTitle,
            {
              opacity: scrollPosition.interpolate({
                inputRange: [0, headerSize],
                outputRange: [0, 1],
                extrapolate: "clamp",
              }),
            },
          ]}
        >
          Account
        </AppText>
      ),
      headerStyle: {
        backgroundColor: colors.background,
        elevation: scrollPosition.interpolate({
          inputRange: [0, headerSize],
          outputRange: [0, 5],
          extrapolate: "clamp",
        }),
      },
    });
  }, [navigation, colors, headerSize]);

  return (
    <Screen headerShown style={{ backgroundColor: colors.background }}>
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
        scrollEventThrottle={30}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollPosition } } }],
          { useNativeDriver: true }
        )}
      >
        <Animated.View
          onLayout={(event: LayoutChangeEvent) =>
            setHeaderSize(event.nativeEvent.layout.height)
          }
          style={[
            styles.header,
            {
              opacity: scrollPosition.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 0],
                extrapolate: "clamp",
              }),
            },
          ]}
        >
          <AppText style={styles.headerTxt}>Account</AppText>
        </Animated.View>
        <View style={styles.accountInfo}>
          <View style={styles.details}>
            <TouchableOpacity style={styles.imageUpload}>
              <Image
                style={styles.image}
                source={
                  user?.photoURL
                    ? { uri: user?.photoURL }
                    : require("../assets/images/placeholder.png")
                }
                resizeMode="cover"
                resizeMethod="resize"
              />
              <FontAwesome
                size={20}
                color={colors.white}
                style={styles.imageUploadIcon}
                name="camera"
              />
            </TouchableOpacity>
            <View>
              <AppText style={styles.username}>{user?.displayName}</AppText>
              <AppText style={[styles.email, { color: colors.text_light }]}>
                {user?.email}
              </AppText>
            </View>
          </View>
          <AppButton
            ripple
            iconSize={25}
            style={styles.editBtn}
            leftIcon={
              <MaterialCommunityIcons
                size={30}
                color={colors.white}
                name="pencil-outline"
              />
            }
          />
        </View>
        <View style={[styles.options, { borderColor: colors.grey }]}>
          <View>
            <AppButton
              ripple
              gap={30}
              iconSize={27}
              style={styles.option}
              textStyle={styles.optionTxt}
              leftIconName="ios-qr-code"
              title="Scan code"
            />
            <AppButton
              ripple
              style={styles.option}
              textStyle={styles.optionTxt}
              leftIcon={
                <FontAwesome
                  size={24}
                  color={colors.white}
                  name="diamond"
                  style={styles.optionIcon}
                />
              }
              title="Splitwise Pro"
            />
          </View>
          <View style={styles.middleSection}>
            <AppText style={styles.sectionHeader}>Preferences</AppText>
            <AppButton
              ripple
              gap={30}
              iconSize={27}
              style={styles.option}
              textStyle={styles.optionTxt}
              leftIconName="ios-mail-outline"
              title="Email settings"
            />
            <AppButton
              ripple
              gap={30}
              iconSize={27}
              style={styles.option}
              textStyle={styles.optionTxt}
              leftIconName="ios-notifications-outline"
              title="Device and push notification settings"
            />
            <AppButton
              ripple
              gap={30}
              iconSize={27}
              style={styles.option}
              textStyle={styles.optionTxt}
              leftIconName="ios-lock-closed-outline"
              title="Passcode"
            />
          </View>
          <View>
            <AppText style={styles.sectionHeader}>Feedback</AppText>
            <AppButton
              ripple
              gap={32}
              iconSize={24}
              style={styles.option}
              textStyle={styles.optionTxt}
              leftIconName="ios-star-outline"
              title="Rate Splitwise"
            />
            <AppButton
              ripple
              gap={30}
              iconSize={27}
              style={styles.option}
              textStyle={styles.optionTxt}
              leftIconName="ios-help-circle-outline"
              title="Contact Splitwise support"
            />
          </View>
        </View>
        <AppButton
          ripple
          gap={30}
          iconSize={27}
          style={styles.option}
          iconColor={colors.secondary}
          textStyle={[styles.optionTxt, { color: colors.secondary }]}
          onPress={logoutHandler}
          leftIconName="ios-log-out-outline"
          title="Logout"
        />
        <View style={styles.footer}>
          <AppText style={[styles.footerTxt, { color: colors.text_light }]}>
            Made with ✨ in Providence, RI, USA
          </AppText>
          <AppText style={[styles.footerTxt, { color: colors.text_light }]}>
            Copyright © 2022 Splitwise, Inc.
          </AppText>
          <AppText style={[styles.footerTxt, { color: colors.text_light }]}>
            P.S. Bunnies
          </AppText>
          <AppText
            style={[
              styles.footerTxt,
              styles.version,
              { color: colors.text_light },
            ]}
          >
            v5.3.1/651
          </AppText>
        </View>
      </Animated.ScrollView>
    </Screen>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  header: {
    paddingHorizontal: 20,
  },
  headerTxt: {
    fontSize: 27,
  },
  accountInfo: {
    height: 120,
    paddingHorizontal: 15,
    paddingVertical: 25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  options: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  option: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    justifyContent: "flex-start",
    backgroundColor: "transparent",
    borderRadius: 0,
    minHeight: 60,
  },
  optionTxt: {
    textAlign: "left",
    fontSize: 16.5,
  },
  optionIcon: {
    marginRight: 30,
  },
  middleSection: {
    marginVertical: 20,
  },
  sectionHeader: {
    paddingHorizontal: 20,
    fontSize: 13.5,
    fontWeight: "500",
    marginBottom: 8,
  },
  editBtn: {
    backgroundColor: "transparent",
    borderRadius: 24,
    marginRight: -5,
  },
  username: {
    fontSize: 16.5,
    marginBottom: 2,
    fontWeight: "500",
  },
  email: {},
  navigationHeaderTitle: {
    fontSize: 20,
    paddingHorizontal: 5,
  },
  footer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 25,
  },
  footerTxt: {
    fontSize: 13,
    fontWeight: "500",
    letterSpacing: 0.75,
  },
  version: {
    marginTop: 20,
  },
  image: {
    width: 65,
    height: 65,
    borderRadius: 50,
  },
  details: { flexDirection: "row", alignItems: "center" },
  imageUpload: {
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    marginRight: 25,
  },
  imageUploadIcon: {
    position: "absolute",
    bottom: 0,
    right: -3,
  },
});
