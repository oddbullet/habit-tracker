import { CalendarIcon } from "@radix-ui/react-icons";
import { TextField } from "@radix-ui/themes";
import { useEffect, useRef, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

export default function DatePickerInput() {
  const [displayCal, setDisplayCal] = useState(false);
  const [selected, setSelected] = useState("");

  return (
    <div
      className="date-picker-input"
      onFocus={(e) => setDisplayCal(true)}
      onBlur={() => setDisplayCal(false)}
    >
      <TextField.Root placeholder="MM/DD/YYYY" value={selected} readOnly>
        <TextField.Slot>
          <CalendarIcon width={16} height={16} />
        </TextField.Slot>
      </TextField.Root>
      {displayCal ? (
        <DayPicker
          animate
          mode="single"
          selected={selected}
          onSelect={setSelected}
        />
      ) : (
        ""
      )}
    </div>
  );
}
