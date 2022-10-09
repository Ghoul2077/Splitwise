import React, {
  FC,
  useRef,
  useState,
  useCallback,
  useEffect,
  memo,
} from "react";
import {
  StyleSheet,
  View,
  Modal,
  ViewStyle,
  FlatList,
  ListRenderItem,
  StyleProp,
  TouchableOpacity,
  TextInput,
} from "react-native";
import debounce from "lodash/debounce";
import Fuse from "fuse.js";
import { Ionicons } from "@expo/vector-icons";
import { FormikValues, useFormikContext } from "formik";
import useThemeColors from "../../hooks/useThemeColors";
import AppButton, { AppButtonProps } from "../AppButton";
import AppTextInput from "../AppTextInput";
import Screen from "../Screen";
import AppText from "../AppText";

export interface AppModalPickerProps
  extends Omit<AppButtonProps, "onPress" | "style" | "title"> {
  title: ({ selection }: { selection: any }) => JSX.Element;
  onSearch?: Function;
  style?: StyleProp<ViewStyle>;
  initialData?: any[];
  renderItem: ListRenderItem<any>;
  headerText?: string;
  dataKeys?: Array<string>;
  onSelectionChange?: Function;
  name: string;
}

const AppModalPicker: FC<AppModalPickerProps> = ({
  style,
  initialData,
  name,
  onSearch,
  renderItem: RenderItem,
  title: Title,
  headerText,
  dataKeys,
  onSelectionChange,
  ...others
}) => {
  const colors = useThemeColors();
  const { setFieldValue, values } = useFormikContext<FormikValues>();

  const [popupVisible, setPopupVisible] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const [data, setData] = useState(initialData || []);
  const [query, setQuery] = useState("");

  const inputRef = useRef<TextInput>(null);

  const fuse = useRef(
    new Fuse(initialData || [], {
      keys: dataKeys || [],
      threshold: 0.4,
    })
  ).current;

  const filter = useCallback(
    debounce((query, initialData) => {
      if (query) {
        setData(fuse.search(query).map((elem) => elem.item));
      } else {
        setData(initialData || []);
      }
    }, 100),
    []
  );

  useEffect(() => {
    if (values[name] && onSelectionChange) onSelectionChange(values[name]);
  }, [values[name]]);

  useEffect(() => {
    filter(query, initialData);
  }, [query, initialData]);

  const Header = useCallback(
    () => (
      <View
        style={[
          styles.header,
          { borderColor: colors.grey, backgroundColor: colors.background },
        ]}
      >
        <AppButton
          iconSize={24}
          style={styles.btn}
          leftIconName="ios-arrow-back"
          onPress={() => {
            if (searchVisible) {
              setSearchVisible(false);
            } else {
              setPopupVisible(false);
            }
            setQuery("");
          }}
        />
        {searchVisible ? (
          <AppTextInput
            autoFocus
            ref={inputRef}
            returnKeyType="search"
            onChangeText={(text) => setQuery(text)}
            style={styles.input}
            placeholderTextColor={colors.text_light}
            placeholder="Search"
            rightIcon={
              <Ionicons
                color={colors.text_light}
                name="ios-close-outline"
                size={30}
              />
            }
            onPressIcon={() => {
              inputRef?.current?.clear();
              setQuery("");
            }}
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

  const PickerItem: ListRenderItem<any> = useCallback(
    memo(({ item, index, separators }) => (
      <TouchableOpacity
        onPress={() => {
          setFieldValue(name, item);
          setPopupVisible(false);
          setSearchVisible(false);
          setQuery("");
        }}
      >
        <RenderItem index={index} item={item} separators={separators} />
      </TouchableOpacity>
    )),
    [RenderItem]
  );

  return (
    <>
      <AppButton
        ripple
        style={[styles.inputBtn, { borderColor: colors.white }, style]}
        title={() => <Title selection={values[name]} />}
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
          }
          setQuery("");
        }}
        animationType="slide"
      >
        <Screen style={{ backgroundColor: colors.background }}>
          <FlatList
            data={data}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.container}
            stickyHeaderIndices={[0]}
            ListHeaderComponent={<Header />}
            ListEmptyComponent={
              initialData?.length ? (
                <View style={styles.emptyContainer}>
                  <AppText style={[styles.emptyTxt, { color: colors.error }]}>
                    No results found
                  </AppText>
                </View>
              ) : null
            }
            keyExtractor={(_i, index) => String(index)}
            renderItem={(props) => <PickerItem {...props} />}
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
  emptyContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyTxt: {
    fontSize: 16,
  },
});

export default AppModalPicker;
