import React, { useState } from "react";
import {
  EuiBasicTable,
  EuiButtonIcon,
  EuiHealth,
  EuiSearchBar,
  EuiSpacer,
} from "@elastic/eui";

const fakeDb = [
  {
    id: "1",
    name: "John Doe",
    status: "assigned",
  },
  {
    id: "2",
    name: "Jane doe",
    status: "waiting",
  },
  {
    id: "3",
    name: "tom Doe",
    status: "assigned",
  },
];

const Candidates = () => {
  const [sortField, setSortField] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");

  const onTableChange = ({ sort = {} }) => {
    const { field: sortField, direction: sortDirection } = sort;
    setSortField(sortField);
    setSortDirection(sortDirection);
  };

  const sorting = {
    sort: {
      field: sortField,
      direction: sortDirection,
    },
  };

  const editUser = (item) => {
    console.log("edit", item);
  };
  const deleteUser = (item) => {
    console.log("delete", item);
  };

  const actions = [
    {
      render: (item) => {
        return (
          <EuiButtonIcon
            color="warning"
            onClick={() => editUser(item)}
            iconType="pencil"
            aria-label="Modify candidate"
          />
        );
      },
    },
    {
      render: (item) => {
        return (
          <EuiButtonIcon
            color="danger"
            onClick={() => deleteUser(item)}
            iconType="trash"
            aria-label="Remove candidate"
          />
        );
      },
    },
  ];

  const columns = [
    {
      field: "name",
      name: "Name",
      sortable: true,
    },
    {
      field: "status",
      name: "Status",
      sortable: true,
      dataType: "boolean",
      render: (status) => {
        const color =
          status === "assigned"
            ? "success"
            : status === "waiting"
            ? "warning"
            : "danger";
        const label = status;
        return <EuiHealth color={color}>{label}</EuiHealth>;
      },
    },
    {
      name: "Actions",
      actions,
    },
  ];

  const items = fakeDb.filter((user, index) => index < 10);

  return (
    <>
      <EuiSearchBar onChange={() => {}} />
      <EuiSpacer />
      <EuiBasicTable
        tableCaption="Demo of EuiBasicTable"
        items={items}
        rowHeader="name"
        columns={columns}
        sorting={sorting}
        onChange={onTableChange}
      />
    </>
  );
};
export default Candidates;
