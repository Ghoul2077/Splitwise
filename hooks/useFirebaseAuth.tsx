import { useEffect } from "react";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import {
  getAuth,
  signInWithCredential,
  GoogleAuthProvider,
} from "firebase/auth/react-native";
import { auth } from "../config/firebase";
import { WEB_CLIENT_ID } from "@env";

WebBrowser.maybeCompleteAuthSession();

export default function useFirebaseAuth() {
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: WEB_CLIENT_ID,
    scopes: [
      "openid",
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ],
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      const auth = getAuth();
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential);
    }
  }, [response]);

  async function loginWithGoogleWeb() {
    try {
      await promptAsync();
    } catch ({ message }) {
      console.log(message);
    }
  }

  async function logoutHandler() {
    try {
      await auth.signOut();
    } catch ({ message }) {
      console.log("Error while logging out : ", message);
    }
  }

  return {
    loginWithGoogle: loginWithGoogleWeb,
    logoutHandler,
  };
}
