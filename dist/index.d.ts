import * as React from 'react';

declare type DateType = moment.MomentInput;
declare type EventType = "Dots" | "Fill";
interface IEvents {
    date: DateType;
    color: string;
    extraData?: any;
}
interface ICalendarProps {
    renderDay?: Function | Boolean;
    renderDayContent?: Function | Boolean;
    renderEvent?: Function | Boolean;
    defaultSelected?: moment.MomentInput;
    holidays?: Array<DateType>;
    events?: Array<IEvents>;
    eventType?: EventType;
    prefixID?: string;
    defaultDayFormater?: string;
    date?: DateType;
    displayWeek?: Boolean;
    dateFormat?: string;
    prevBtn?: Function | Boolean;
    nextBtn?: Function | Boolean;
    headerType?: "EvenSpread" | "ActionSeparate";
    onClickDay?: Function;
}

declare const Calendar: React.FunctionComponent<ICalendarProps>;

export { Calendar };
