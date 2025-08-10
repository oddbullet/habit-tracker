import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Text, IconButton, Card, Box } from "@radix-ui/themes";
import HeaderBar from "../components/HeaderBar";
import { differenceInCalendarDays, formatISO } from "date-fns";
import { useNavigate, useParams } from "react-router";
import {
  updateHabitStreak,
  deleteHabit,
  reset,
} from "../features/habits/habitSlice";
import CalHeatmap from "cal-heatmap";
import "cal-heatmap/cal-heatmap.css";
import { ArrowLeftIcon, TrashIcon } from "@radix-ui/react-icons";

// Change Habit Title
// CalHeatMap

// 2. Get the title, completed dates
// 3. Implement change title

export default function StatPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { habitId } = useParams();
  const [habitData, setHabitData] = useState({
    title: "",
    start_date: "",
    streak: 0,
    completed_dates: [],
  });

  const [currentStreak, setCurrentStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);

  const [completionPercent, setCompletionPercent] = useState(0);
  const [totalDate, setTotalDate] = useState(1);

  const { user } = useSelector((state) => state.auth);

  const { habits, isLoading, isError, message } = useSelector(
    (state) => state.habit
  );

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }

    if (isError) {
      console.log(message);
    }

    return () => {
      dispatch(reset());
    };
  }, [user, isError, message, navigate, dispatch]);

  useEffect(() => {
    if (habits.length <= 0) return;

    const habit = habits.find((h) => h._id === habitId);
    if (habit) {
      setHabitData(habit);
    }
  }, [habits]);

  // Calculate Current Streak and completion rate
  useEffect(() => {
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
  }, [habitData]);

  // Longest Streak
  useEffect(() => {
    if (habitData.title === "") return;

    const greatest = Math.max(currentStreak, habitData.streak);
    setLongestStreak(greatest);

    const updateData = { streak: greatest, id: habitId };
    dispatch(updateHabitStreak(updateData));
  }, [habitData.streak, currentStreak]);

  // Completion Rate
  useEffect(() => {
    if (habitData.start_date === "") return;

    setTotalDate(differenceInCalendarDays(new Date(), habitData.start_date));

    const percent = (
      (habitData.completed_dates.length / totalDate) *
      100
    ).toFixed(2);
    setCompletionPercent(percent);
  }, [habitData]);

  // Heatmap
  const calRef = useRef(null);
  useEffect(() => {
    if (calRef.current) return;

    calRef.current = new CalHeatmap();
    calRef.current.paint({
      data: { source: [], x: "date", y: "value" },
      date: { start: new Date(new Date().getFullYear(), 0, 1) },
      range: 12,
      scale: {
        color: { type: "linear", range: ["#37a446"], domain: [0, 1] },
      },
      domain: {
        type: "month",
        gutter: 4,
        label: { text: "MMM", textAlign: "start", position: "top" },
      },
      subDomain: {
        type: "ghDay",
        radius: 2,
        width: 11,
        height: 11,
        gutter: 4,
      },
      itemSelector: "#cal-heatmap",
    });

    return () => {
      calRef.current.destroy();
      calRef.current = null;
    };
  }, []);

  // Fill Heatmap
  useEffect(() => {
    if (calRef.current && habitData.completed_dates.length !== 0) {
      setTimeout(() => {
        const dataSource = habitData.completed_dates.map((data) => ({
          date: data,
          value: 1,
        }));

        calRef.current.fill(dataSource);
      }, 0);
    }
  }, [habitData]);

  function handleDelete() {
    dispatch(deleteHabit(habitId)).then(() => {
      navigate("/habit");
    });
  }

  return (
    <div className="stat-page">
      <HeaderBar />
      <div className="stat-content">
        <div className="stat-topbar">
          <div className="stat-habit-title">
            <Text as="p" size="6" weight="bold">
              {habitData.title}
            </Text>
          </div>
          <div className="stat-btn">
            <IconButton color="red" onClick={handleDelete}>
              <TrashIcon width={20} height={20} />
            </IconButton>
            <IconButton
              color="gray"
              highContrast
              onClick={() => navigate("/habit")}
            >
              <ArrowLeftIcon width={20} height={20} />
            </IconButton>
          </div>
        </div>
        <div>
          <div className="first-stat">
            <Box maxWidth={"300px"}>
              <Card className="current-streak">
                <Text as="p" size="3" weight="bold">
                  Current Streak
                </Text>
                <Text as="p" size="2" weight="bold">
                  {currentStreak} days
                </Text>
              </Card>
            </Box>

            <Box maxWidth={"300px"}>
              <Card className="longest-streak">
                <Text as="p" size="3" weight="bold">
                  Longest Streak
                </Text>
                <Text as="p" size="2" weight="bold">
                  {longestStreak} days
                </Text>
              </Card>
            </Box>

            <Box maxWidth={"300px"}>
              <Card className="completion">
                <Text as="p" size="3" weight="bold">
                  Completion
                </Text>
                <Text as="p" size="2" weight="bold">
                  {completionPercent}%
                </Text>
                <Text as="p" size="2" weight="bold">
                  {habitData.completed_dates.length} of {totalDate} days
                </Text>
              </Card>
            </Box>
          </div>
          <div id="cal-heatmap"></div>
        </div>
      </div>
    </div>
  );
}
