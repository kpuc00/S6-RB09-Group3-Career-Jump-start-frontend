import React from "react";
import {
  EuiHeader,
  EuiHeaderLinks,
  EuiHeaderLink,
  EuiHeaderSectionItem,
  EuiText,
  EuiThemeProvider,
  useEuiTheme,
} from "@elastic/eui";
import styles from "../../styles/navbar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, selectUser } from "../../features/auth/authSlice";

// Variable that uses custom color themes
const Box: FunctionComponent<{ children: ReactNode }> = ({ children }) => {
  const { euiTheme } = useEuiTheme();

  return (
    <EuiHeader
      className={styles.header}
      css={{
        background: euiTheme.colors.lightShade,
      }}
    >
      {children}
    </EuiHeader>
  );
};

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const overrides = {
    colors: {
      LIGHT: { lightShade: "#7A2C81" },
      DARK: { lightShade: "#7A2C81" },
    },
  };
  return (
    <EuiThemeProvider modify={overrides}>
      <Box>
        <EuiHeaderSectionItem border="right">
          <EuiText className={styles.heading}>
            <h4 className={styles.h4}>Welcome</h4>
          </EuiText>
        </EuiHeaderSectionItem>
        {user && (
          <EuiHeaderSectionItem>
            <EuiHeaderLinks aria-label="App navigation links example">
              <EuiHeaderLink onClick={() => dispatch(logoutUser())}>
                Log out
              </EuiHeaderLink>
            </EuiHeaderLinks>
          </EuiHeaderSectionItem>
        )}
      </Box>
    </EuiThemeProvider>
  );
};

export default Navbar;
