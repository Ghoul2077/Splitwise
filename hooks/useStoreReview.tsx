import { Alert, Platform } from "react-native";
import * as StoreReview from "expo-store-review";
import * as Linking from "expo-linking";

export default function useStoreReview() {
  // Note that google and apple both have restrictions on how many times this
  // can be called in a month (around one per month)
  async function requestInAppReview() {
    try {
      const isPlatformCompatible = await StoreReview.isAvailableAsync();
      const canCallReview = await StoreReview.hasAction();

      if (isPlatformCompatible && canCallReview) {
        StoreReview.requestReview();
      } else if (!isPlatformCompatible) {
        Alert.alert("It seems your device does not support this feature");
      }
    } catch ({ message }) {
      console.log(message);
    }
  }

  function requestInStoreReview() {
    const storeLink = StoreReview.storeUrl();

    if (Platform.OS === "ios") {
      let id;
      const result = storeLink?.match(/id(\d+)?/i);
      if (result) id = result[1];

      if (id)
        Linking.openURL(
          `itms-apps://itunes.apple.com/app/viewContentsUserReviews/id${id}?action=write-review`
        );
    } else {
      let packageName;
      const result = storeLink?.match(/id=(\w+.\w+.\w+)/i);
      if (result) packageName = result[1];

      if (packageName) Linking.openURL(`market://details?id=${packageName}`);
    }
  }

  return {
    requestInAppReview,
    requestInStoreReview,
  };
}
