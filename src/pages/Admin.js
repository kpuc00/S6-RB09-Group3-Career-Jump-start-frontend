import React from "react";
import { EuiPage, EuiText, EuiPageTemplate } from "@elastic/eui";
import { AdminTabs } from "../components";

const Admin = () => {
  return (
    <EuiPage>
      <EuiPageTemplate
        template="centeredContent"
        pageContentProps={{ paddingSize: "none" }}
      >
        <EuiText>
          <h1>Admin page</h1>
        </EuiText>

        <AdminTabs />
      </EuiPageTemplate>
    </EuiPage>
  );
};
export default Admin;
