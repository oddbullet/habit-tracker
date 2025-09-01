import HeaderBar from "../components/HeaderBar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Card, Spinner, Text, TextField } from "@radix-ui/themes";
import { reset, createHabit } from "../features/habits/habitSlice";
import "react-day-picker/style.css";
import ToastComponent from "../components/Toast";

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

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.habit
  );

  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState(message);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (isError) {
      console.log(message);
      setOpen(true);
      setErrorMessage(message);
    }

    if (isSuccess && formData.title !== "") {
      navigate("/habit");
    }

    return () => {
      dispatch(reset());
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

  function onSubmit(e) {
    e.preventDefault();

    const habitData = {
      title: formData.title,
      goal_per_week: 1,
      color: colorPick.slice(6, -4),
    };

    dispatch(createHabit(habitData));
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
                  onClick={() => navigate("/habit")}
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
