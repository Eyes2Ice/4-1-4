import { Task } from "../modules/todo/types/todo.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Priority, Status } from "@/modules/todo/types/todo.types";

interface TodoState {
  todoList: Task[];
  modalVisible: ModalType;
  taskId: string | null;
}

export type ModalType = "add" | "edit" | "delete" | null;

const initialState: TodoState = {
  todoList: [
    {
      id: "01",
      title: "Выучить React state",
      priority: Priority.HIGH,
      status: Status.TODO,
      progress: 0,
    },
    {
      id: "02",
      title: "Читать книгу",
      priority: Priority.LOW,
      status: Status.DONE,
      progress: 100,
    },
    {
      id: "03",
      title: "Сходить в магазин",
      priority: Priority.MEDIUM,
      status: Status.PROGRESS,
      progress: 50,
    },
    {
      id: "04",
      title: "Заплатить за квартиру",
      priority: Priority.HIGH,
      status: Status.DONE,
      progress: 100,
    },
    {
      id: "05",
      title: "Написать статью",
      priority: Priority.MEDIUM,
      status: Status.PROGRESS,
      progress: 50,
    },
  ],
  modalVisible: null,
  taskId: null,
};

export const todoSlice = createSlice({
  name: "todoList",
  initialState,
  reducers: {
    openModal: (
      state,
      action: PayloadAction<{ type: ModalType; id?: string | null }>,
    ) => {
      state.modalVisible = action.payload.type;
      state.taskId = action.payload.id || null;
    },
    closeModal: (state) => {
      state.modalVisible = null;
      state.taskId = null;
    },
    addTask: {
      reducer: (state, action: PayloadAction<Task>) => {
        state.todoList.unshift(action.payload);
      },
      prepare: (title: string, priority: Priority) => {
        return {
          payload: {
            title,
            id: String(Date.now()),
            priority,
            status: Status.TODO,
            progress: 0,
          } as Task,
        };
      },
    },
    editTask: (
      state,
      action: PayloadAction<Pick<Task, "id" | "title" | "priority">>,
    ) => {
      const task = state.todoList.find((task) => task.id === action.payload.id);
      if (task) {
        task.title = action.payload.title;
        task.priority = action.payload.priority;
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.todoList = state.todoList.filter(
        (task) => task.id !== action.payload,
      );
    },
    toggleTaskStatus: (state, action: PayloadAction<string>) => {
      const task = state.todoList.find((task) => task.id === action.payload);
      if (task) {
        if (task.status === Status.TODO) {
          task.status = Status.PROGRESS;
          task.progress = 50;
        } else if (task.status === Status.PROGRESS) {
          task.status = Status.DONE;
          task.progress = 100;
        }
      }
    },
  },
});

export const {
  openModal,
  closeModal,
  addTask,
  deleteTask,
  editTask,
  toggleTaskStatus,
} = todoSlice.actions;

export default todoSlice.reducer;
