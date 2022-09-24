import colors from "../constants/Colors";
import { useAppSelector } from "../store/hook";

export default function useThemeColors() {
  const theme = useAppSelector((state) => state.theme);
  return colors[theme];
}
