import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { EuiTabs, EuiTab } from "@elastic/eui";

const tabs = [
  {
    id: "candidates",
    name: "Candidates",
    link: "/admin/candidates",
  },
  {
    id: "companies",
    name: "Companies",
    link: "/admin/companies",
  },
  {
    id: "softfactors",
    name: "Soft Factors",
    link: "/admin/softfactors",
  },
  {
    id: "questions",
    name: "Questions",
    link: "/admin/questions",
  },
];

const AdminTabs = () => {
  const [selectedTabId, setSelectedTabId] = useState("candidates");

  const onSelectedTabChanged = (id) => {
    setSelectedTabId(id);
  };

  const renderTabs = () => {
    return tabs.map((tab, index) => (
      <Link to={tab.link} key={index}>
        <EuiTab
          onClick={() => onSelectedTabChanged(tab.id)}
          isSelected={tab.id === selectedTabId}
          disabled={tab.disabled}
          prepend={tab.prepend}
          append={tab.append}
        >
          {tab.name}
        </EuiTab>
      </Link>
    ));
  };

  return (
    <>
      <EuiTabs style={{ justifyContent: "center" }}>{renderTabs()}</EuiTabs>
      <Outlet />
    </>
  );
};

export default AdminTabs;
