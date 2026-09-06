import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, test, expect } from "vitest";
import { renderWithProviders } from "@/utils/test-utils";
import App from "../../../../app/App";
import { Priority, Status } from "../../types/todo.types";

describe("Тесты функционала самого списка задач", () => {
  test("При отправке формы новая задача должна добавляться в список задач", async () => {
    const user = userEvent.setup();

    renderWithProviders(<App />, {
      preloadedState: {
        todoReducer: { todoList: [], modalVisible: "add", taskId: null },
      },
    });

    const input = screen.getByPlaceholderText(/Введите текст/i);
    await user.type(input, "Новая тестовая задача");

    const lowPriority = screen.getByText("Низкий");
    await user.click(lowPriority);

    const submitBtn = screen.getByTestId("add-task-btn");
    await user.click(submitBtn);

    expect(screen.getByText("Новая тестовая задача")).toBeInTheDocument();
  });

  test("Клик по кнопке статуса в карточке должен менять статус задачи на следующий", async () => {
    const user = userEvent.setup();

    const mockTask = {
      id: "task-status-id",
      title: "Задача для проверки статуса",
      priority: Priority.MEDIUM,
      status: Status.TODO,
      progress: 0,
    };

    renderWithProviders(<App />, {
      preloadedState: {
        todoReducer: { todoList: [mockTask], modalVisible: null, taskId: null },
      },
    });

    const statusButton = screen.getByRole("button", { name: Status.TODO });

    await user.click(statusButton);

    expect(
      screen.queryByRole("button", { name: Status.TODO }),
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: Status.PROGRESS }),
    ).toBeInTheDocument();
  });

  test("При сохранении изменений в модалке текст задачи в списке должен обновиться", async () => {
    const user = userEvent.setup();

    const mockTask = {
      id: "task-edit-id",
      title: "Старое название",
      priority: Priority.LOW,
      status: Status.TODO,
      progress: 0,
    };

    renderWithProviders(<App />, {
      preloadedState: {
        todoReducer: {
          todoList: [mockTask],
          modalVisible: "edit",
          taskId: "task-edit-id",
        },
      },
    });

    const input = screen.getByPlaceholderText(
      /Введите текст/i,
    ) as HTMLInputElement;

    await user.clear(input);
    await user.type(input, "Обновленное название");

    const saveBtn = screen.getByRole("button", { name: /Редактировать/i });
    await user.click(saveBtn);

    expect(screen.queryByText("Старое название")).not.toBeInTheDocument();
    expect(screen.getByText("Обновленное название")).toBeInTheDocument();
  });

  test("При подтверждении удаления в модалке задача должна полностью исчезнуть из списка", async () => {
    const user = userEvent.setup();

    const mockTask = {
      id: "task-delete-id",
      title: "Задача, которую мы удалим",
      priority: Priority.HIGH,
      status: Status.TODO,
      progress: 0,
    };

    renderWithProviders(<App />, {
      preloadedState: {
        todoReducer: {
          todoList: [mockTask],
          modalVisible: "delete",
          taskId: "task-delete-id",
        },
      },
    });

    const confirmDeleteBtn = screen.getByRole("button", { name: /удалить/i });
    await user.click(confirmDeleteBtn);

    expect(
      screen.queryByText("Задача, которую мы удалим"),
    ).not.toBeInTheDocument();
  });
});
