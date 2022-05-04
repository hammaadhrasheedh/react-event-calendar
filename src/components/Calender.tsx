import moment from "moment";
import * as React from "react";
import BtnIcon from "./BtnIcon";
import { DateType, ICalenderProps, IDayBlockProps, IEvents, Week } from "./Calender.types";

const Calender: React.FunctionComponent<ICalenderProps> = ({
  renderDay = false,
  renderDayContent = false,
  renderEvent = false,
  holidays = [],
  defaultSelected,
  eventType = "Dots",
  events = [],
  prefixID = "HREVC",
  defaultDayFormater = "DD",
  dateFormat = "MMM YYYY",
  date = moment(),
  displayWeek = true,
  prevBtn = false,
  nextBtn = false,
  headerType = "EvenSpread",
  onClickDay = () => {},
}) => {
  const [calendar, setCalender] = React.useState<Array<Week>>([]);
  const [highlighted, setHighlighted] = React.useState<Array<DateType>>([]);
  const [selectedDay, setSelectedDay] = React.useState<DateType>(
    moment(defaultSelected)
  );
  const [startDay, setStartDay] = React.useState<moment.Moment>();
  const [endDay, setEndDay] = React.useState<moment.Moment>();
  const [activeDate, setActiveDate] = React.useState<moment.Moment>(
    moment(date)
  );
  const today = moment();
  const weekDayLength = 1;

  React.useEffect(() => {
    var formatedHolidays = holidays.map((holiday) =>
      moment(holiday).format("YYYY-MM-DD")
    );
    setHighlighted(formatedHolidays);
  }, [holidays]);

  React.useEffect(() => {
    var mDate = moment(date);
    if (activeDate && mDate.isSame(activeDate.clone())) {
      setActiveDate(mDate);
    }
  }, [date]);

  React.useEffect(() => {
    if (!activeDate) {
      return;
    }
    // console.log(activeDate.clone().startOf("month").startOf("week"));
    setStartDay(activeDate.clone().startOf("month").startOf("week"));
    setEndDay(activeDate.clone().endOf("month").endOf("week"));
  }, [activeDate]);

  React.useEffect(() => {
    if (!startDay) {
      return;
    }
    let date = startDay.clone().subtract(1, "day");
    //   console.log(date.isBefore(endDay, "day"))
    var weeks = [];
    while (date.isBefore(endDay, "day")) {
      var week = {
        days: Array(7)
          .fill(0)
          .map(() => date.add(1, "day").clone()),
      };
      //   console.log(week);
      weeks.push(week);
    }
    setCalender([...weeks]);
  }, [startDay, endDay]);

  const formatWeekDay = (weekDay: String) => {
    return weekDay.slice(0, weekDayLength);
  };

  const renderWeekDays = () => {
    var weekDays = moment.weekdays(true);
    // console.log(weekDays);
    return (
      <div className="flex weeks">
        {weekDays.map((weekDay, index) => (
          <div key={index} className="week-day-block">
            {formatWeekDay(weekDay)}
          </div>
        ))}
      </div>
    );
  };

  const renderDefaultEvent = (event: IEvents, index: any) => {
    var { color } = event;
    return (
      <div className="dot" key={index} style={{ backgroundColor: color }}></div>
    );
  };

  const defaultPrevBtn = () => {
    return (
      <div
        className="flex items-center prev-btn"
        onClick={() => {
          setActiveDate(activeDate.clone().subtract(1, "month"));
        }}
      >
        {typeof prevBtn === "function" ? prevBtn() : <BtnIcon />}
      </div>
    );
  };

  const defaultNextBtn = () => {
    return (
      <div
        className="flex items-center next-btn"
        onClick={() => {
          setActiveDate(activeDate.clone().add(1, "month"));
        }}
      >
        {typeof nextBtn === "function" ? (
          nextBtn()
        ) : (
          <BtnIcon className="rotate-180" />
        )}
      </div>
    );
  };

  const renderHeader = () => {
    return headerType === "EvenSpread"
      ? headerEvenSpread()
      : headerActionSeparate();
  };

  const headerActionSeparate = () => {
    return (
      <div className="flex header">
        <div className="current-date">{activeDate.format(dateFormat)}</div>
        <div className="flex">
          {defaultPrevBtn()}
          {defaultNextBtn()}
        </div>
      </div>
    );
  };

  const headerEvenSpread = () => {
    return (
      <div className="flex header">
        {defaultPrevBtn()}
        <div className="current-date">{activeDate.format(dateFormat)}</div>
        {defaultNextBtn()}
      </div>
    );
  };

  const dayBlock = ({
    isToday,
    defaultFormatedDay,
    day,
    isSelectedDay,
    isSameMonth,
    isHoliday,
    events = [],
    index,
  }: IDayBlockProps) => {
    return (
      <div
        key={index}
        id={prefixID + moment(day).format("MM-DD")}
        className={`day-block cursor-pointer\
            ${isToday ? "current-day" : ""}\
            ${isSelectedDay ? "selected-day" : ""}\
            ${!isSameMonth ? "another-month-day" : ""}\
            ${isHoliday ? "holiday" : ""}\
            ${events.length ? "has-events" : ''}
        `}
        style={
          eventType === "Fill" ? { background: events[0]?.color } : undefined
        }
        onClick={() => {
          setSelectedDay(day);
          onClickDay(day);
        }}
      >
        <div className="day">
          {typeof renderDayContent === "function"
            ? renderDayContent({
                isToday,
                defaultFormatedDay,
                day,
                isSelectedDay,
                isSameMonth,
                isHoliday,
                events,
                index,
              })
            : defaultFormatedDay}
          {typeof renderDayContent !== "function" &&
          events.length > 0 &&
          eventType === "Dots" ? (
            <div className="flex events-container">
              {events.map((event, index) =>
                typeof renderEvent === "function"
                  ? renderEvent(event, index)
                  : renderDefaultEvent(event, index)
              )}
            </div>
          ) : null}
        </div>
      </div>
    );
  };

  const dayShellOnly = ({
    isToday,
    defaultFormatedDay,
    day,
    isSelectedDay,
    isSameMonth,
    isHoliday,
    events = [],
    index,
  }: IDayBlockProps) => {
    return (
      <div
        key={index}
        id={prefixID + moment(day).format("MM-DD")}
        onClick={() => {
          setSelectedDay(day);
          onClickDay(day);
        }}
      >
        {typeof renderDay === "function" ?
          renderDay({
            isToday,
            defaultFormatedDay,
            day,
            isSelectedDay,
            isSameMonth,
            isHoliday,
            events,
            index,
          })
          : null
        }
      </div>
    );
  };

  const renderDayBlock = (day: moment.MomentInput, index: any) => {
    var momentDay = moment(day);
    var formatedDay = momentDay.format("YYYY-MM-DD");
    var defaultFormatedDay = momentDay.format(defaultDayFormater);
    var isToday = today.format("YYYY-MM-DD") === formatedDay;
    var isHoliday = highlighted.includes(formatedDay);
    var daysEvents = events.filter(
      (event: IEvents) =>
        moment(event.date).format("YYYY-MM-DD") === formatedDay
    );
    var isSelectedDay = selectedDay
      ? moment(selectedDay).format("YYYY-MM-DD") === formatedDay
      : false;
    var isSameMonth = activeDate.isSame(day, "month");
    var dayParams = {
      isToday,
      defaultFormatedDay,
      day,
      isSelectedDay,
      isSameMonth,
      isHoliday,
      events: daysEvents,
      index,
    };
    return typeof renderDay === "function"
      ? dayShellOnly(dayParams)
      : dayBlock(dayParams);
  };

  return (
    <div className="flex-col calender">
      {true ? renderHeader() : null}
      {displayWeek ? renderWeekDays() : null}
      <div className="flex flex-col dates">
        {calendar.map((item, index) => {
          var { days } = item;
          return (
            <div className="flex week" key={index}>
              {days.map((day, index) => renderDayBlock(day, index))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calender;
