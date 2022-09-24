import React, { FC } from "react";
import { FlatList, StyleSheet, View, Dimensions } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { CompositeNavigationProp, RouteProp } from "@react-navigation/native";
import LottieView from "lottie-react-native";
import Screen from "../components/Screen";
import { useAppDispatch, useAppSelector } from "../store/hook";
import { MainStackParamsList, TabsParamsList } from "../navigation/types";
import useThemeColors from "../hooks/useThemeColors";
import routes from "../navigation/routes";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import AppButton from "../components/AppButton";
import AppText from "../components/AppText";

const width = Dimensions.get("screen").width;

export interface FriendsScreenProps {
  navigation: CompositeNavigationProp<
    BottomTabNavigationProp<TabsParamsList, routes.GROUPS_SCREEN>,
    NativeStackNavigationProp<MainStackParamsList>
  >;
  route: RouteProp<TabsParamsList, routes.FRIENDS_SCREEN>;
}

const FriendsScreen: FC<FriendsScreenProps> = ({ navigation, route }) => {
  const colors = useThemeColors();
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.theme);

  return (
    <Screen headerShown style={{ backgroundColor: colors.background }}>
      <FlatList
        data={[]}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <LottieView
              autoPlay
              style={styles.lottie}
              source={require("../assets/lottie/groups.json")}
            />
            <AppText style={[styles.emptyTxt, { color: colors.text_light }]}>
              As you use Splitwise, friends and group mates will show here.
            </AppText>
          </View>
        )}
        ListHeaderComponent={() => (
          <View style={styles.listHeader}>
            <AppText style={styles.listHeaderTxt}>
              Welcome to Splitwise, John Doe !
            </AppText>
          </View>
        )}
        ListFooterComponent={() => (
          <View style={styles.footer}>
            <AppButton
              ripple
              style={[styles.footerBtn, { borderColor: colors.secondary }]}
              textStyle={[styles.footerBtnTxt, { color: colors.secondary }]}
              iconColor={colors.secondary}
              title="Add more friends"
              leftIconName="ios-add-sharp"
              iconSize={20}
              gap={15}
            />
          </View>
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      />
    </Screen>
  );
};

export default FriendsScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  listHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 60,
  },
  listHeaderTxt: {
    fontSize: 17,
    fontWeight: "bold",
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  footerBtn: {
    borderWidth: 2,
    borderRadius: 5,
    backgroundColor: "transparent",
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  footerBtnTxt: {
    fontSize: 17,
    fontWeight: "500",
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 20,
  },
  emptyTxt: {
    textAlign: "center",
    maxWidth: 275,
    fontSize: 17,
  },
  lottie: {
    height: 300,
    marginBottom: 10,
  },
});
