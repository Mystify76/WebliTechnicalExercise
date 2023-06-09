import { Theme, useTheme, createStyles } from "@mui/material";
import { useMemo } from "react";
import { isFunction } from "lodash";
import { css } from "@emotion/css";

const makeClasses =
  (stylesElement: Record<string, any> | ((theme: Theme, ...args: any[]) => Record<string, any>)) =>
  (theme: Theme, ...args: any[]) => {
    const rawClasses: Record<string, any> = isFunction(stylesElement) ? stylesElement(theme, ...args) : stylesElement;
    const prepared: Record<string, any> = {};

    Object.entries(rawClasses).forEach(([key, value = {}]) => {
      prepared[key] = css(value);
    });

    return prepared;
  };

export default makeClasses;
