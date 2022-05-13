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
import { selectSelectedUser } from "../../features/user/userSlice";

const EditModal = (props) => {
  const { onClose, onConfirm, handleUpdate } = props;
  const selectedUser = useSelector(selectSelectedUser);

  return (
    <EuiModal onClose={onClose}>
      <EuiModalHeader>
        <EuiModalHeaderTitle>
          <h1>Edit - {`${selectedUser.firstName} ${selectedUser.lastName}`}</h1>
        </EuiModalHeaderTitle>
      </EuiModalHeader>

      <EuiModalBody>
        <EuiForm id={"editForm" + selectedUser.id} component="form">
          <EuiFormRow label="First name">
            <EuiFieldText
              name="firstName"
              defaultValue={selectedUser.firstName}
              onChange={handleUpdate}
            />
          </EuiFormRow>
          <EuiFormRow label="Last name">
            <EuiFieldText
              name="lastName"
              defaultValue={selectedUser.lastName}
              onChange={handleUpdate}
            />
          </EuiFormRow>
          <EuiFormRow label="username">
            <EuiFieldText
              name="username"
              defaultValue={selectedUser.username}
              onChange={handleUpdate}
            />
          </EuiFormRow>
          <EuiFormRow label="Email">
            <EuiFieldText
              name="email"
              defaultValue={selectedUser.email}
              onChange={handleUpdate}
            />
          </EuiFormRow>
          <EuiFormRow label="Phone">
            <EuiFieldText
              name="phoneNumber"
              defaultValue={selectedUser.phoneNumber}
              onChange={handleUpdate}
            />
          </EuiFormRow>
        </EuiForm>
      </EuiModalBody>

      <EuiModalFooter>
        <EuiButtonEmpty onClick={onClose}>Cancel</EuiButtonEmpty>

        <EuiButton
          type="submit"
          form={"editForm" + selectedUser.id}
          onClick={onConfirm}
          fill
        >
          Save
        </EuiButton>
      </EuiModalFooter>
    </EuiModal>
  );
};
export default EditModal;
