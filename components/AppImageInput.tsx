import React, { FC } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import useThemeColors from "../hooks/useThemeColors";

export type ImageInputProps = {
  imageUri: string;
  onChangeImage: Function;
  size: number;
};

const BUTTON_SIZE = 100;

const AppImageInput: FC<ImageInputProps> = ({
  imageUri,
  onChangeImage,
  size,
}) => {
  const colors = useThemeColors();

  const requestPermission = async () => {
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!granted) {
      alert("You need to enable Permission to access the library");
    }
    return granted;
  };

  const handlePress = async () => {
    if (await requestPermission()) {
      if (!imageUri) {
        selectImage();
      } else {
        Alert.alert(
          "Delete",
          "Are you sure sure you want to delete this image",
          [{ text: "Yes", onPress: () => onChangeImage() }, { text: "No" }]
        );
      }
    }
  };

  const selectImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.5,
      });
      if (!result.cancelled) {
        onChangeImage(result.uri);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View
        style={[
          styles.container,
          {
            backgroundColor: colors.text_light,
            height: size || BUTTON_SIZE,
            width: size || BUTTON_SIZE,
          },
        ]}
      >
        {!imageUri && (
          <View
            style={[
              styles.iconContainer,
              {
                width: size || BUTTON_SIZE,
                height: size || BUTTON_SIZE,
                borderRadius: size / 2 || BUTTON_SIZE / 2,
              },
            ]}
          >
            <MaterialCommunityIcons
              name="camera"
              color={colors.grey}
              size={BUTTON_SIZE / 2}
            />
          </View>
        )}
        {imageUri && (
          <Image
            source={{ uri: imageUri }}
            resizeMode="cover"
            style={styles.image}
          />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default AppImageInput;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    borderRadius: 15,
    justifyContent: "center",
    overflow: "hidden",
  },
  iconContainer: {
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  image: { position: "absolute", width: "100%", height: "100%" },
});
