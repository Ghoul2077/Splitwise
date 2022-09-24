import { ToastAndroid } from "react-native";

const Toast = (message: string) => {
  ToastAndroid.showWithGravityAndOffset(
    message,
    ToastAndroid.LONG,
    ToastAndroid.BOTTOM,
    25,
    50
  );
  return null;
};

export default Toast;
