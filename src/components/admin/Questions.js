import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAdminSelectedTabId } from "../../features/layout/layoutSlice";
import {
  EuiPanel,
  EuiBasicTable,
  EuiButtonIcon,
  EuiSpacer,
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
} from "../../features/softfactor/softfactorSlice";
import EditModalQuestions from "./EditModalQuestions";
import AddModalQuestion from "./AddModalQuestion";

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
  const [addModalQuestionVisible, setAddModalQuestionVisible] = useState(false);
  const [newQuestion, setNewQuestion] = useState({});
  const [updatedQuestion, setUpdatedQuestion] = useState(null);

  const showEditModal = (item) => {
    dispatch(selectQuestion(item));
    setUpdatedQuestion(item);
    setEditModalVisible(true);
  };

  const closeEditModal = () => setEditModalVisible(false);

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
    const id = getSFId(selectedOptions[0].label);

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

  const handleAddQuestion = (e) => {
    const field = e.target.name;
    const newValue = e.target.value;
    console.log({ field, newValue });
  };

  const handleUpdate = (e) => {
    const field = e.target.name;
    const newValue = e.target.value;
    setUpdatedQuestion({
      ...updatedQuestion,
      [field]: newValue,
    });
  };

  const closeAddModalQuestion = () => setAddModalQuestionVisible(false);

  const showAddModalQuestion = () => {
    setAddModalQuestionVisible(true);
    console.log("show", addModalQuestionVisible);
  };

  const postQuestion = () => {
    console.log("newQuestion", newQuestion);
    dispatch(addQuestion({ newQuestion }));
    setNewQuestion(null);
    closeAddModalQuestion();
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
          <EuiButton onClick={() => showAddModalQuestion()}>
            Add Question
          </EuiButton>
          {addModalQuestionVisible && (
            <AddModalQuestion
              onClose={closeAddModalQuestion}
              onConfirm={postQuestion}
              handleUpdate={handleAddQuestion}
              newQuestion={newQuestion}
              setNewQuestion={setNewQuestion}
            />
          )}
        </EuiFlexItem>
      </EuiFlexGroup>

      <EuiSpacer />
      {questions && (
        <EuiBasicTable
          tableCaption="Soft factors"
          items={getQuestionContent(questions)}
          rowHeader="name"
          columns={columns}
          loading={questionsLoading}
        />
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
