import classNames from "classnames";
import Close from "@/modules/todo/assets/icons/close.svg?react";
import { useState } from "react";
import { Button } from "../Button/Button";
import { Priority } from "../../types/todo.types";
import { Task } from "../../types/todo.types";
import { Input } from "../Input/Input";
import { Modal } from "../Modal/Modal";
import styles from "./AddEditTaskModal.module.scss";
import { useTypedDispatch } from "@/hooks/redux";
import { addTask, editTask } from "@/reducers/TodoSlice";

type AddEditTaskModalProps = {
  title: string;
  buttonTitlte: string;
  task?: Task;
  priority?: Priority;
  onClose: () => void;
  onAdd?: (title: string, priority: Priority) => void;
};

export const AddEditTaskModal = ({
  title,
  buttonTitlte,
  task,
  onClose,
}: AddEditTaskModalProps) => {
  const dispatch = useTypedDispatch();

  const [inputValue, setInputValue] = useState(task ? task.title : "");
  const [prioritySelected, setPrioritySelected] = useState<Priority | null>(
    task ? task.priority : null,
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || !prioritySelected) {
      alert("Название или приоритет задачи не выбраны");
      return;
    }

    if (task) {
      dispatch(
        editTask({
          id: task.id,
          title: inputValue,
          priority: prioritySelected,
        }),
      );
    } else {
      dispatch(addTask(inputValue, prioritySelected));
    }

    onClose();
  };

  return (
    <Modal>
      <form onSubmit={handleSubmit}>
        <div
          className={styles["add-edit-modal"]}
          data-testid="add-edit-task-modal"
        >
          <div className="flx-between">
            <span className={styles["modal-title"]}>{title}</span>
            <Close
              className="cp"
              onClick={onClose}
              aria-label="Закрыть модалку"
              data-testid="close-icon"
            />
          </div>
          <Input
            label="Задача"
            placeholder="Введите текст.."
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
            name="title"
            value={inputValue}
          />
          <div className={styles["modal-priority"]}>
            <span>Приоритет</span>
            <ul className={styles["priority-buttons"]}>
              {Object.values(Priority).map((priority) => (
                <li
                  key={priority}
                  className={classNames(styles.priority, {
                    [styles["low"]]: priority === Priority.LOW,
                    [styles["medium"]]: priority === Priority.MEDIUM,
                    [styles["high"]]: priority === Priority.HIGH,
                    [styles["low-selected"]]:
                      priority === prioritySelected &&
                      priority === Priority.LOW,
                    [styles["medium-selected"]]:
                      priority === prioritySelected &&
                      priority === Priority.MEDIUM,
                    [styles["high-selected"]]:
                      priority === prioritySelected &&
                      priority === Priority.HIGH,
                  })}
                  onClick={() => {
                    setPrioritySelected(priority);
                  }}
                >
                  {priority}
                </li>
              ))}
            </ul>
          </div>
          <div className="flx-right mt-50">
            <Button title={buttonTitlte} data-testid="add-task-btn" />
          </div>
        </div>
      </form>
    </Modal>
  );
};
