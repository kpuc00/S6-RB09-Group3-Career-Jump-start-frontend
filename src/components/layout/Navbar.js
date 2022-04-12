import React from "react";
import {
  EuiHeader,
  EuiText,
  EuiThemeProvider,
  useEuiTheme,
} from "@elastic/eui";
import styles from "../../styles/navbar.module.css"

// Variable that uses custom color themes
const Box: FunctionComponent<{ children: ReactNode }> = ({ children }) => {
  const { euiTheme } = useEuiTheme();

  return (
    <EuiHeader className={styles.header}
      css={{
        background: euiTheme.colors.lightShade,
      }}
    >
      {children}
    </EuiHeader>
  );
};

const Navbar = () => {
  const overrides = {
    colors: {
      LIGHT: { lightShade: "#7A2C81" },
      DARK: { lightShade: "#7A2C81" },
    },
  };
  return (
    <EuiThemeProvider modify={overrides}>
      <Box>
        <EuiText className={styles.heading}>
          <h4 className={styles.h4}>Welcome</h4>
        </EuiText>
      </Box>
    </EuiThemeProvider>
  );
};
export default Navbar;
