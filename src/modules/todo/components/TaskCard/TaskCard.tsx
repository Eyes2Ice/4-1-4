import classNames from "classnames";
import DeleteIcon from "@/modules/todo/assets/icons/delete.svg?react";
import EditIcon from "@/modules/todo/assets/icons/edit.svg?react";
import { CircularProgressBar } from "../CircularProgressBar/CircularProgressBar";
import { Priority, Status, Task } from "@/modules/todo/types/todo.types";
import styles from "./TaskCard.module.scss";
import { useTypedDispatch } from "@/hooks/redux";
import { toggleTaskStatus } from "@/reducers/TodoSlice";

type TaskCardProps = {
  task: Task;
  onOpenDeleteModal: (id: string) => void;
  onOpenEditModal: () => void;
};

export const TaskCard = ({
  task,
  onOpenDeleteModal,
  onOpenEditModal,
}: TaskCardProps) => {
  const { id, title, priority, status, progress } = task;
  const dispatch = useTypedDispatch();

  return (
    <div className={styles["task-card"]}>
      <div className="flex w-100">
        <span className={styles["task-title"]}>Задача</span>
        <span className={styles.task}>{title}</span>
      </div>
      <div className="flex">
        <span className={styles["priority-title"]}>Приоритет</span>
        <span
          className={classNames(styles.priority, {
            [styles["priority--low"]]: priority === Priority.LOW,
            [styles["priority--medium"]]: priority === Priority.MEDIUM,
            [styles["priority--high"]]: priority === Priority.HIGH,
          })}
        >
          {priority}
        </span>
      </div>
      <div className={styles["task-status-wrapper"]}>
        <button
          onClick={() => {
            dispatch(toggleTaskStatus(id));
          }}
          className={classNames(styles.status, {
            [styles["status--todo"]]: status === Status.TODO,
            [styles["status--progress"]]: status === Status.PROGRESS,
            [styles["status--done"]]: status === Status.DONE,
          })}
        >
          {status}
        </button>
      </div>
      <div className={styles.progress}>
        <CircularProgressBar
          strokeWidth={2}
          sqSize={24}
          percentage={progress}
        />
      </div>
      <div className={styles.actions}>
        <EditIcon
          className="mr-20 cp"
          onClick={() => {
            onOpenEditModal();
          }}
        />
        <DeleteIcon
          data-testid="delete-icon"
          className="cp"
          onClick={() => {
            onOpenDeleteModal(id);
          }}
        />
      </div>
    </div>
  );
};
