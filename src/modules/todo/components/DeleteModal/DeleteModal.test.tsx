import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, test, expect } from "vitest";
import { renderWithProviders } from "@/utils/test-utils";
import App from "../../../../app/App";
import { Priority, Status } from "../../types/todo.types";

describe("Тесты для модалки удаления задачи", () => {
  const mockTask = {
    id: "123",
    title: "Тест",
    priority: Priority.LOW,
    status: Status.TODO,
    progress: 0,
  };

  test("Клик по иконке корзины должен открывать модалку подтверждения", async () => {
    const user = userEvent.setup();

    renderWithProviders(<App />, {
      preloadedState: {
        todoReducer: { todoList: [mockTask], modalVisible: null, taskId: null },
      },
    });

    const deleteIcon = screen.getByTestId("delete-icon");
    await user.click(deleteIcon!);

    expect(screen.getByTestId("delete-task-modal")).toBeInTheDocument();
  });

  test("Клик по кнопке отмены в модалке удаления должен просто закрывать её", async () => {
    const user = userEvent.setup();

    renderWithProviders(<App />, {
      preloadedState: {
        todoReducer: {
          todoList: [mockTask],
          modalVisible: "delete",
          taskId: "123",
        },
      },
    });

    const cancelBtn = screen.getByRole("button", { name: /Выйти/i });
    await user.click(cancelBtn);

    expect(screen.queryByText(/вы уверены/i)).not.toBeInTheDocument();
    expect(screen.getByText("Тест")).toBeInTheDocument();
  });
});
