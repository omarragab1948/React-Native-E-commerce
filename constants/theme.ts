import { PixelRatio } from "react-native";

const fontScale = PixelRatio.getFontScale();

export const sizes = {
  small: 9 * fontScale,
  medium: 14 * fontScale,
  large: 18 * fontScale,
  xlarge: 24 * fontScale,
};
export const colors = {
  bg: "#111827",
  cardBg: "#1F2937",
  second: "#4F46E5",
  white: "#FFFFFF",
  black: "#000000",
  gray: "#ddd",
};
export const fonts = {
  bold: "InterBold",
  semiBold: "InterSemiBld",
  medium: "InterMedium",
  regular: "InterRegular",
  light: "InterLight",
};
