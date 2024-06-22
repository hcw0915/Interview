import { useEffect, useState } from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import { getDaysInMonthWithSurrounding } from "./utils";

const DatePickerContainer = styled.div`
  width: 21.875rem;
  min-height: 15rem;
  display: flex;
  flex-direction: column;
  background-color: white;
`;

const DateHeader = styled.div`
  width: 100%;
  height: 2.75rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: black;
  margin-bottom: 1rem;
`;

const MonthController = styled.span`
  width: 2.75rem;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover {
    background-color: #e6e6e6;
  }
`;

const MonthControllerPrevious = styled(MonthController)``;
const MonthControllerNext = styled(MonthController)``;

const MonthControllerTitle = styled.span`
  display: flex;
  flex: 1;
  justify-content: center;
`;

const DateMainSection = styled.div`
  display: grid;
  height: auto;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(5, 1fr);
`;

const DateUnit = styled.div<{
  $isCurrentMonth: boolean;
  $isToday: boolean;
  $isStartAt: boolean;
  $isEndAt: boolean;
  $isRange: boolean;
}>`
  width: 3.125rem;
  height: 2.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(p) => {
    if (p.$isStartAt || p.$isEndAt || p.$isRange) return "#fff";
    if (!p.$isCurrentMonth) return "#757575";
    return "#000";
  }};
  //! Task-1 (B-1)
  cursor: ${(p) => (!p.$isCurrentMonth ? "not-allowed" : "pointer")};
  background-color: ${(p) => {
    if (p.$isStartAt || p.$isEndAt || p.$isRange) return "#006edc";
    if (p.$isToday) return "#ffff76";
  }};

  &:hover {
    background-color: ${(p) => {
      if (p.$isToday || p.$isStartAt || p.$isEndAt || p.$isRange) return;
      return p.$isCurrentMonth ? "#e6e6e6" : "";
    }};
  }
`;

type DatePickerDataProp = {
  dateList: any[];
  startAt: string;
  endAt: string;
  currentYear: number;
  currentMonth: number;
};

const TODAY = dayjs().format("YYYY-MM-DD");
const YEAR = dayjs().format("YYYY");
const MONTH = dayjs().format("MM");

function App() {
  const [dateInfo, setDateInfo] = useState<DatePickerDataProp>({
    dateList: [],
    startAt: "",
    endAt: "",
    currentYear: +YEAR,
    currentMonth: +MONTH,
  });

  const onClickPreviousMonth = () => {
    setDateInfo((prev) => ({
      ...prev,
      /* prettier-ignore */
      currentYear: prev.currentMonth === 1 ? prev.currentYear - 1 : prev.currentYear,
      currentMonth: prev.currentMonth === 1 ? 12 : prev.currentMonth - 1,
    }));
  };

  const onClickNextMonth = () => {
    setDateInfo((prev) => ({
      ...prev,
      /* prettier-ignore */
      currentYear: prev.currentMonth === 12 ? prev.currentYear + 1 : prev.currentYear,
      currentMonth: prev.currentMonth === 12 ? 1 : prev.currentMonth + 1,
    }));
  };

  const onSelectDateRange = (idx: number) => () => {
    const newDate = dateInfo.dateList[idx].date;
    const startIdx = dateInfo.dateList.findIndex(
      (item) => item.date === dateInfo.startAt
    );

    if (idx < startIdx) {
      setDateInfo((prev) => ({
        ...prev,
        startAt: newDate,
        endAt: "",
      }));
      return;
    }

    if (!dateInfo.startAt && !dateInfo.endAt) {
      setDateInfo((prev) => ({
        ...prev,
        startAt: newDate,
      }));
    }

    if (dateInfo.startAt && !dateInfo.endAt) {
      const isEndBeforeStart = dayjs(newDate).isBefore(dayjs(dateInfo.startAt));

      setDateInfo((prev) => ({
        ...prev,
        startAt: isEndBeforeStart ? newDate : prev.startAt,
        endAt: isEndBeforeStart ? prev.endAt : newDate,
      }));
    }

    if (dateInfo.startAt && dateInfo.endAt) {
      setDateInfo((prev) => ({
        ...prev,
        startAt: newDate,
        endAt: "",
      }));
    }
  };

  console.log(dateInfo.startAt);
  useEffect(() => {
    const dateList = getDaysInMonthWithSurrounding({
      year: dateInfo.currentYear,
      month: dateInfo.currentMonth,
    });
    setDateInfo((prev) => ({ ...prev, dateList }));
  }, [dateInfo.currentYear, dateInfo.currentMonth]);

  return (
    <DatePickerContainer>
      <DateHeader>
        <MonthControllerPrevious onClick={onClickPreviousMonth}>
          &lt;
        </MonthControllerPrevious>
        <MonthControllerTitle>
          {dateInfo.currentYear}年{dateInfo.currentMonth}月
        </MonthControllerTitle>
        <MonthControllerNext onClick={onClickNextMonth}>
          &gt;
        </MonthControllerNext>
      </DateHeader>

      <DateMainSection>
        {dateInfo.dateList.map(({ date }, idx, arr) => {
          const [_, month, day] = date.split("-");
          const isToday = date === TODAY;
          const isCurrentMonth = +month === dateInfo.currentMonth;

          /* prettier-ignore */
          const startIdx = arr.findIndex((item) => item.date === dateInfo.startAt);
          const endIdx = arr.findIndex((item) => item.date === dateInfo.endAt);

          console.log({ startIdx, idx, endIdx });
          /* prettier-ignore */
          const isDateCrossMonth = startIdx <= idx && endIdx === -1 && !!dateInfo.endAt && (startIdx !== -1 || endIdx !== -1);
          /* prettier-ignore */ /** 判斷是否在區間, -1 是為了判斷跨頁 datelist 更新了 */
          const isDateInRange = startIdx <= idx && endIdx >= idx && (startIdx !== -1 || endIdx !== -1);

          return (
            <DateUnit
              key={date}
              $isToday={isToday}
              $isCurrentMonth={isCurrentMonth}
              $isStartAt={date === dateInfo.startAt}
              $isEndAt={date === dateInfo.endAt}
              $isRange={isCurrentMonth && (isDateInRange || isDateCrossMonth)}
              onClick={isCurrentMonth ? onSelectDateRange(idx) : undefined}
            >
              {+day}日
            </DateUnit>
          );
        })}
      </DateMainSection>
    </DatePickerContainer>
  );
}

export default App;
