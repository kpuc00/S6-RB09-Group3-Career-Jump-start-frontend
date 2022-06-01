import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setAdminSelectedTabId } from "../../features/layout/layoutSlice";
import {  useSelector } from "react-redux";
import {
  EuiPanel,
  EuiBasicTable,
  EuiButtonIcon,
  EuiHealth,
  EuiSearchBar,
  EuiSpacer,
  EuiLoadingSpinner,
  EuiButton
} from "@elastic/eui";
import {
  getSF,
  selectSoftFactors,
  selectSoftFactorsLoading,
  selectedSoftFactor,
  selectSelectedSF,
  updateSF
} from "../../features/softfactor/softfactorSlice";
import EditModal from "./EditModalSF";
import DeleteModal from "./DeleteModal";
import AddModal from "./AddModal";


const SoftFactors = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setAdminSelectedTabId("softfactors"));
    dispatch(getSF());
  }, [dispatch]);


  const softFactors = useSelector(selectSoftFactors);
  const softFactorLoading = useSelector(selectSoftFactorsLoading);
  
  const selectSelectedSoftFactor = useSelector(selectSelectedSF)
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
  ]

  const showEditModal = (item) => {
    dispatch(selectedSoftFactor(item));
    //setUpdatedUser(item);
    setEditModalVisible(true);
  };

  const showDeleteModal = (item) => {
    dispatch(selectedSoftFactor(item));
    setDeleteModalVisible(true);
  };
  const closeDeleteModal = () => setDeleteModalVisible(false);
  const closeEditModal = () => setEditModalVisible(false);

  const closeAddModal = () => setAddModalVisible(false);

  const editSF = () => {
    dispatch(updateSF({ id: selectSelectedSoftFactor.id, updatedSoftFactor:updatedSF }));
    setUpdatedSF(null);
    closeEditModal();
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
    {/* <EuiButton>
      {<AddModal 
      onClose={closeAddModal}
      onConfirm={addSF}

      />} 
      Add Soft factor</EuiButton> */}
      <EuiSpacer />
      {softFactorLoading ? (
        <EuiLoadingSpinner size="xl" />
      ) : (
        softFactors && (
          <EuiBasicTable
            tableCaption="Soft factors"
            items={softFactors}
            rowHeader="name"
            columns={columns}
          />
        )
      )}
      {editModalVisible && (
        <EditModal
          onClose={closeEditModal}
          onConfirm={editSF}
          handleUpdate={handleUpdate}
        />
      )}
      {deleteModalVisible && (
        <DeleteModal onCancel={closeDeleteModal} 
        //onConfirm={deleteCandidate} 
        />
      )}
    </EuiPanel>
  );
};

export default SoftFactors;
