import React, { useEffect, useState } from "react";
import {
  EuiPanel,
  EuiBasicTable,
  EuiButtonIcon,
  EuiHealth,
  EuiSearchBar,
  EuiSpacer,
  EuiCallOut,
} from "@elastic/eui";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUser,
  getCandidates,
  selectCandidates,
  selectError,
  selectMessage,
  selectSelectedUser,
  selectUser,
  selectUserLoading,
  selectUserProcessing,
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

  const userProcessing = useSelector(selectUserProcessing);
  const error = useSelector(selectError);
  const message = useSelector(selectMessage);

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
          status === "ASSIGNED"
            ? "success"
            : status === "PENDING"
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

  const items = candidates.filter((candidate, index) => index < 1000);

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
    dispatch(updateUser({ id: selectedUser.id, updatedUser }));
    setUpdatedUser(null);
    closeEditModal();
  };

  const handleUpdate = (e) => {
    const field = e.target.name;
    const newValue = e.target.value;
    setUpdatedUser({
      ...updatedUser,
      [field]: newValue,
    });
  };

  const deleteCandidate = () => {
    dispatch(deleteUser(selectedUser.id));
    closeDeleteModal();
  };

  return (
    <EuiPanel hasShadow={false}>
      <EuiSearchBar onChange={() => {}} />
      <EuiSpacer />
      {error && (
        <>
          <EuiCallOut color="danger" iconType="alert" title={error} />
          <EuiSpacer />
        </>
      )}
      {message && (
        <>
          <EuiCallOut title={message} />
          <EuiSpacer />
        </>
      )}
      {candidates && (
        <EuiBasicTable
          tableCaption="Candidates"
          items={items}
          rowHeader="name"
          columns={columns}
          sorting={sorting}
          onChange={onTableChange}
          loading={userLoading || userProcessing}
        />
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
