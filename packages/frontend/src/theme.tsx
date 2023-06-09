import { ThemeProvider, createTheme } from "@mui/material";
import React, { PropsWithChildren } from "react";
import { palette } from "./palette";
import { typography } from "./typography";

declare module "@mui/material/styles" {
  interface Theme {
    status: {
      success: string;
      warning: string;
      error: string;
      normal: string;
      grey: string;
    };
  }
  interface ThemeOptions {
    status: {
      success: string;
      warning: string;
      error: string;
      normal: string;
      grey: string;
    };
  }
}

interface ThemeProps {
  children: React.ReactNode | React.ReactNode[];
}

export const Theme: React.FC<ThemeProps> = (props: PropsWithChildren<ThemeProps>) => {
  const theme = createTheme({
    status: {
      success: "#4AAF54",
      warning: "#FDBF2D",
      error: "#F73030",
      normal: palette.secondary.main,
      grey: "#C0C0C0",
    },
    typography,
    palette,
    components: {
      MuiInputLabel: {
        styleOverrides: {
          shrink: true,
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: "#eeeeff",
          },
        },
      },
      MuiSelect: {
        styleOverrides: {
          select: {
            "&:focus": {
              background: "transparent",
            },
          },
        },
      },
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            backgroundColor: "rgba(50,50,70,0.9)",
            padding: "8px 10px",
          },
        },
      },
      MuiFilledInput: {
        styleOverrides: {
          input: {
            padding: "12px",
            height: "1em",
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          input: {
            padding: "12px",
            height: "1em",
          },
        },
      },
      MuiAutocomplete: {
        styleOverrides: {
          root: {
            padding: 0,
            "& .MuiOutlinedInput-root .MuiAutocomplete-input": {
              padding: "12px 0 12px 12px",
            },
          },
          inputRoot: {
            padding: 0,
          },
          input: {
            padding: "12px 0 12px 12px",
            height: "1em",
          },
        },
      },
      MuiListItemIcon: {
        styleOverrides: {
          root: {
            minWidth: "28px",
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          containedPrimary: {
            border: "1px solid rgba(64,64,64,0.52)",
            background: "linear-gradient(0deg, rgba(129,183,242,1) 0%, rgba(48,143,247,1) 50%, rgba(129,183,242,1) 100%)",
            "&:hover": {
              background: "linear-gradient(0deg, rgba(157,197,241,1) 0%, rgba(78,158,245,1) 50%, rgba(157,197,241,1) 100%)",
            },
            "&:disabled": {
              border: "1px solid #eeeeee",
              background: "linear-gradient(0deg, rgba(164,164,164,0.12) 0%, rgba(128,128,128,0.12) 50%, rgba(164,164,164,0.12) 100%)",
            },
          },
        },
      },
    },
  });
  return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>;
};
