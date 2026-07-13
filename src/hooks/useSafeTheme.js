import { useSelector } from "react-redux";

/** Shim matching reference UI API — maps Redux theme boolean. */
export default function useSafeTheme() {
  const theme = useSelector((state) => state.theme);
  return { isDarkMode: Boolean(theme) };
}
