/** @format */

import { ReactNode } from "react";
import { HobbyEntryI } from "~/types";
import { dateIntoYear } from "~/lib/utils";

interface CalTrackerI {
  months: string[];
  days: string[];
  entries: HobbyEntryI[];
  hobby: string;
}

export default function CalTracker({
  months,
  days,
  entries,
  hobby,
}: CalTrackerI) {
  function renderTime(times: string[]): ReactNode[] {
    let timesArray: ReactNode[] = [];
    times.map((time, index) => {
      timesArray.push(<li key={index}>{time}</li>);
    });
    return timesArray;
  }

  function renderSquares(entryDays: number[]) {
    let squares: ReactNode[] = [];

    for (let i = 1; i < 365; i++) {
      // TO DO: make this more efficient

      const entryDay = entryDays.includes(i + 1) ? hobby : "";

      squares.push(<li key={i} className={entryDay}></li>);
    }
    return squares;
  }

  const entryDays = entries.map((entry) => dateIntoYear(entry.date));

  return (
    <div className="graph ml-6 rounded-lg inline-grid text-sm">
      <ul className="months lowercase ml-20 mb-2 grid">{renderTime(months)}</ul>
      <ul className="days text-center grid uppercase p-4 -mr-6">
        {renderTime(days)}
      </ul>
      <ul className="squares grid grid-flow-col rounded-lg border-2 border-grey p-4 ml-6">
        {renderSquares(entryDays)}
      </ul>
    </div>
  );
}
