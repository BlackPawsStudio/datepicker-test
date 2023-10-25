import { useState } from "react";
import { DatePicker } from "../../shared";

export const Sundays = () => {
  const [startDate, setStartDate] = useState<Date>(
    new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate()
    )
  );
  const [endDate, setEndDate] = useState<Date>(
    new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate()
    )
  );

  const countSundays = () => {
    let newStartDate = new Date(startDate);
    while (newStartDate.getDay() < 6) {
      newStartDate.setDate(newStartDate.getDate() + 1);
    }
    newStartDate.setDate(newStartDate.getDate() + 1);
    let sundayCount = newStartDate.getDate() < 28 ? 1 : 0;
    while (newStartDate < endDate) {
      newStartDate.setDate(newStartDate.getDate() + 7);
      if (newStartDate.getDate() < 28) {
        sundayCount++;
      }
    }
    // return sundayCount;
    return `${sundayCount} sundays than have date lower that 28 in this time limit`;
  };

  const output =
    endDate.getFullYear() - startDate.getFullYear() < 2 ||
    endDate.getMonth() < startDate.getMonth() ||
    endDate.getDate() < startDate.getDate() ? (
      <label className="text-red-500">
        Dates must be at least two years apart!
      </label>
    ) : startDate <= new Date() ? (
      <label className="text-red-500">Start date must be in the future!</label>
    ) : startDate.getDay() === 6 ? (
      <label className="text-red-500">Start date can't be a Sunday!</label>
    ) : (
      <label>{countSundays()}</label>
    );
  return (
    <div>
      <DatePicker
        onChange={(firstDate, secondDate) => {
          setStartDate(firstDate);
          setEndDate(secondDate);
        }}
      />
      <div className="flex flex-col gap-2 mt-4">{output}</div>
    </div>
  );
};
