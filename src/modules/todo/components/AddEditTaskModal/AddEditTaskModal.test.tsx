import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, test, expect } from "vitest";
import { renderWithProviders } from "@/utils/test-utils";
import App from "../../../../app/App";

describe("Тесты для модалки добавления задачи", () => {
  test("Клик по кнопке 'Добавить задачу' должен открывать модальное окно", async () => {
    const user = userEvent.setup();
    renderWithProviders(<App />);

    const openBtn = screen.getByRole("button", { name: /Добавить задачу/i });
    await user.click(openBtn);

    expect(screen.getByTestId("add-edit-task-modal")).toBeInTheDocument();
  });

  test("Клик по крестику должен закрывать модальное окно", async () => {
    const user = userEvent.setup();

    renderWithProviders(<App />, {
      preloadedState: {
        todoReducer: { todoList: [], modalVisible: "add", taskId: null },
      },
    });

    expect(screen.getByTestId("add-edit-task-modal")).toBeInTheDocument();

    const closeIcon = screen.getByTestId("close-icon");
    await user.click(closeIcon);

    expect(screen.queryByTestId("add-edit-task-modal")).not.toBeInTheDocument();
  });

  test("Текст в инпуте должен корректно меняться при вводе", async () => {
    const user = userEvent.setup();

    renderWithProviders(<App />, {
      preloadedState: {
        todoReducer: { todoList: [], modalVisible: "add", taskId: null },
      },
    });

    const input = screen.getByPlaceholderText(
      /введите текст/i,
    ) as HTMLInputElement;
    await user.type(input, "Купить хлеб");

    expect(input.value).toBe("Купить хлеб");
  });
});
