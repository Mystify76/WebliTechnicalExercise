import createTypography from "@mui/material/styles/createTypography";
import { palette } from "./palette";

export const typography = createTypography(palette, {
  h1: {
    fontSize: 24,
  },
  h2: {
    fontSize: 21,
  },
  h3: {
    fontSize: 18,
  },
  subtitle1: {
    fontWeight: 700,
  },
  subtitle2: {
    fontWeight: 700,
    fontSize: 12,
  },
  button: {
    fontWeight: 700,
  },
  fontFamily: ["Open Sans", "Helvetica", "Arial", "sans-serif"].join(", "),
  fontWeightMedium: 600,
});
