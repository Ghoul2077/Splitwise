import React, { FC, useRef, useState, useCallback } from "react";
import { ListRenderItem, StatusBar, StyleProp, TextInput } from "react-native";
import {
  StyleSheet,
  View,
  Modal,
  Dimensions,
  ViewStyle,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import useThemeColors from "../../hooks/useThemeColors";
import AppButton, { AppButtonProps } from "../AppButton";
import AppTextInput from "../AppTextInput";
import Screen from "../Screen";
import AppText from "../AppText";

const { width, height } = Dimensions.get("window");

export interface AppModalPickerProps
  extends Omit<AppButtonProps, "onPress" | "style" | "title"> {
  title: ({ selection }: { selection: any }) => JSX.Element;
  onSearch?: Function;
  style?: StyleProp<ViewStyle>;
  initialData?: any[];
  renderItem: ListRenderItem<any>;
  headerText?: string;
}

const AppModalPicker: FC<AppModalPickerProps> = ({
  style,
  initialData = [],
  onSearch,
  renderItem,
  title: Title,
  headerText,
  ...others
}) => {
  const colors = useThemeColors();
  const inputRef = useRef<TextInput>(null);

  const [popupVisible, setPopupVisible] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [data, setData] = useState(initialData);
  const [query, setQuery] = useState("");

  const reset = () => {
    setQuery("");
  };

  const Header = useCallback(
    () => (
      <View style={[styles.header, { borderColor: colors.grey }]}>
        <AppButton
          iconSize={24}
          style={styles.btn}
          leftIconName="ios-arrow-back"
          onPress={() =>
            searchVisible ? setSearchVisible(false) : setPopupVisible(false)
          }
        />
        {searchVisible ? (
          <AppTextInput
            autoFocus
            onChangeText={(text) => setQuery(text)}
            style={styles.input}
            placeholderTextColor={colors.text_light}
            placeholder="Search"
          />
        ) : (
          <AppText style={styles.heading}>{headerText ?? "Choose"}</AppText>
        )}
        {!searchVisible && (
          <AppButton
            iconSize={21}
            style={[styles.btn, styles.searchBtn]}
            onPress={() => setSearchVisible(true)}
            leftIconName="ios-search"
          />
        )}
      </View>
    ),
    [searchVisible, colors, headerText]
  );

  return (
    <>
      <AppButton
        style={[styles.inputBtn, { borderColor: colors.white }, style]}
        title={() => <Title selection={selected} />}
        onPress={() => setPopupVisible(true)}
        {...others}
      />
      <Modal
        transparent
        statusBarTranslucent
        visible={popupVisible}
        onRequestClose={() => {
          if (searchVisible) {
            setSearchVisible(false);
          } else {
            setPopupVisible(false);
            reset();
          }
        }}
        animationType="slide"
      >
        <Screen style={{ backgroundColor: colors.background }}>
          <FlatList
            contentContainerStyle={styles.container}
            ListHeaderComponent={<Header />}
            data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
            keyExtractor={(_i, index) => String(index)}
            renderItem={renderItem}
          />
        </Screen>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    paddingRight: 5,
    elevation: 0,
    height: 60,
  },
  btn: {
    backgroundColor: "transparent",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  searchBtn: {
    marginLeft: "auto",
  },
  input: {
    height: "100%",
    backgroundColor: "transparent",
    borderRadius: 0,
    flex: 1,
  },
  heading: {
    fontSize: 18,
    paddingLeft: 20,
  },
  inputBtn: {
    backgroundColor: "transparent",
    borderBottomWidth: 1,
    paddingVertical: 3,
    borderRadius: 0,
  },
});

export default AppModalPicker;
