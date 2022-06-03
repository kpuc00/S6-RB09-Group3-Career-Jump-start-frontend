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
  import { selectSelectedSF } from "../../features/softfactor/softfactorSlice";
  
  const EditModalSF = (props) => {
    const { onClose, onConfirm, handleUpdate } = props;
    const selectSelected = useSelector(selectSelectedSF);
  
    return (
      <EuiModal onClose={onClose}>
        <EuiModalHeader>
          <EuiModalHeaderTitle>
            <h1>Edit - {selectSelected.title}</h1>
          </EuiModalHeaderTitle>
        </EuiModalHeader>
  
        <EuiModalBody>
          <EuiForm id={"editForm" + selectSelected.id} component="form">
            <EuiFormRow label="Title">
              <EuiFieldText
                name="title"
                defaultValue={selectSelected.title}
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
  export default EditModalSF;
  