import React from "react";
import {
  EuiHeader,
  EuiHeaderSectionItem,
  EuiText,
  EuiHeaderLinks,
  EuiHeaderLink,
} from "@elastic/eui";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, selectUser } from "../../features/auth/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  return (
    <EuiHeader>
      <EuiHeaderSectionItem border="right">
        <EuiText>
          <h4>Welcome</h4>
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
    </EuiHeader>
  );
};
export default Navbar;
