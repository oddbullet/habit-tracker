import HeaderBar from "../components/HeaderBar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Card, Spinner, Text, TextField } from "@radix-ui/themes";
import { HexColorPicker } from "react-colorful";
import { reset, createHabit } from "../features/habits/habitSlice";
import "react-day-picker/style.css";

export default function NewHabitPage() {
  const [color, setColor] = useState("#000000");
  const [formData, setFormData] = useState({
    title: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.habit
  );

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (isError) {
      console.log(message);
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

  function onSubmit(e) {
    e.preventDefault();

    const habitData = {
      title: formData.title,
      goal_per_week: 1,
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
              <div>
                <div className="color-block" style={{ backgroundColor: color }}>
                  <Text style={{ color: "white" }}>{color}</Text>
                </div>
                <HexColorPicker color={color} onChange={setColor} />
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
