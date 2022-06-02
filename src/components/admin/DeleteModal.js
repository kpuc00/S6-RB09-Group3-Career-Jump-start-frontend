import { EuiConfirmModal } from "@elastic/eui";
import { useSelector } from "react-redux";
import { selectSelectedUser } from "../../features/user/userSlice";

const DeleteModal = (props) => {
  const { onCancel, onConfirm } = props;
  const selectedUser = useSelector(selectSelectedUser);

  return (
    <EuiConfirmModal
      title="This cannot be undone"
      onCancel={onCancel}
      onConfirm={onConfirm}
      cancelButtonText="Cancel"
      confirmButtonText="Delete"
      buttonColor="danger"
      defaultFocusedButton="confirm"
    >
      <p>
        You are about to delete{" "}
        <strong>{`${selectedUser.firstName} ${selectedUser.lastName}`}</strong>
      </p>
      <p>Are you sure you want to do this?</p>
    </EuiConfirmModal>
  );
};
export default DeleteModal;
