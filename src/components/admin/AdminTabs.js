import React from "react";
import { Link, Outlet } from "react-router-dom";
import { EuiTabs, EuiTab } from "@elastic/eui";

const AdminTabs = () => {
  return (
    <>
      <EuiTabs>
        <Link to="/admin/candidates">
          <EuiTab>Candidates</EuiTab>
        </Link>
        <Link to="/admin/companies">
          <EuiTab>Companies</EuiTab>
        </Link>
        <Link to="/admin/softfactors">
          <EuiTab>Soft Factors</EuiTab>
        </Link>
      </EuiTabs>
      <Outlet />
    </>
  );
};

export default AdminTabs;
