import moment from "moment";
import React from "react";
import "./App.css";
import Calender from "./components/Calender";

function App() {
  return (
    <Calender
      // eventType="Fill"
      date={'2022-05-09'}
      events={[
        {
          date: "2022-05-02",
          color: "red",
        },
        {
          date: "2022-05-02",
          color: "pink",
        },
        {
          date: "2022-05-02",
          color: "#c3c3c3",
        },
      ]}
    />
  );
}

export default App;
