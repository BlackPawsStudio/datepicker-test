import { useEffect, useState } from "react";
import { DisplayMonth } from "./subcomponents/DisplayMonth";

interface DatePickerProps {
  defaultValue?: {
    firstDate: Date;
    secondDate: Date;
  };
  onChange?: (firstDate: Date, secondDate: Date) => void;
}

export const DatePicker = ({ defaultValue, onChange }: DatePickerProps) => {
  const [firstDate, setFirstDate] = useState<Date>(
    defaultValue?.firstDate ||
      new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate()
      )
  );
  const [secondDate, setSecondDate] = useState<Date>(
    defaultValue?.secondDate ||
      new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate()
      )
  );

  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    onChange && onChange(firstDate, secondDate);
  }, [firstDate, secondDate]);

  return (
    <div className={"relative"}>
      <div
        onClick={() => setOpen(!open)}
        className="grid grid-cols-2 grid-rows-2 gap-x-5 bg-gray-200 rounded-xl p-5 text-black hover:scale-110 active:scale-90 cursor-pointer"
      >
        <div>From date</div>
        <div>To date</div>
        <div>
          {firstDate.toLocaleString("en-US", {
            year: "2-digit",
            day: "2-digit",
            month: "short",
            weekday: "short",
          })}
        </div>
        <div>
          {secondDate.toLocaleString("en-US", {
            year: "2-digit",
            day: "2-digit",
            month: "short",
            weekday: "short",
          })}
        </div>
      </div>
      {open && (
        <div
          className="flex gap-3 absolute top-full left-1/2 -translate-x-1/2"
          onBlur={() => setOpen(false)}
        >
          <DisplayMonth
            date={firstDate}
            setDate={setFirstDate}
            title="Set beginning date"
            isFirst
            secondDate={secondDate}
          />
          <DisplayMonth
            date={secondDate}
            setDate={setSecondDate}
            title="Set ending date"
            secondDate={firstDate}
          />
        </div>
      )}
    </div>
  );
};
