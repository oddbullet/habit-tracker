import { useSelector } from "react-redux";
import { useLocation } from "react-router";

export const useHabitData = () => {
  const location = useLocation();
  const isDemo = location.pathname.includes("/demo");

  const realData = useSelector((state) => state.habit);
  const demoData = useSelector((state) => state.demo);

  return isDemo
    ? { ...demoData, isDemo: true }
    : { ...realData, isDemo: false };
};
