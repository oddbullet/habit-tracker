import { Button } from "@radix-ui/themes";
import { PlusIcon } from "@radix-ui/react-icons";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getHabit, reset } from "../features/habits/habitSlice";
import HeaderBar from "../components/HeaderBar";
import Habit from "../components/Habit";
import { Spinner } from "@radix-ui/themes";

const Week = Object.freeze({
  SUNDAY: 0,
  MONDAY: 1,
  TUESDAY: 2,
  WEDNESDAY: 3,
  THURSDAY: 4,
  FRIDAY: 5,
  SATURDAY: 6,
});

export default function HabitPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { habits, isLoading, isError, message } = useSelector(
    (state) => state.habit
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate("/login");
    }

    dispatch(getHabit());

    return () => {
      dispatch(reset());
    };
  }, [user, isError, message, navigate, dispatch]);

  if (isLoading) {
    return (
      <div className="auth-page">
        <div className="main-content">
          <Spinner size="3" />
        </div>
      </div>
    );
  }

  return (
    <div className="habit-page">
      <HeaderBar />
      <div className="habit-content">
        <div className="habit-new-btn">
          <Button
            color="gray"
            variant="solid"
            highContrast
            className="btn"
            onClick={() => navigate("/new")}
          >
            <PlusIcon /> New Habit
          </Button>
        </div>

        <div className="habit-card-group">
          {habits.length > 0 ? (
            habits.map((habit) => (
              <Habit
                key={habit._id}
                title={habit.title}
                habitId={habit._id}
              ></Habit>
            ))
          ) : (
            <p>No Habit</p>
          )}
        </div>
      </div>
    </div>
  );
}
