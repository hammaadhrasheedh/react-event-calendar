import { render, screen } from "@testing-library/react";
import Calender from "./components/Calender";

test("renders May", () => {
  render(<Calender date={"2022-05-04"} />);
  const Date = screen.getByText(/May/i);
  expect(Date).toBeInTheDocument();
});

test("renders 15th May", () => {
  render(<Calender date={"2022-05-24"} />);
  const Date = screen.getByText(/15/i);
  expect(Date).toBeInTheDocument();
});

// test("renders Events", () => {
//   render(
//     <Calender
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
