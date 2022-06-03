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

  const AddModal = (props) => {
    const { onClose, onConfirm, handleUpdate } = props;
  
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
              <EuiFieldText
                name="title"
                onChange={handleUpdate}
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
  export default AddModal;
  