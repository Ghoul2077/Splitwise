import { useState, useEffect } from "react";
import { Asset } from "expo-asset";
import * as Font from "expo-font";
import {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome,
} from "@expo/vector-icons";

export default function useCachedResources() {
  const [isLoading, setIsLoading] = useState(true);

  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        await Font.loadAsync({
          ...Ionicons.font,
          ...MaterialCommunityIcons.font,
          ...FontAwesome.font,
        });
        // Load any cache like fonts or images here
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setIsLoading(false);
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoading;
}
