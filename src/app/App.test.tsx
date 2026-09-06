import App from "./App.tsx";
import { screen } from "@testing-library/react";
import { describe, test, expect, beforeEach } from "vitest";
import { renderWithProviders } from "@/utils/test-utils";

beforeEach(() => {
  renderWithProviders(<App />);
});

describe("App компонент", function () {
  test("App должен корректно рендериться", () => {
    expect(screen.getByText(/Список задач/i)).toBeInTheDocument();
  });
});
