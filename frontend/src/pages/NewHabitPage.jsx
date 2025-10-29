import HeaderBar from "../components/HeaderBar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Card, Spinner, Text, TextField } from "@radix-ui/themes";
import ToastComponent from "../components/Toast";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { compareAsc, format } from "date-fns";
import useHabitActions from "../hooks/useHabitActions";
import { useHabitData } from "../hooks/useHabitData";

export default function NewHabitPage() {
  const [colorPick, setColorPick] = useState("");

  const colors = [
    "var(--orange-10)",
    "var(--red-10)",
    "var(--indigo-10)",
    "var(--blue-10)",
    "var(--pink-10)",
  ];

  const [formData, setFormData] = useState({
    title: "",
  });

  const [selectedDate, setSelectedDate] = useState(new Date());

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { createHabit, reset } = useHabitActions();

  const { isDemo, isLoading, isError, isSuccess, message } = useHabitData();

  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState(message);

  useEffect(() => {
    if (isError) {
      console.log(message);
      setOpen(true);
      setErrorMessage(message);
    }

    if (isSuccess && formData.title !== "") {
      if (isDemo) {
        navigate("/demo/habit");
      } else {
        navigate("/habit");
      }
    }

    return () => {
      reset();
    };
  }, [isError, isSuccess, message, navigate, dispatch]);

  function handleChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  function handleClick(color) {
    setColorPick(color);
  }

  function handleCancel() {
    if (isDemo) {
      navigate("/demo/habit");
    } else {
      navigate("/habit");
    }
  }

  function onSubmit(e) {
    e.preventDefault();

    if (compareAsc(selectedDate, new Date()) === 1) {
      setOpen(true);
      setErrorMessage("Select a current or past date.");
      return;
    }

    const habitData = {
      title: formData.title,
      start_date: format(new Date(selectedDate), "yyyy-MM-dd"),
      completed_dates: [],
      streak: 0,
      goal_per_week: 1,
      color: colorPick.slice(6, -4),
    };

    createHabit(habitData);
  }

  if (isLoading) {
    return (
      <div className="new-habit-page">
        <div className="main-content">
          <Spinner size="3" />
        </div>
      </div>
    );
  }

  return (
    <div className="new-habit-page">
      <ToastComponent
        open={open}
        setOpen={setOpen}
        title={"New Habit Error"}
        description={errorMessage}
      ></ToastComponent>
      <HeaderBar />
      <div className="main-content">
        <Box>
          <Card className="new-habit-card">
            <form className="new-habit-form" onSubmit={onSubmit}>
              <Text as="p" weight="medium" size="3">
                Habit Name
              </Text>
              <TextField.Root
                placeholder="e.g., Drink some water"
                name="title"
                onChange={handleChange}
              ></TextField.Root>
              <DayPicker
                animate
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
              />
              <Text as="p" weight="medium" size="3">
                Habit Color
              </Text>

              <div className="color-pick-group">
                {colors.map((color) => (
                  <button
                    key={color}
                    className={`circle ${
                      colorPick === color ? "selected" : ""
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => handleClick(color)}
                    type="button"
                  ></button>
                ))}
              </div>

              <div className="new-habit-btn">
                <Button
                  color="gray"
                  variant="outline"
                  highContrast
                  type="reset"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
                <Button color="gray" variant="solid" highContrast type="submit">
                  Submit
                </Button>
              </div>
            </form>
          </Card>
        </Box>
      </div>
    </div>
  );
}
