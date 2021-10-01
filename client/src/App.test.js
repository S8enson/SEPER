import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText("Software Engineering Practice Evidence Repository (SEPER)");
  expect(linkElement).toBeInTheDocument();
});
