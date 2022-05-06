
# React Event Calendar

A small & customizable react calendar component to show your daily events for a given month.

## Features

- Dotted and filled days for events
- Customize day rendering
- Customize event rendering
- Show Holidays
- Click a day to get the data to showcase on another component

## Features
[Demo](https://codesandbox.io/s/sample-for-hammaadhrasheedh-react-event-calendar-eg6fv6)

## Installation

Install react-event-calendar with npm

```bash
  npm install @hammaadhrasheedh/react-event-calendar
```

### Styles

Get styles for the calendar

```javascript
  import '@hammaadhrasheedh/react-event-calendar/dist/themes/default.css'
```
Other out of the box styling options

```javascript
  import '@hammaadhrasheedh/react-event-calendar/dist/themes/circular.css'
  import '@hammaadhrasheedh/react-event-calendar/dist/themes/clean.css'
  import '@hammaadhrasheedh/react-event-calendar/dist/themes/neumorphic.css'
  import '@hammaadhrasheedh/react-event-calendar/dist/themes/dark.css'
```

## Simple Example

```javascript
import { Calendar } from '@hammaadhrasheedh/react-event-calendar'

var events = [
    {
        date: "2022-05-02",
        color: "red",
    },
    {
        date: new Date('2022-05-23'),
        color: "pink",
    },
    {
        date: "2022-05-02",
        color: "#c3c3c3",
    },
];

<Calendar
    eventType="Fill"
    date={'2022-05-09'}
    events={events}
/>
```


## Props


| Prop | Type  | Description | Example |
| :-------- | :------- | :------- | :------------------------- |
| `defaultSelected` | `Moment\|Date\|string` | Selects a day by deafult when calendar renders | `'2022-12-22'` |
| `holidays` | `Array<Moment\|Date\|string>` | Highlight holidays in unified style | `['2022-12-22', new Date(), moment()]`|
| `events` | `Array<Object>` | Events to mark on the calendar | `[{date: "2022-05-02", color: "red", extraData:any}]` |
| `eventType` | `'Dots' \| 'Fill'` | Determines how the events will be dispalyed in calendar. *Default: 'Dots'*| |
| `prefixID` | `string` | Prefixes to the unique id to each date block | |
| `defaultDayFormater` | `string` | Format how days are displayed in calednder. *Default: 'DD'* | [moment docs](https://momentjs.com/docs/#/displaying/) |
| `date` | `Moment\|Date\|string` | Determines which month to be shown in calendar, *Default: today* | `'2022-12-22' \| new Date() \| moment()` |
| `displayWeek` | `Boolean` | Show or hide week section of calendar | |
| `dateFormat` | `string` | Format how calendar date is displayed in header of calednder. *Default: 'MMM YYYY'* | [moment docs](https://momentjs.com/docs/#/displaying/) |
| `headerType` | `'EvenSpread' \| 'ActionSeparate'` | Formats the layout of the header ( date and action buttons) | |




## Methods


| Prop | Params  | Description | Example |
| :-------- | :------- | :------- | :------------------------- |
| `renderDay` | `{isToday, defaultFormatedDay, day, isSelectedDay, isSameMonth, isHoliday, events, index}` | Function to customize the render of the full day block | [Render Day](#render-day) |
| `renderDayContent` | `{isToday, defaultFormatedDay, day, isSelectedDay, isSameMonth, isHoliday, events, index}` | Function to customize the content the day | |
| `renderEvent` | `event, index` | Function to customize the UI of the events | |
| `prevBtn` | | Function to customize the icon/content of previous button | |
| `nextBtn` | | Function to customize the icon/content of next button | |
| `onClickDay` | `day` | Calls the function when a day is clicked | |


## Examples
#### Render Day
```javascript 
const renderDay = ({
    isToday,
    defaultFormatedDay,
    day,
    isSelectedDay,
    isSameMonth,
    isHoliday,
    events,
    index,
  }) => {

    //   hide days from other months
    if(!isSameMonth){
      return null
    }

    return (
      <div>
        <div
          className={`day-block cursor-pointer\
           ${isToday ? "current-day" : ""}\
           ${isSelectedDay ? "selected-day" : ""}\
           ${!isSameMonth ? "another-month-day" : ""}\
           ${isHoliday ? "holiday" : ""} 
       `}
        >
          {defaultFormatedDay}
        </div>
      </div>
    );
  };
```

#### Render Event
```javascript 

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
      <div style={{backgroundImage: event.extraData.gradient, width:'100%', height:'100%', zIndex:-1}}>
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
```

