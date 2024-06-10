import { useTranslation } from 'react-i18next';
import React from "react";
import { StyleSheet, Text, TextStyle } from "react-native";
import { scale } from "react-native-size-matters";
import colors from "../styles/colors";
import fontFamily from "../styles/fontFamily";

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: scale(14),
    fontFamily: fontFamily.regular,
    color: colors.black
  },
});

interface TextContainerProps {
  text: string;
  style?: TextStyle;
  isDynamicText?: boolean;
}

const TextContainer: React.FC<TextContainerProps> = ({
  text,
  isDynamicText = true,
  style = {},
  ...rest
}) => {
  const { t } = useTranslation();

  return (
    <Text style={[styles.sectionTitle, style]} {...rest}>
      {isDynamicText ? text : t(text)}
    </Text>
  );
};

export default React.memo(TextContainer);
