import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setAdminSelectedTabId } from "../../features/layout/layoutSlice";
import { useSelector } from "react-redux";
import {
  EuiPanel,
  EuiBasicTable,
  EuiButtonIcon,
  EuiSpacer,
  EuiButton,
} from "@elastic/eui";
import {
  getSF,
  selectSoftFactors,
  selectLoading,
  selectedSoftFactor,
  selectSelectedSF,
  updateSF,
  addSF,
  deleteSF,
} from "../../features/softfactor/softfactorSlice";
import EditModal from "./EditModalSF";
import AddModal from "./AddModal";
import DeleteModalSF from "./DeleteModalSF";

const SoftFactors = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setAdminSelectedTabId("softfactors"));
    dispatch(getSF());
  }, [dispatch]);

  const softFactors = useSelector(selectSoftFactors);
  const softFactorLoading = useSelector(selectLoading);

  const selectSelectedSoftFactor = useSelector(selectSelectedSF);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const [addModalVisible, setAddModalVisible] = useState(false);

  const [updatedSF, setUpdatedSF] = useState(null);

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
      field: "title",
      name: "Title",
    },
    {
      name: "Actions",
      actions,
    },
  ];

  const showEditModal = (item) => {
    dispatch(selectedSoftFactor(item));
    //setUpdatedUser(item);
    setEditModalVisible(true);
  };

  const showDeleteModal = (item) => {
    dispatch(selectedSoftFactor(item));
    setDeleteModalVisible(true);
  };

  const showAddModal = () => {
    setAddModalVisible(true);
    console.log("show", addModalVisible);
  };

  const closeDeleteModal = () => setDeleteModalVisible(false);
  const closeEditModal = () => setEditModalVisible(false);

  const closeAddModal = () => setAddModalVisible(false);

  const editSF = () => {
    dispatch(
      updateSF({
        id: selectSelectedSoftFactor.id,
        updatedSoftFactor: updatedSF,
      })
    );
    setUpdatedSF(null);
    closeEditModal();
  };

  const postSF = () => {
    dispatch(addSF({ newSoftFactor: updatedSF }));
    setUpdatedSF(null);
    closeAddModal();
  };

  const deleteSoftFactor = () => {
    dispatch(deleteSF({ id: selectSelectedSoftFactor.id }));
  };

  const handleUpdate = (e) => {
    const field = e.target.name;
    const newValue = e.target.value;
    setUpdatedSF({
      ...updatedSF,
      [field]: newValue,
    });
  };

  return (
    <EuiPanel hasShadow={false}>
      <EuiButton onClick={() => showAddModal()}>Add Soft factor</EuiButton>
      {addModalVisible && (
        <AddModal
          onClose={closeAddModal}
          onConfirm={postSF}
          handleUpdate={handleUpdate}
        />
      )}
      <EuiSpacer />
      {softFactors && (
        <EuiBasicTable
          tableCaption="Soft factors"
          items={softFactors}
          rowHeader="name"
          columns={columns}
          loading={softFactorLoading}
        />
      )}
      {editModalVisible && (
        <EditModal
          onClose={closeEditModal}
          onConfirm={editSF}
          handleUpdate={handleUpdate}
        />
      )}
      {deleteModalVisible && (
        <DeleteModalSF
          onCancel={closeDeleteModal}
          onConfirm={deleteSoftFactor}
        />
      )}
    </EuiPanel>
  );
};

export default SoftFactors;
