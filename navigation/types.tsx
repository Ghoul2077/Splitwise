import { NavigatorScreenParams } from "@react-navigation/native";
import routes from "./routes";

export type TabsParamsList = {
  TopTabNavigator: undefined;
  [routes.GROUPS_SCREEN]: undefined;
  [routes.FRIENDS_SCREEN]: undefined;
  [routes.ACTIVITY_SCREEN]: undefined;
  [routes.ACCOUNT_SCREEN]: undefined;
};

export type MainStackParamsList = {
  Tabs: NavigatorScreenParams<TabsParamsList>;
  [routes.ONBOARDING_SCREEN]: undefined;
  [routes.LOGIN_SCREEN]: undefined;
  [routes.SIGNUP_SCREEN]: undefined;
};
