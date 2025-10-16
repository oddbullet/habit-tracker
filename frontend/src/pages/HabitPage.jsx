import { Button } from "@radix-ui/themes";
import { PlusIcon } from "@radix-ui/react-icons";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getHabit, reset } from "../features/habits/habitSlice";
import HeaderBar from "../components/HeaderBar";
import FooterBar from "../components/FooterBar";
import Habit from "../components/Habit";
import { Spinner } from "@radix-ui/themes";

export default function HabitPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { habits, isLoading, isError, message } = useSelector(
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

    dispatch(getHabit());

    console.log(habits);

    return () => {
      dispatch(reset());
    };
  }, [user, isError, message, navigate, dispatch]);

  // if (isLoading) {
  //   return (
  //     <div className="auth-page">
  //       <div className="main-content">
  //         <Spinner size="3" />
  //       </div>
  //     </div>
  //   );
  // }

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
                color={habit.color}
                habitId={habit._id}
              ></Habit>
            ))
          ) : (
            <p>No Habit</p>
          )}
        </div>
      </div>
      <FooterBar />
    </div>
  );
}
