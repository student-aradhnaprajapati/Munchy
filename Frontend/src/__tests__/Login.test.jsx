import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Login from "../components/Login.jsx";

describe("Login Component", () => {
  test("renders login form", () => {
    render(<Login />);
    expect(screen.getByText("Login")).toBeInTheDocument();
  });

  test("updates input values", () => {
    render(<Login />);
    const emailInput = screen.getByPlaceholderText("Enter email");
    const passwordInput = screen.getByPlaceholderText("Enter password");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "123456" } });

    expect(emailInput.value).toBe("test@example.com");
    expect(passwordInput.value).toBe("123456");
  });
});
