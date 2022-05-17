import React, { useEffect, useState } from "react";
import {
  EuiPanel,
  EuiBasicTable,
  EuiButtonIcon,
  EuiHealth,
  EuiSearchBar,
  EuiSpacer,
  EuiLoadingSpinner,
} from "@elastic/eui";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUser,
  getCandidates,
  selectCandidates,
  selectSelectedUser,
  selectUser,
  selectUserLoading,
  updateUser,
} from "../../features/user/userSlice";
import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";
import { setAdminSelectedTabId } from "../../features/layout/layoutSlice";

const Candidates = () => {
  const dispatch = useDispatch();
  const [sortField, setSortField] = useState("username");
  const [sortDirection, setSortDirection] = useState("asc");
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const selectedUser = useSelector(selectSelectedUser);
  const [updatedUser, setUpdatedUser] = useState(null);

  useEffect(() => {
    dispatch(setAdminSelectedTabId("candidates"));
    dispatch(getCandidates());
  }, [dispatch]);

  const userLoading = useSelector(selectUserLoading);
  const candidates = useSelector(selectCandidates);

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

  const actions = [
    {
      render: (item) => {
        return (
          <EuiButtonIcon
            color="warning"
            onClick={() => showEditModal(item)}
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
            onClick={() => showDeleteModal(item)}
            iconType="trash"
            aria-label="Remove candidate"
          />
        );
      },
    },
  ];

  const columns = [
    {
      field: "firstName",
      name: "First name",
      sortable: true,
    },
    {
      field: "lastName",
      name: "Last name",
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
        const label = status || "unknown";
        return <EuiHealth color={color}>{label}</EuiHealth>;
      },
    },
    {
      name: "Actions",
      actions,
    },
  ];

  const items = candidates.filter((candidate, index) => index < 10);

  const showEditModal = (item) => {
    dispatch(selectUser(item));
    setUpdatedUser(item);
    setEditModalVisible(true);
  };
  const closeEditModal = () => setEditModalVisible(false);

  const showDeleteModal = (item) => {
    dispatch(selectUser(item));
    setDeleteModalVisible(true);
  };
  const closeDeleteModal = () => setDeleteModalVisible(false);

  const editCandidate = () => {
    console.log("edit", updatedUser);
    dispatch(updateUser({ id: selectedUser.id, updatedUser }));
    setUpdatedUser(null);
    closeEditModal();
  };

  const handleUpdate = (e) => {
    console.log(updatedUser);
    const field = e.target.name;
    const newValue = e.target.value;
    console.log(field);
    console.log(newValue);
    setUpdatedUser({
      ...updatedUser,
      [field]: newValue,
    });
    console.log(updatedUser);
  };

  const deleteCandidate = () => {
    dispatch(deleteUser(selectedUser.id));
    closeDeleteModal();
  };

  return (
    <EuiPanel hasShadow={false}>
      <EuiSearchBar onChange={() => {}} />
      <EuiSpacer />
      {userLoading ? (
        <EuiLoadingSpinner size="xl" />
      ) : (
        candidates && (
          <EuiBasicTable
            tableCaption="Candidates"
            items={items}
            rowHeader="name"
            columns={columns}
            sorting={sorting}
            onChange={onTableChange}
          />
        )
      )}
      {editModalVisible && (
        <EditModal
          onClose={closeEditModal}
          onConfirm={editCandidate}
          handleUpdate={handleUpdate}
        />
      )}
      {deleteModalVisible && (
        <DeleteModal onCancel={closeDeleteModal} onConfirm={deleteCandidate} />
      )}
    </EuiPanel>
  );
};
export default Candidates;
