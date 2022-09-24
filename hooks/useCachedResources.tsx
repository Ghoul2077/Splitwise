import { useState, useEffect } from "react";
import { Asset } from "expo-asset";
import * as Font from "expo-font";

export default function useCachedResources() {
  const [isLoading, setIsLoading] = useState(true);

  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
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
