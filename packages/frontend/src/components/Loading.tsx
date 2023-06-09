import { CircularProgress, createStyles, Grid, Theme, useTheme } from "@mui/material";
import classnames from "classnames";
import { CSSProperties } from "react";
import * as React from "react";
import makeClasses from "../helpers/makeClasses";

const useStyles = makeClasses((theme: Theme, loadingProps: LoadingProps) =>
  createStyles({
    root: {
      flex: "1 1 auto",
      display: "flex",
      width: loadingProps.size === "fullScreen" ? "100vw" : loadingProps.size === "100%" ? "100%" : "auto",
      height: loadingProps.size === "fullScreen" ? "100vh" : loadingProps.size === "100%" ? "100%" : "auto",
      alignItems: loadingProps.alignItems ?? "center",
      justifyContent: loadingProps.justifyItems ?? "center",
    },
    content: {
      display: "flex",
      flexDirection: "column",
      justifyContent: loadingProps.alignContent ?? "center",
      alignItems: loadingProps.justifyContent ?? "center",
    },
    spinner: {},
    line1: {
      fontSize: "1.6em",
      fontWeight: "bold",
    },
    line2: {
      fontSize: "0.9em",
      fontWeight: "bold",
    },
  }),
);

interface LoadingProps {
  className?: string;
  alignContent?: "flexStart" | "flexEnd" | "center" | undefined | null;
  alignItems?: "flexStart" | "flexEnd" | "center" | undefined | null;
  justifyContent?: "flexStart" | "flexEnd" | "center" | undefined | null;
  justifyItems?: "flexStart" | "flexEnd" | "center" | undefined | null;
  size?: "fullScreen" | "100%" | "auto" | undefined | null;
  spinnerSize?: string | number;
  line1?: string | JSX.Element;
  line2?: string | JSX.Element;
  line1ClassName?: string;
  line2ClassName?: string;
  line1Style?: CSSProperties;
  line2Style?: CSSProperties;
  icon?: JSX.Element;
}

export const Loading: React.FC<LoadingProps> = props => {
  const theme = useTheme();
  const classes = useStyles(theme, props);
  const { icon, size = "normal", alignItems = "center", justifyContent = "center", spinnerSize = 48, line1, line2, line1ClassName, line2ClassName, line1Style, line2Style, ...rest } = props;

  const spinner = icon ?? <CircularProgress size={spinnerSize} />;

  return (
    <div className={classnames(classes.root, "Loading")} {...rest}>
      <div className={classes.content}>
        {spinner}
        {line1 && (
          <div className={classnames(classes.line1, line1ClassName)} style={line1Style}>
            {line1}
          </div>
        )}
        {line2 && (
          <div className={classnames(classes.line2, line2ClassName)} style={line2Style}>
            {line2}
          </div>
        )}
      </div>
    </div>
  );
};
