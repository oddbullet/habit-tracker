import { Box, Card, IconButton, Text, TextField } from "@radix-ui/themes";
import HeaderBar from "../components/HeaderBar";
import { useNavigate, useParams } from "react-router";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { eachDayOfInterval, format, formatISO } from "date-fns";
import { ArrowLeftIcon, CheckIcon } from "@radix-ui/react-icons";
import {
  deleteHabitCompleteDate,
  updateHabitCompleteDate,
  updateHabitTitle,
} from "../features/habits/habitSlice";
import { useHabitData } from "../hooks/useHabitData";
import useHabitActions from "../hooks/useHabitActions";

export default function EditHabitPage() {
  const { habitId } = useParams();

  const [habitData, setHabitData] = useState({
    title: "",
    start_date: "",
    streak: 0,
    completed_dates: [],
  });
  const [newTitle, setNewTitle] = useState("");
  const [intervalDates, setIntervalDates] = useState([]);

  const { updateCompleteDate, deleteCompleteDate, updateTitle, reset } =
    useHabitActions();

  const navigate = useNavigate();

  const { habits, isDemo } = useHabitData();

  useEffect(() => {
    const habit = habits.find((h) => h._id === habitId);

    if (habit) {
      setHabitData(habit);
      setNewTitle(habit.title);
    }

    return () => {
      reset();
    };
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
      deleteCompleteDate(configData);
    } else {
      updateCompleteDate(configData);
    }
  }

  function saveTitle() {
    const config = {
      title: newTitle,
      id: habitId,
    };

    if (config.title !== "" && config.title !== habitData.title) {
      updateTitle(config);
    }
  }

  function handleBack() {
    isDemo ? navigate("/demo/habit") : navigate("/habit");
  }

  return (
    <div className="editHabit-page">
      <HeaderBar></HeaderBar>
      <div className="editHabit-content">
        <div className="pastDates">
          <div className="edit-btn">
            <IconButton color="gray" highContrast onClick={handleBack}>
              <ArrowLeftIcon width={20} />
            </IconButton>
          </div>
          <Text as="p" size="6" weight="bold">
            Habit Name
          </Text>

          <TextField.Root
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            onBlur={saveTitle}
          ></TextField.Root>

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
