import Add from "@/modules/todo/assets/icons/add.svg?react";
import { AddEditTaskModal } from "../AddEditTaskModal/AddEditTaskModal";
import { Button } from "../Button/Button";
import { TaskCard } from "../TaskCard/TaskCard";
import styles from "./TodoList.module.scss";
import { DeleteModal } from "../DeleteModal/DeleteModal";

import { useTypedSelector, useTypedDispatch } from "@/hooks/redux";
import { closeModal, deleteTask, openModal } from "@/reducers/TodoSlice";

export const TodoList = () => {
  const dispatch = useTypedDispatch();
  const todos = useTypedSelector((state) => state.todoReducer.todoList);
  const activeModal = useTypedSelector(
    (state) => state.todoReducer.modalVisible,
  );
  const taskId = useTypedSelector((state) => state.todoReducer.taskId);
  const currentEditingTask = todos.find((task) => task.id === taskId);

  const handleOpenAddModal = () => {
    dispatch(openModal({ type: "add" }));
  };
  const handleOpenEditModal = (id: string) =>
    dispatch(openModal({ type: "edit", id: id }));
  const handleOpenDeleteModal = (id: string) =>
    dispatch(openModal({ type: "delete", id: id }));
  const handleCloseModal = () => {
    dispatch(closeModal());
  };
  const confirmDeleteTask = () => {
    if (taskId) {
      dispatch(deleteTask(taskId));
      handleCloseModal();
    }
  };

  return (
    <>
      <div className={styles["page-wrapper"]}>
        <div className={styles["top-title"]}>
          <h2>Список задач</h2>
          <Button
            title="Добавить задачу"
            icon={<Add />}
            onClick={handleOpenAddModal}
          />
        </div>
        <div className={styles["task-container"]}>
          {todos.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onOpenDeleteModal={handleOpenDeleteModal}
              onOpenEditModal={() => {
                handleOpenEditModal(task.id);
              }}
            />
          ))}
        </div>
      </div>
      {activeModal === "add" && (
        <AddEditTaskModal
          title="Добавить задачу"
          buttonTitlte="Добавить"
          onClose={handleCloseModal}
        />
      )}
      {activeModal === "edit" && (
        <AddEditTaskModal
          title="Редактировать задачу"
          buttonTitlte="Редактировать"
          onClose={handleCloseModal}
          task={currentEditingTask}
        />
      )}
      {activeModal === "delete" && (
        <DeleteModal onClose={handleCloseModal} onConfirm={confirmDeleteTask} />
      )}
    </>
  );
};
