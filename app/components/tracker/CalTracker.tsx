/** @format */

import { ReactNode } from "react";
import { dateIntoYear, getDateI } from "~/lib/utils";
import { HobbyDict, HobbyEntryI } from "~/types";

interface CalTrackerI {
  months: string[];
  entries: HobbyEntryI[];
  hobbiesDict: HobbyDict;
  hobby: string;
}

export default function CalTracker({
  months,
  entries,
  hobbiesDict,
  hobby,
}: CalTrackerI) {
  function renderTime(times: string[]): ReactNode[] {
    let timesArray: ReactNode[] = [];
    times.map((time, index) => {
      timesArray.push(<li key={index}>{time}</li>);
    });
    return timesArray;
  }

  const color =
    hobby == "all" || hobby == "star" ? "black" : hobbiesDict[hobby].color;

  function renderSquares(entryDays: number[]) {
    let squares: ReactNode[] = [];

    for (let i = 1; i < 365; i++) {
      squares.push(
        <li
          key={i}
          style={{
            backgroundColor: entryDays.includes(i) ? color : "var(--grey)",
          }}
        ></li>
      );
    }
    return squares;
  }

  const entryDays = entries.map((entry: HobbyEntryI) => {
    const dateI = getDateI(entry.date);
    return dateIntoYear(dateI);
  });

  return (
    <div className="graph ml-6 rounded-lg inline-grid text-sm">
      <ul className="months ml-16 mb-2 grid">{renderTime(months)}</ul>
      <ul className="squares grid grid-flow-col rounded-lg border-2 bg-white border-grey p-4 ml-6">
        {renderSquares(entryDays)}
      </ul>
    </div>
  );
}
