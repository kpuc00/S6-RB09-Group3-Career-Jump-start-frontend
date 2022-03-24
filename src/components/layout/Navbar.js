import React from "react";
import {
  EuiHeader,
  EuiHeaderSectionItem,
  EuiHeaderLogo,
  EuiText,
  EuiHeaderLinks,
  EuiHeaderLink,
} from "@elastic/eui";

const Navbar = () => {
  return (
    <EuiHeader>
      <EuiHeaderSectionItem border="right">
        {/* <EuiHeaderLogo>Elastic</EuiHeaderLogo> */}
        <EuiText>
          <h4>Welcome</h4>
        </EuiText>
      </EuiHeaderSectionItem>

      {/* <EuiHeaderSectionItem>
        <EuiHeaderLinks aria-label="App navigation links example">
          <EuiHeaderLink href="/" isActive>
            Home
          </EuiHeaderLink>
          <EuiHeaderLink href="/page">Page 1</EuiHeaderLink>
        </EuiHeaderLinks>
      </EuiHeaderSectionItem> */}
    </EuiHeader>
  );
};
export default Navbar;
