import { Box, Button, Card, IconButton, Text } from "@radix-ui/themes";
import { CheckIcon } from "@radix-ui/react-icons";
import { formatISO } from "date-fns";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteHabitCompleteDate,
  updateHabitCompleteDate,
} from "../features/habits/habitSlice";

export default function Habit({ title, habitId }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { habits } = useSelector((state) => state.habit);

  const [clickState, setClickState] = useState("outline");

  function handleClick(e) {
    e.preventDefault();

    const today = formatISO(new Date(), { representation: "date" });
    const habitData = { date: today, id: habitId };

    if (clickState === "outline") {
      dispatch(updateHabitCompleteDate(habitData));
    } else {
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
      setClickState("solid");
    }
  }, [habits]);

  return (
    <Box>
      <Card
        style={{ cursor: "pointer" }}
        onDoubleClick={() => navigate(`/stat/${habitId}`)}
      >
        <div className="habit">
          <div className="habit-title">
            <Text as="p" weight="medium" size="4">
              {title}
            </Text>

            {/* <div className="habit-week-group">
              <div className="week-square">S</div>
              <div className="week-square">M</div>
              <div className="week-square">T</div>
              <div className="week-square">W</div>
              <div className="week-square">T</div>
              <div className="week-square">F</div>
              <div className="week-square">S</div>
            </div> */}
          </div>
          <div className="habit-btn-group">
            <IconButton
              variant={clickState}
              radius="full"
              highContrast
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
