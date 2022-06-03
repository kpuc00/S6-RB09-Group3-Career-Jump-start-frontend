import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAdminSelectedTabId } from "../../features/layout/layoutSlice";
import {
  EuiPanel,
  EuiBasicTable,
  EuiButtonIcon,
  EuiSpacer,
  EuiLoadingSpinner,
  EuiButton,
  EuiComboBox,
  EuiFlexGroup,
  EuiFlexItem,
} from "@elastic/eui";
import {
  getSF,
  getQuestionsBySFId,
  selectQuestions,
  selectLoading,
  selectSelectedQ,
  selectQuestion,
  updateQuestion,
  addQuestion,
  selectSoftFactors,
  selectedSoftFactor,
} from "../../features/softfactor/softfactorSlice";
import EditModalQuestions from "./EditModalQuestions";

import AddModal from "./AddModal";
//import DeleteModalSF from "./DeleteModalSF";

const Questions = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setAdminSelectedTabId("questions"));
    dispatch(getSF());
  }, [dispatch]);

  const softFactors = useSelector(selectSoftFactors);
  const questionsLoading = useSelector(selectLoading);
  const questions = useSelector(selectQuestions);
  const selectedQuestion = useSelector(selectSelectedQ);
  const [editModalVisible, setEditModalVisible] = useState(false);
  //const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const [updatedQuestion, setUpdatedQuestion] = useState(null);

  const showEditModal = (item) => {
    dispatch(selectQuestion(item));
    setUpdatedQuestion(item);
    setEditModalVisible(true);
  };

  // const showDeleteModal = (item) => {
  //   dispatch(selectQuestion(item));
  //   setDeleteModalVisible(true);
  // };

  const closeEditModal = () => setEditModalVisible(false);
  //const closeDeleteModal = () => setDeleteModalVisible(false);

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
            //onClick={() => showDeleteModal(item)}
            iconType="trash"
            aria-label="Remove candidate"
          />
        );
      },
    },
  ];
  const columns = [
    {
      field: "content",
      name: "Title",
    },
    {
      name: "Actions",
      actions,
    },
  ];

  const getLabels = (softFactors) => {
    return softFactors.map((item) => ({ label: item.title }));
  };

  function getSFId(title) {
    let found = "";
    softFactors.forEach((element) => {
      if (element.title === title) {
        console.log("SOFT FACTOR ID VYV FUNCTION", element.id);
        found = element.id;
      }
    });
    return found;
  }

  function getQuestionContent(questions) {
    return questions.map((item) => ({ content: item.content }));
  }

  const [selectedOptions, setSelected] = useState();

  const onChange = (selectedOptions) => {
    setSelected(selectedOptions);
    let id = getSFId(selectedOptions[0].label);

    dispatch(getQuestionsBySFId({ id }));
  };

  function getQuestionID(title) {
    console.log(questions);
    let found = "";
    questions.forEach((element) => {
      if (element.content === title) {
        console.log("question id - ", element.id);
        found = element.id;
      }
    });
    return found;
  }

  const editQuestion = async () => {
    console.log("this", updatedQuestion);

    let idQ = getQuestionID(selectedQuestion.content);
    dispatch(updateQuestion({ id: idQ, updatedQuestion }));
    setUpdatedQuestion(null);
    closeEditModal();
  };

  const handleUpdate = (e) => {
    const field = e.target.name;
    const newValue = e.target.value;
    setUpdatedQuestion({
      ...updatedQuestion,
      [field]: newValue,
    });
  };

  const sf = useSelector(selectedSoftFactor);

  const [addModalVisible, setAddModalVisible] = useState(false);

  const closeAddModal = () => setAddModalVisible(false);

  const showAddModal = () => {
    setAddModalVisible(true);
    console.log("show", addModalVisible);
  };

  const postQuestion = () => {
    console.log(sf);
    dispatch(addQuestion({ newQuestion: updatedQuestion }));
    setUpdatedQuestion(null);
    closeAddModal();
  };

  return (
    <EuiPanel hasShadow={false}>
      <EuiFlexGroup justifyContent="spaceBetween">
        <EuiFlexItem style={{ minWidth: 300 }} grow={false}>
          <EuiComboBox
            placeholder="Select soft factor"
            options={getLabels(softFactors)}
            selectedOptions={selectedOptions}
            singleSelection={{ asPlainText: true }}
            onChange={onChange}
          />
        </EuiFlexItem>
        <EuiFlexItem grow={false} style={{ maxWidth: 150 }}>
          <EuiButton isDisabled={true} onClick={() => showAddModal()}>
            Add Question
          </EuiButton>
          {addModalVisible && (
            <AddModal
              onClose={closeAddModal}
              onConfirm={postQuestion}
              handleUpdate={handleUpdate}
            />
          )}
        </EuiFlexItem>
      </EuiFlexGroup>

      <EuiSpacer />
      {questionsLoading ? (
        <EuiLoadingSpinner size="xl" />
      ) : (
        questions && (
          <EuiBasicTable
            tableCaption="Soft factors"
            items={getQuestionContent(questions)}
            rowHeader="name"
            columns={columns}
          />
        )
      )}

      {editModalVisible && (
        <EditModalQuestions
          onClose={closeEditModal}
          onConfirm={editQuestion}
          handleUpdate={handleUpdate}
        />
      )}
      {/* {deleteModalVisible && (
        <DeleteModalSF onCancel={closeDeleteModal}
          onConfirm={deleteQuestion}
        />
      )} */}
    </EuiPanel>
  );
};

export default Questions;
