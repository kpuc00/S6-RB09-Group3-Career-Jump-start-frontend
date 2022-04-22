import React from "react";
import { EuiPage, EuiText, EuiPageContent, EuiPanel } from "@elastic/eui";
import { AdminTabs } from "../components";

const Admin = () => {
  return (
    <EuiPage>
      <EuiPageContent style={{ maxWidth: "80%", margin: "auto" }}>
        <EuiPanel hasShadow={false} paddingSize="l">
          <EuiText textAlign="center">
            <h1>Admin panel</h1>
          </EuiText>

          <AdminTabs />
        </EuiPanel>
      </EuiPageContent>
    </EuiPage>
  );
};
export default Admin;
