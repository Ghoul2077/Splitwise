import React, { FC } from "react";
import { StyleSheet, FlatList, View } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { CompositeNavigationProp } from "@react-navigation/native";
import Screen from "../components/Screen";
import { useAppDispatch, useAppSelector } from "../store/hook";
import { MainStackParamsList, TabsParamsList } from "../navigation/types";
import useThemeColors from "../hooks/useThemeColors";
import routes from "../navigation/routes";
import AppText from "../components/AppText";

export interface ActivityScreenProps {
  navigation: CompositeNavigationProp<
    BottomTabNavigationProp<TabsParamsList, routes.ACTIVITY_SCREEN>,
    NativeStackNavigationProp<MainStackParamsList>
  >;
}

const ActivityScreen: FC<ActivityScreenProps> = ({ navigation }) => {
  const colors = useThemeColors();
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.theme);

  return (
    <Screen headerShown style={{ backgroundColor: colors.background }}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={[]}
        contentContainerStyle={styles.container}
        ListEmptyComponent={() => (
          <View style={styles.emptyList}>
            <AppText
              style={[styles.emptyListTxt, { color: colors.text_light }]}
            >
              There is no activity in your account yet.
            </AppText>
            <AppText
              style={[styles.emptyListTxt, { color: colors.text_light }]}
            >
              Try adding an expense.
            </AppText>
          </View>
        )}
        ListHeaderComponent={() => (
          <View>
            <AppText style={styles.headerTxt}>Activity</AppText>
          </View>
        )}
      />
    </Screen>
  );
};

export default ActivityScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
  },
  emptyList: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyListTxt: {
    marginBottom: 3,
    textAlign: "center",
    fontSize: 17,
  },
  headerTxt: {
    fontSize: 27,
  },
});
