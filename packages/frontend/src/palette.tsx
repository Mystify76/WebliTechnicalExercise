import { Color } from "@mui/material";
import { red } from "@mui/material/colors";
import createPalette, { SimplePaletteColorOptions } from "@mui/material/styles/createPalette";

const navy: SimplePaletteColorOptions = {
  light: "#3d3e55",
  main: "#0D0E2B",
  dark: "#09091e",
  contrastText: "#FFFFFF",
};

const lightblue: SimplePaletteColorOptions = {
  light: "#59a5f8",
  main: "#308FF7",
  dark: "#2164ac",
  contrastText: "#FFFFFF",
};

const grey: Partial<Color> = {
  400: "#FAFAFC",
  500: "#F6F7F9",
  600: "#E0E3E7",
  700: "#9DA6B0",
  900: "#59636E",
};

export const palette = createPalette({
  primary: navy,
  error: red,
  secondary: lightblue,
  grey,
  background: {
    default: "#FFF",
  },
});
