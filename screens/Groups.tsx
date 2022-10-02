import React, { FC, useEffect, useRef } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import {
  CompositeNavigationProp,
  useScrollToTop,
} from "@react-navigation/native";
import LottieView from "lottie-react-native";
import Screen from "../components/Screen";
import { setFirstRun, setFirstRunForScreen } from "../store/reducers/firstRun";
import { useAppDispatch, useAppSelector } from "../store/hook";
import { MainStackParamsList, TabsParamsList } from "../navigation/types";
import useThemeColors from "../hooks/useThemeColors";
import routes from "../navigation/routes";
import AppText from "../components/AppText";
import AppButton from "../components/AppButton";

export interface GroupsScreenProps {
  navigation: CompositeNavigationProp<
    BottomTabNavigationProp<TabsParamsList, routes.GROUPS_SCREEN>,
    NativeStackNavigationProp<MainStackParamsList>
  >;
}

const GroupsScreen: FC<GroupsScreenProps> = ({ navigation }) => {
  const colors = useThemeColors();
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.theme);
  const firstRun = useAppSelector((state) => state.firstRun);

  const scrollRef = useRef(null);
  useScrollToTop(scrollRef);

  useEffect(() => {
    if (firstRun.masterFlag) {
      dispatch(setFirstRun());
    }
    if (firstRun.screens[routes.GROUPS_SCREEN]) {
      dispatch(setFirstRunForScreen({ screen: routes.GROUPS_SCREEN }));
    }
  }, [firstRun, dispatch]);

  return (
    <Screen headerShown style={{ backgroundColor: colors.background }}>
      <FlatList
        data={[]}
        renderItem={() => null}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <LottieView
              autoPlay
              style={styles.lottie}
              source={require("../assets/lottie/groups.json")}
            />
            <AppText style={[styles.emptyTxt, { color: colors.text_light }]}>
              Splitwise groups you create or are added to will show here.
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
              title="Start a new group"
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

export default GroupsScreen;

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
