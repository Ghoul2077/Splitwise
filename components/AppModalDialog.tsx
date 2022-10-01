import React, { FC, useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  View,
  Modal,
  TouchableWithoutFeedback,
  Dimensions,
  Animated,
  ViewStyle,
  StyleProp,
} from "react-native";
import useThemeColors from "../hooks/useThemeColors";
import AppButton, { AppButtonProps } from "./AppButton";

const { width, height } = Dimensions.get("window");

export interface AppModalDialogProps
  extends Omit<AppButtonProps, "onPress" | "style"> {
  popupComponent: React.ReactNode;
  iconSize?: number;
  onPress?: Function;
  style?: StyleProp<ViewStyle>;
  animateAppear?: boolean;
  animateExit?: boolean;
  visible?: boolean;
  onClose?: Function;
  mode?: "alert" | "dialog" | "none";
}

const AppModalDialog: FC<AppModalDialogProps> = ({
  popupComponent: Content,
  iconSize,
  style,
  onPress: callback,
  animateAppear,
  animateExit,
  visible,
  onClose,
  mode = "none",
  ...others
}) => {
  const colors = useThemeColors();
  const [popupVisible, setPopupVisible] = useState(false);

  const animatedScale = useRef(
    new Animated.Value(animateAppear ? 0 : 1)
  ).current;

  useEffect(() => {
    if ((visible || popupVisible) && animateAppear) {
      Animated.spring(animatedScale, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    } else if (!animateExit) {
      animatedScale.setValue(0);
    }
  }, [popupVisible, animateAppear, animateExit, visible]);

  function handleClosing() {
    if (visible === undefined) {
      if (animateExit) {
        Animated.spring(animatedScale, {
          toValue: 0,
          useNativeDriver: true,
          bounciness: 0,
          speed: 40,
        }).start(() => setPopupVisible(false));
        return;
      } else {
        setPopupVisible(false);
      }
    }
    if (onClose) onClose();
  }

  return (
    <>
      {visible == undefined && (
        <AppButton
          style={style}
          iconSize={iconSize}
          onPress={() => {
            if (callback) callback();
            setPopupVisible(true);
          }}
          {...others}
        />
      )}
      <Modal
        transparent
        animationType="fade"
        visible={visible ?? popupVisible}
        onRequestClose={handleClosing}
        statusBarTranslucent
        hardwareAccelerated
      >
        <TouchableWithoutFeedback onPress={handleClosing}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>
        <View style={styles.popupWrapper}>
          <Animated.View
            style={[
              styles.popupContainer,
              {
                backgroundColor: colors.background,
                transform: [{ scale: animatedScale }],
              },
            ]}
          >
            <TouchableWithoutFeedback>
              <>
                {mode === "dialog" && (
                  <AppButton
                    ripple
                    leftIconName="ios-close"
                    onPress={handleClosing}
                    style={styles.closeBtn}
                    containerStyle={styles.closeBtnContainer}
                    iconColor={colors.white}
                    iconSize={20}
                  />
                )}
                <View
                  style={[
                    styles.popup,
                    {
                      paddingTop: mode === "dialog" ? 50 : 20,
                      paddingBottom: mode === "alert" ? 15 : 20,
                    },
                  ]}
                >
                  {Content}
                </View>
                <View>
                  {mode === "alert" && (
                    <AppButton
                      ripple
                      title="OK"
                      onPress={handleClosing}
                      style={styles.okBtn}
                      textStyle={styles.okBtnTxt}
                    />
                  )}
                </View>
              </>
            </TouchableWithoutFeedback>
          </Animated.View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  popupWrapper: {
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  popupContainer: {
    maxWidth: width * 0.95,
    maxHeight: height * 0.8,
    paddingBottom: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
    flexGrow: 0,
  },
  popup: {
    position: "relative",
    overflow: "hidden",
    width: "100%",
  },
  closeBtn: {
    backgroundColor: "transparent",
    alignItems: "center",
    borderRadius: 17.5,
    height: 40,
    width: 40,
  },
  closeBtnContainer: {
    position: "absolute",
    right: 0,
    top: 0,
  },
  okBtn: {
    marginLeft: "auto",
    backgroundColor: "transparent",
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginRight: -8,
  },
  okBtnTxt: {
    fontSize: 12,
  },
});

export default AppModalDialog;
