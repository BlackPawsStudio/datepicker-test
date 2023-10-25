import clsx from "clsx";
import { ArrowButton } from "../../ArrowButton";

interface DisplayMonthProps {
  date: Date;
  secondDate: Date;
  setDate: (date: Date) => void;
  title?: string;
  isFirst?: boolean;
}

export const DisplayMonth = ({
  date,
  setDate,
  title,
  isFirst,
  secondDate,
}: DisplayMonthProps) => {
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  const amountOfDays = new Date(year, month + 1, 0).getDate();

  const dayGap = new Date(year, month, 1).getDay();

  const setYear = (newYear: number) => {
    setDate(new Date(newYear, month, day));
  };

  const setDay = (newDay: number) => {
    const newDate = new Date(year, month, newDay);
    if (isFirst ? newDate <= secondDate : newDate >= secondDate) {
      setDate(new Date(year, month, newDay + 1));
    }
  };

  const setMonth = (newMonth: number) => {
    const newDate = new Date(year, newMonth, day);
    if (isFirst ? newDate <= secondDate : newDate >= secondDate)
      setDate(newDate);
  };

  return (
    <div className="rounded-lg bg-gray-500 p-5 flex flex-col gap-3">
      {title && <div>{title}</div>}
      <div className="flex justify-between items-center">
        <ArrowButton onClick={() => setMonth(month - 1)} />
        <div>
          {new Date(year, month, day).toLocaleString("default", {
            month: "long",
          })}
        </div>
        <select
          onChange={(e) => {
            setYear(+e.target.value);
          }}
          value={year}
        >
          {new Array(100).fill(null).map((_, index) => (
            <option key={index} value={2100 - index}>
              {2100 - index}
            </option>
          ))}
        </select>
        <ArrowButton
          onClick={() => setMonth(month + 1)}
          className="!rotate-[135deg]"
        />
      </div>
      <div>
        <div className="grid grid-cols-7 grid-rows-1 w-56 gap-x-1">
          <label>Sn</label>
          <label>Mn</label>
          <label>Tu</label>
          <label>Wd</label>
          <label>Th</label>
          <label>Fr</label>
          <label>St</label>
        </div>
        <div className="grid grid-cols-7 grid-rows-6 w-56 text-black gap-1">
          {new Array(dayGap).fill(null).map((_, index) => (
            <div
              className={
                "cursor-pointer select-none hover:bg-gray-400 active:bg-gray-500"
              }
              key={index}
            ></div>
          ))}
          {new Array(amountOfDays).fill(null).map((_, index) => (
            <div
              className={clsx(
                "cursor-pointer select-none hover:brightness-110 active:brightness-90",
                day === index + 1 ? "bg-blue-400" : "",
                secondDate.getDate() === index + 1 &&
                  secondDate.getMonth() === month &&
                  secondDate.getFullYear() === year
                  ? "!bg-blue-400"
                  : "",
                isFirst
                  ? //  first datepicker
                    month === secondDate.getMonth() &&
                    year === secondDate.getFullYear()
                    ? index + 1 < secondDate.getDate() && index + 1 >= day
                      ? "bg-blue-300"
                      : "bg-gray-300"
                    : index + 1 >= day
                    ? "bg-blue-300"
                    : "bg-gray-300"
                  : //  second datepicker
                  month === secondDate.getMonth() &&
                    year === secondDate.getFullYear()
                  ? index + 1 > secondDate.getDate() && index + 1 <= day
                    ? "bg-blue-300"
                    : "bg-gray-300"
                  : index + 1 <= day
                  ? "bg-blue-300"
                  : "bg-gray-300"
              )}
              onClick={() => setDay(index)}
              key={index}
            >
              {index + 1}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
