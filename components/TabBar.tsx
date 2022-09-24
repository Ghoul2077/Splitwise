import React, { FC, useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  GestureResponderEvent,
  Platform,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { ParamListBase, TabNavigationState } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import * as NavigationBar from "expo-navigation-bar";
import useThemeColors from "../hooks/useThemeColors";
import routes from "../navigation/routes";
import AppButton from "./AppButton";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const height = Dimensions.get("screen").height;

export type AnimatedTabButtonProps = {
  label: string;
  onPress?: Function;
  onLongPress?: (event: GestureResponderEvent) => void;
  isFocused: boolean;
  iconName: keyof typeof Ionicons.glyphMap;
  state: TabNavigationState<ParamListBase>;
};

const AnimatedTabButton: FC<AnimatedTabButtonProps> = ({
  label,
  onPress,
  onLongPress,
  isFocused,
  iconName,
  state,
}) => {
  const colors = useThemeColors();
  const { width } = useWindowDimensions();

  return (
    <AppButton
      ripple={{ borderless: true, overflow: true }}
      onPress={onPress}
      onLongPress={onLongPress}
      title={label as string}
      textStyle={[
        styles.btnText,
        { color: isFocused ? colors.primary : colors.text_light },
      ]}
      leftIcon={
        <View style={styles.tabBtnIcon}>
          <Ionicons
            color={isFocused ? colors.primary : colors.tabIconDefault}
            size={20}
            name={iconName}
          />
        </View>
      }
      style={[
        styles.tabBtn,
        {
          width: width / state.routes.length,
        },
      ]}
    />
  );
};

const TabBar: FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
  const colors = useThemeColors();
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (Platform.OS === "android") {
      NavigationBar.setBackgroundColorAsync(colors.background);
    }
  }, [colors]);

  return (
    <View
      style={[
        styles.tabBar,
        {
          width,
          backgroundColor: colors.background,
          height: height / 15,
          bottom: insets.bottom,
          borderTopColor: colors.grey,
        },
      ]}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label: string | Function =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({
              name: route.name,
              merge: true,
              params: undefined,
            });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        let iconName: keyof typeof Ionicons.glyphMap;

        switch (route.name) {
          case routes.GROUPS_SCREEN:
            iconName = "ios-people-outline";
            break;
          case routes.FRIENDS_SCREEN:
            iconName = "ios-person-outline";
            break;
          case routes.ACTIVITY_SCREEN:
            iconName = "ios-timer-outline";
            break;
          case routes.ACCOUNT_SCREEN:
            iconName = "ios-settings-sharp";
            break;
          default:
            iconName = "ios-help";
        }

        return (
          <AnimatedTabButton
            key={index}
            iconName={iconName}
            onPress={onPress}
            onLongPress={onLongPress}
            isFocused={isFocused}
            label={label as string}
            state={state}
          />
        );
      })}
    </View>
  );
};

export default TabBar;

const styles = StyleSheet.create({
  tabBar: {
    maxHeight: 55,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    overflow: "hidden",
    borderTopWidth: 1,
  },
  tabBtn: {
    maxWidth: 130,
    backgroundColor: "transparent",
    flexDirection: "column",
    borderRadius: 0,
    height: "100%",
  },
  tabBtnIcon: {
    paddingVertical: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    fontSize: 12,
    fontWeight: "500",
  },
});
