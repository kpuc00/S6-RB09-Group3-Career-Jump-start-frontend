import { EuiConfirmModal } from "@elastic/eui";
import { useSelector } from "react-redux";
import { selectSelectedSF } from "../../features/softfactor/softfactorSlice";

const DeleteModalSF = (props) => {
  const { onCancel, onConfirm } = props;
  const selectedSF = useSelector(selectSelectedSF);

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
        <strong>{`${selectedSF.title}`}</strong>
      </p>
      <p>Are you sure you want to do this?</p>
    </EuiConfirmModal>
  );
};
export default DeleteModalSF;
