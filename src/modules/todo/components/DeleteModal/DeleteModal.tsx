import { Button } from "../Button/Button";
import { Modal } from "../Modal/Modal";
import styles from "./DeleteModal.module.scss";

type DeleteTaskModalProps = {
  onClose: () => void;
  onConfirm: () => void;
};

export const DeleteModal = ({ onClose, onConfirm }: DeleteTaskModalProps) => {
  return (
    <Modal>
      <div className={styles["delete-modal"]} data-testid="delete-task-modal">
        <p>Точно удалить задачу?</p>
        <div className={styles["delete-modal__actions"]}>
          <Button title="Удалить" onClick={onConfirm} />
          <Button title="Выйти" outline onClick={onClose} />
        </div>
      </div>
    </Modal>
  );
};
