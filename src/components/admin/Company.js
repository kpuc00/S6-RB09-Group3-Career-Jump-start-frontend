import React, { useState } from "react";
import {
  EuiPanel,
  EuiImage,
  EuiFlexGroup,
  EuiFlexItem,
  EuiDescriptionList,
  EuiDescriptionListTitle,
  EuiDescriptionListDescription,
  EuiButtonIcon,
  EuiSpacer,
} from "@elastic/eui";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUser,
  selectSelectedUser,
  selectUser,
  updateUser,
} from "../../features/user/userSlice";
import DeleteModal from "./DeleteModal";
import EditModal from "./EditModal";

const Company = (props) => {
  const { data } = props;
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [updatedUser, setUpdatedUser] = useState(null);

  const dispatch = useDispatch();
  const selectedUser = useSelector(selectSelectedUser);

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

  const editCompany = () => {
    console.log("edit", updatedUser);
    dispatch(updateUser(selectedUser.id, updatedUser));
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

  const deleteCompany = () => {
    dispatch(deleteUser(selectedUser.id));
    closeDeleteModal();
  };
  return (
    <>
      <EuiPanel color="subdued">
        <EuiFlexGroup alignItems="center" justifyContent="spaceBetween">
          <EuiFlexItem grow={false}>
            <EuiImage
              size={100}
              alt={data.username + " logo"}
              src={data.logo}
            />
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiDescriptionList>
              <EuiDescriptionListTitle>
                {data.firstName} {data.lastName}
              </EuiDescriptionListTitle>
              <EuiDescriptionListDescription>
                Location: {data.location}
              </EuiDescriptionListDescription>
              <EuiDescriptionListDescription>
                Created on: {data.created}
              </EuiDescriptionListDescription>
            </EuiDescriptionList>
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiButtonIcon
              color="warning"
              onClick={() => showEditModal(data)}
              iconType="pencil"
              aria-label="Modify company"
            />
            <EuiButtonIcon
              color="danger"
              onClick={() => showDeleteModal(data)}
              iconType="trash"
              aria-label="Remove company"
            />
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiPanel>
      <EuiSpacer />
      {editModalVisible && (
        <EditModal
          onClose={closeEditModal}
          onConfirm={editCompany}
          handleUpdate={handleUpdate}
        />
      )}
      {deleteModalVisible && (
        <DeleteModal onCancel={closeDeleteModal} onConfirm={deleteCompany} />
      )}
    </>
  );
};

export default Company;
