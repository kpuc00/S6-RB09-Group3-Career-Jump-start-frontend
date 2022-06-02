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
  } from "@elastic/eui";
  import { useSelector } from "react-redux";
  import { selectSelectedQ } from "../../features/softfactor/softfactorSlice";
  
  const EditModalQuestions = (props) => {
    const { onClose, onConfirm, handleUpdate } = props;
    
    const selectSelected = useSelector(selectSelectedQ);
  
    return (
      <EuiModal onClose={onClose}>
        <EuiModalHeader>
          <EuiModalHeaderTitle>
            <h1>Edit question</h1>
          </EuiModalHeaderTitle>
        </EuiModalHeader>
  
        <EuiModalBody>
          <EuiForm id={"editForm" + selectSelected.id} component="form">
            <EuiFormRow label="Title">
              <EuiFieldText
                name="content"
                defaultValue={selectSelected.content}
                onChange={handleUpdate}
              />
            </EuiFormRow>
          </EuiForm>
        </EuiModalBody>
  
        <EuiModalFooter>
          <EuiButtonEmpty onClick={onClose}>Cancel</EuiButtonEmpty>
  
          <EuiButton
            type="submit"
            form={"editForm" + selectSelected.id}
            onClick={onConfirm}
            fill
          >
            Save
          </EuiButton>
        </EuiModalFooter>
      </EuiModal>
    );
  };
  export default EditModalQuestions;
  