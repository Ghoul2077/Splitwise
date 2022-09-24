import React, { FC } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TabBar from "../components/TabBar";
import useThemeColors from "../hooks/useThemeColors";
import { TabsParamsList } from "./types";
import routes from "./routes";
import GroupsScreen from "../screens/Groups";
import FriendsScreen from "../screens/Friends";
import ActivityScreen from "../screens/Activity";
import AccountScreen from "../screens/Account";
import AppButton from "../components/AppButton";

const width = Dimensions.get("window").width;

const Tabs = createBottomTabNavigator<TabsParamsList>();

export function TabStack() {
  const colors = useThemeColors();

  return (
    <Tabs.Navigator
      backBehavior="initialRoute"
      initialRouteName={routes.GROUPS_SCREEN}
      screenOptions={({ route }) => ({
        headerTitle: () => null,
        headerStyle: [
          styles.header,
          {
            backgroundColor: colors.background,
            borderBottomColor: colors.grey,
          },
        ],
        headerTitleStyle: {
          color: colors.text,
        },
        headerRight: () => (
          <View style={styles.headerRight}>
            <AppButton
              ripple={{ radius: 22, overflow: false }}
              iconSize={22}
              style={styles.headerBtn}
              leftIconName="ios-search-sharp"
            />
            <AppButton
              ripple={{ radius: 22, overflow: false }}
              iconSize={30}
              style={styles.headerBtn}
              leftIconName="ios-add-sharp"
            />
          </View>
        ),
      })}
      tabBar={(props) => <TabBar {...props} />}
    >
      <Tabs.Screen name={routes.GROUPS_SCREEN} component={GroupsScreen} />
      <Tabs.Screen name={routes.FRIENDS_SCREEN} component={FriendsScreen} />
      <Tabs.Screen
        options={{
          headerStyle: {
            backgroundColor: colors.background,
            elevation: 0,
          },
          headerRight: () => null,
        }}
        name={routes.ACTIVITY_SCREEN}
        component={ActivityScreen}
      />
      <Tabs.Screen
        options={{
          headerStyle: {
            backgroundColor: colors.background,
            elevation: 0,
          },
          headerRight: () => null,
        }}
        name={routes.ACCOUNT_SCREEN}
        component={AccountScreen}
      />
    </Tabs.Navigator>
  );
}

const styles = StyleSheet.create({
  header: {
    borderBottomWidth: 1,
    elevation: 0,
  },
  headerBtn: {
    backgroundColor: "transparent",
    paddingHorizontal: 10,
    borderRadius: 30,
  },
  headerRight: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
