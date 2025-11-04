import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Signup from "../components/Signup.jsx";

describe("Signup Component", () => {
  test("renders signup form", () => {
    render(<Signup />);
    expect(screen.getByText("Sign Up")).toBeInTheDocument();
  });

  test("allows entering user details", () => {
    render(<Signup />);
    const nameInput = screen.getByPlaceholderText("Enter name");
    const emailInput = screen.getByPlaceholderText("Enter email");

    fireEvent.change(nameInput, { target: { value: "Aradhna" } });
    fireEvent.change(emailInput, { target: { value: "aradhna@example.com" } });

    expect(nameInput.value).toBe("Aradhna");
    expect(emailInput.value).toBe("aradhna@example.com");
  });
});
