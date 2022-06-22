import React, { useState } from "react";
import {
  EuiModal,
  EuiModalHeader,
  EuiModalHeaderTitle,
  EuiModalBody,
  EuiForm,
  EuiFormRow,
  EuiFieldText,
  EuiModalFooter,
  EuiButtonEmpty,
  EuiButton,
  EuiComboBox,
  EuiRadioGroup,
} from "@elastic/eui";
import { useSelector } from "react-redux";

import { selectSoftFactors } from "../../features/softfactor/softfactorSlice";

const AddModalQuestion = (props) => {
  const { onClose, onConfirm, newQuestion, setNewQuestion } = props;
  const softFactors = useSelector(selectSoftFactors);

  const getLabels = (softFactors) => {
    return softFactors.map((item) => ({ label: item.title }));
  };

  const [selectedOptions, setSelected] = useState();

  const onChange = (selectedOptions) => {
    setSelected(selectedOptions);
    const id = getSFId(selectedOptions[0].label);
    const title = selectedOptions[0].label;
    setNewQuestion({ ...newQuestion, softFactor: { id, title } });
  };

  const radios = [
    {
      id: "roleId_1",
      label: "Candidate",
    },
    {
      id: "roleId_2",
      label: "Company",
    },
  ];

  const radiosType = [
    {
      id: "type_0",
      label: "Closed",
    },
    {
      id: "type_1",
      label: "Open",
    },
  ];

  const [radioIdSelected, setRadioIdSelected] = useState(null);

  const [radioIdTypeSelected, setRadioIdTypeSelected] = useState(null);

  const onChangeContent = (e) => {
    setNewQuestion({ ...newQuestion, content: e.target.value });
  };

  const onChangeRole = (optionId) => {
    const roleId = optionId.substring(optionId.indexOf("_") + 1);
    setRadioIdSelected(optionId);
    setNewQuestion({
      ...newQuestion,
      roleId,
    });
  };

  const onChangeType = (optionId) => {
    const type = optionId.substring(optionId.indexOf("_") + 1);
    setRadioIdTypeSelected(optionId);
    setNewQuestion({
      ...newQuestion,
      type,
    });
  };

  function getSFId(title) {
    let found = "";
    softFactors.forEach((element) => {
      if (element.title === title) {
        found = element.id;
      }
    });
    return found;
  }

  return (
    <EuiModal onClose={onClose}>
      <EuiModalHeader>
        <EuiModalHeaderTitle>
          <h1>Add new</h1>
        </EuiModalHeaderTitle>
      </EuiModalHeader>

      <EuiModalBody>
        <EuiForm component="form">
          <EuiFormRow label="Title">
            <EuiFieldText name="title" onChange={onChangeContent} />
          </EuiFormRow>

          <EuiFormRow label="Select soft factor">
            <EuiComboBox
              name="sfId"
              placeholder="Select soft factor"
              options={getLabels(softFactors)}
              selectedOptions={selectedOptions}
              singleSelection={{ asPlainText: true }}
              onChange={onChange}
            />
          </EuiFormRow>

          <EuiFormRow label="Select target users">
            <EuiRadioGroup
              options={radios}
              idSelected={radioIdSelected}
              onChange={(id) => onChangeRole(id)}
              name="role_id"
            />
          </EuiFormRow>

          <EuiFormRow label="Select question type">
            <EuiRadioGroup
              options={radiosType}
              idSelected={radioIdTypeSelected}
              onChange={(id) => onChangeType(id)}
              name="type"
            />
          </EuiFormRow>
        </EuiForm>
      </EuiModalBody>

      <EuiModalFooter>
        <EuiButtonEmpty onClick={onClose}>Cancel</EuiButtonEmpty>

        <EuiButton
          type="submit"
          //form="new-soft-factor"
          onClick={onConfirm}
          fill
        >
          Save
        </EuiButton>
      </EuiModalFooter>
    </EuiModal>
  );
};
export default AddModalQuestion;
