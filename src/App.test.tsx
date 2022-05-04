import { render, screen } from "@testing-library/react";
import Calendar from "./components/Calendar";

test("renders May", () => {
  render(<Calendar date={"2022-05-04"} />);
  const Date = screen.getByText(/May/i);
  expect(Date).toBeInTheDocument();
});

test("renders 15th May", () => {
  render(<Calendar date={"2022-05-24"} />);
  const Date = screen.getByText(/15/i);
  expect(Date).toBeInTheDocument();
});

// test("renders Events", () => {
//   render(
//     <Calendar
//       date={"2022-05-04"}
//       events={[
//         {
//           date: "2022-05-02",
//           color: "red",
//         },
//       ]}
//     />
//   );
//   const Date = screen.getByText(/May/i);
//   expect(Date).toBeInTheDocument();
// });
