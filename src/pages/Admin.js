import React, { useEffect } from "react";
import {
  EuiPage,
  EuiText,
  EuiPageContent,
  EuiPanel,
  EuiPageBody,
  EuiPageContentHeader,
  EuiPageContentHeaderSection,
  EuiTitle,
  EuiPageContentBody,
} from "@elastic/eui";
import { AdminTabs } from "../components";
import { useLocation, useNavigate } from "react-router-dom";

const Admin = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/admin") navigate("/admin/candidates");
  });

  return (
    <EuiPage>
      <EuiPageBody component="div">
        <EuiPageContent style={{ maxWidth: "80%", margin: "auto" }}>
          <EuiPageContentHeader style={{ justifyContent: "center" }}>
            <EuiPageContentHeaderSection>
              <EuiTitle>
                <EuiText>
                  <h1>Admin panel</h1>
                </EuiText>
              </EuiTitle>
            </EuiPageContentHeaderSection>
          </EuiPageContentHeader>
          <EuiPageContentBody>
            <EuiPanel hasShadow={false} paddingSize="l">
              <AdminTabs />
            </EuiPanel>
          </EuiPageContentBody>
        </EuiPageContent>
      </EuiPageBody>
    </EuiPage>
  );
};
export default Admin;
