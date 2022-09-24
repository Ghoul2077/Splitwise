import React, {
  createContext,
  FC,
  ReactNode,
  useContext,
  useState,
} from "react";
import {
  Dimensions,
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import Snackbar from "../components/Snackbar";

export type SnackbarProps = {
  id: number;
  text: string;
  buttonText: string;
  rootStyle: StyleProp<ViewStyle>;
  buttonStyle: StyleProp<ViewStyle>;
  onPress: { (): void } | null;
  progressBar: boolean;
};

export type ShowSnackbarProps = {
  text?: string;
  buttonText?: string;
  style?: StyleProp<ViewStyle>;
  buttonStyle?: StyleProp<TextStyle>;
  onPress?: () => void;
  progressBar?: boolean;
};

export const SnackbarContext = createContext<{
  showSnackbar: (arg0: ShowSnackbarProps) => void;
}>({
  showSnackbar: (ShowSnackbarProps) => undefined as void,
});
export const useSnackbar = () => useContext(SnackbarContext);

const { width } = Dimensions.get("window");

export type SnackbarProviderProps = {
  children: ReactNode;
};

const DEFAULT_VALUES = {
  text: "",
  buttonText: "",
  rootStyle: {},
  buttonStyle: {},
  onPress: null,
  progressBar: false,
};
const DEFAULT_DISMISS_TIMER = 4000;
let notificationCounter: number = 0;

const SnackbarProvider: FC<SnackbarProviderProps> = ({ children }) => {
  const [messages, setMessages] = useState<Array<SnackbarProps>>([]);

  function showSnackbar(props: ShowSnackbarProps = {}) {
    const {
      text = DEFAULT_VALUES.text,
      buttonText = DEFAULT_VALUES.buttonText,
      style = DEFAULT_VALUES.rootStyle,
      buttonStyle = DEFAULT_VALUES.buttonStyle,
      onPress = DEFAULT_VALUES.onPress,
      progressBar = DEFAULT_VALUES.progressBar,
    } = props;

    setMessages((messages) =>
      messages.concat({
        id: notificationCounter++,
        text,
        buttonText,
        rootStyle: style,
        buttonStyle,
        onPress,
        progressBar,
      })
    );
  }

  const dismiss = (id: number) => {
    setMessages((messages) => messages.filter((message) => message.id !== id));
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <View style={styles.SnackbarContainer}>
        {messages.map((message) => (
          <Snackbar
            key={message.id}
            text={message.text}
            buttonText={message.buttonText}
            style={[styles.defaultGlobalToastStyle, message.rootStyle]}
            buttonStyle={message.buttonStyle}
            onPress={() => {
              if (message.onPress) {
                message.onPress();
              }
              dismiss(message.id);
            }}
            dismissTime={DEFAULT_DISMISS_TIMER}
            onDismiss={() => dismiss(message.id)}
            showProgressBar={message.progressBar}
          />
        ))}
      </View>
    </SnackbarContext.Provider>
  );
};

export default SnackbarProvider;

const styles = StyleSheet.create({
  SnackbarContainer: {
    position: "absolute",
    left: 0,
    bottom: -5,
    zIndex: 20,
    elevation: 10,
    width,
  },
  defaultGlobalToastStyle: {
    position: "relative",
    marginVertical: 5,
    left: width / 2,
  },
});
