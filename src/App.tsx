import "./themes/Default.css";
import Calendar from "./components/Calendar";

function App() {

  const eventsStyles =  `.events-container{
    top:0;
    right:0;
  }
  .has-events .day{
    color:white
  }
  `

  const renderEvent = (event:any, index:any) => {
    return (
      <div key={index} style={{backgroundImage: event.extraData.gradient, width:'100%', height:'100%', zIndex:-1}}>
      </div>
    )

  }
  return (
    <div>
      <style> {eventsStyles} </style>
      <Calendar
        date={"2022-05-09"}
        renderEvent={renderEvent}
        events={[
          {
            date: "2022-05-21",
            color: "#c3c3c3",
            extraData:{gradient:'linear-gradient(to top, #f77062 0%, #fe5196 100%)'}
          },
        ]}
      />
    </div>
  );
}

export default App;
