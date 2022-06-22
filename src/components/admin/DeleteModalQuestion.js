import { EuiConfirmModal } from "@elastic/eui";
import { useSelector } from "react-redux";
import { selectSelectedQ } from "../../features/softfactor/softfactorSlice";

const DeleteModalQuestion = (props) => {
  const { onCancel, onConfirm } = props;
  const selectedQuestion = useSelector(selectSelectedQ);
  console.log(selectedQuestion);
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
        You are about to delete the following question:
        <br />
        <strong>{`${selectedQuestion.content}`}</strong>
      </p>
      <p>Are you sure you want to do this?</p>
    </EuiConfirmModal>
  );
};
export default DeleteModalQuestion;
