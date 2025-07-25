import { Button } from "@radix-ui/themes";
import HeaderBar from "../components/HeaderBar";
import Habit from "../components/Habit";

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
  return (
    <div className="habit-page">
      <HeaderBar />
      <div className="habit-content">
        <Habit title={"LeetCode"} week={[Week.SUNDAY, Week.MONDAY]} />
      </div>
    </div>
  );
}
