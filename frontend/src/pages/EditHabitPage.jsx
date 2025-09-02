import { Box, Card, IconButton, Text } from "@radix-ui/themes";
import HeaderBar from "../components/HeaderBar";
import { useNavigate, useParams } from "react-router";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { eachDayOfInterval, format, formatISO } from "date-fns";
import { CheckIcon } from "@radix-ui/react-icons";
import {
  deleteHabitCompleteDate,
  updateHabitCompleteDate,
} from "../features/habits/habitSlice";

export default function EditHabitPage() {
  const { habitId } = useParams();
  const [habitData, setHabitData] = useState({
    title: "",
    start_date: "",
    streak: 0,
    completed_dates: [],
  });
  const [intervalDates, setIntervalDates] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { habits } = useSelector((state) => state.habit);

  useEffect(() => {
    const habit = habits.find((h) => h._id === habitId);

    if (habit) {
      setHabitData(habit);
    }
  }, [habits]);

  useEffect(() => {
    const [year, month, day] = habitData.start_date.split("-");
    const dates = eachDayOfInterval({
      start: new Date(),
      end: new Date(year, month - 1, day),
    }).map((date) => format(date, "MMM d, yyyy"));

    setIntervalDates(dates);
  }, [habitData]);

  function handleClick(date) {
    const fd = formatISO(date, { representation: "date" });

    const configData = {
      date: fd,
      id: habitId,
    };

    if (habitData.completed_dates.includes(fd)) {
      dispatch(deleteHabitCompleteDate(configData));
    } else {
      dispatch(updateHabitCompleteDate(configData));
    }
  }

  return (
    <div className="editHabit-page">
      <HeaderBar></HeaderBar>
      <div className="editHabit-content">
        <div className="pastDates">
          <Text as="p" size="6" weight="bold">
            Past Dates
          </Text>
          <div className="past-date-cards">
            {intervalDates.map((date, index) => (
              <Box key={index} maxWidth="300px">
                <Card className="past-date-card">
                  <Text size={4} weight={"medium"}>
                    {date}
                  </Text>
                  <IconButton
                    color={habitData.color}
                    variant={
                      habitData.completed_dates.includes(
                        formatISO(date, { representation: "date" })
                      )
                        ? "solid"
                        : "outline"
                    }
                    radius="full"
                    onClick={() => handleClick(date)}
                  >
                    <CheckIcon width={"20px"} />
                  </IconButton>
                </Card>
              </Box>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
