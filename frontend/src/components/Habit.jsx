import { Box, Button, Card, IconButton, Text } from "@radix-ui/themes";
import { CheckIcon } from "@radix-ui/react-icons";
import {
  differenceInCalendarDays,
  endOfWeek,
  formatISO,
  getDay,
  isThisWeek,
  isWithinInterval,
  startOfWeek,
} from "date-fns";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteHabitCompleteDate,
  updateHabitCompleteDate,
} from "../features/habits/habitSlice";

export default function Habit({ title, color, habitId }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { habits } = useSelector((state) => state.habit);

  const [clickState, setClickState] = useState("outline");
  const [currentStreak, setCurrentStreak] = useState(0);
  const [fillFire, setFillFire] = useState("none");
  const [weekComplete, setWeekComplete] = useState([0, 0, 0, 0, 0, 0, 0]);

  function handleClick(e) {
    e.preventDefault();

    const today = formatISO(new Date(), { representation: "date" });
    const habitData = { date: today, id: habitId };

    if (clickState === "outline") {
      dispatch(updateHabitCompleteDate(habitData));
    } else {
      setFillFire("none");
      setClickState("outline");
      dispatch(deleteHabitCompleteDate(habitData));
    }
  }

  useEffect(() => {
    const habitData = habits.find((habit) => habit._id === habitId);

    if (
      habitData &&
      habitData.completed_dates[habitData.completed_dates.length - 1] ===
        formatISO(new Date(), { representation: "date" })
    ) {
      setFillFire("currentColor");
      setClickState("solid");
    }

    // Calculate current Streak
    if (habitData.title === "" || habitData.completed_dates.length === 0)
      return;

    const today = formatISO(new Date(), { representation: "date" });
    const size = habitData.completed_dates.length;

    if (
      differenceInCalendarDays(today, habitData.completed_dates[size - 1]) > 1
    ) {
      setCurrentStreak(0);
    } else {
      let counter = 1;

      for (let i = size - 2; i >= 0; i--) {
        const prevDate = habitData.completed_dates[i + 1];
        const currDate = habitData.completed_dates[i];

        if (differenceInCalendarDays(prevDate, currDate) === 1) {
          counter += 1;
        } else {
          break;
        }
      }
      setCurrentStreak(counter);
    }
  }, [habits]);

  useEffect(() => {
    const week = [0, 0, 0, 0, 0, 0, 0];
    const habitData = habits.find((habit) => habit._id === habitId);
    console.log(habitData);

    if (habitData.completed_dates.length === 0) {
      return;
    }

    const today = new Date();
    const sunday = startOfWeek(today);
    const saturday = endOfWeek(today);

    for (let i = habitData.completed_dates.length - 1; i > -1; i--) {
      const [year, month, day] = habitData.completed_dates[i]
        .split("-")
        .map(Number);

      const date = new Date(year, month - 1, day);

      if (!isWithinInterval(date, { start: sunday, end: saturday })) {
        setWeekComplete(week);
        return;
      }

      week[getDay(date)] = 1;
    }

    setWeekComplete(week);
  }, [habits]);

  return (
    <Box>
      <Card
        style={{ cursor: "pointer" }}
        onDoubleClick={() => navigate(`/stat/${habitId}`)}
      >
        <div className="habit">
          <div className="habit-title">
            <div className="habit-card-streak">
              <Text as="p" weight={"medium"} size="4">
                {currentStreak}
              </Text>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 2 24 24"
                color={color}
                fill={fillFire}
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-flame-icon lucide-flame"
              >
                <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
              </svg>
            </div>
            <Text as="p" weight="medium" size="4">
              {title}
            </Text>

            <div className="habit-week-group">
              {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
                <div
                  key={index}
                  className="week-square"
                  style={{
                    backgroundColor: weekComplete[index] === 1 ? color : "none",
                  }}
                >
                  <strong>{day}</strong>
                </div>
              ))}
            </div>
          </div>
          <div className="habit-btn-group">
            <IconButton
              variant={clickState}
              color={color}
              radius="full"
              onClick={handleClick}
            >
              <CheckIcon width={"20px"} height={"20px"} />
            </IconButton>
          </div>
        </div>
      </Card>
    </Box>
  );
}
