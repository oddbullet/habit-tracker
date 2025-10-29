import { useDispatch } from "react-redux";
import { useLocation } from "react-router";
import {
  createDemoHabit,
  deleteDemoHabit,
  deleteDemoHabitCompleteDate,
  resetDemo,
  updateDemoHabitCompleteDate,
  updateDemoHabitTitle,
} from "../features/demo/demoSlice";
import {
  createHabit,
  deleteHabit,
  deleteHabitCompleteDate,
  reset,
  updateHabitCompleteDate,
  updateHabitTitle,
} from "../features/habits/habitSlice";

function useHabitActions() {
  const location = useLocation();
  const dispatch = useDispatch();
  const isDemo = location.pathname.includes("/demo");

  return {
    isDemo,
    updateCompleteDate: ({ date, id }) => {
      if (isDemo) {
        dispatch(updateDemoHabitCompleteDate({ date, id }));
      } else {
        dispatch(updateHabitCompleteDate({ date, id }));
      }
    },
    deleteCompleteDate: ({ date, id }) => {
      if (isDemo) {
        dispatch(deleteDemoHabitCompleteDate({ date, id }));
      } else {
        dispatch(deleteHabitCompleteDate({ date, id }));
      }
    },
    updateTitle: (config) => {
      if (isDemo) {
        dispatch(updateDemoHabitTitle(config));
      } else {
        dispatch(updateHabitTitle(config));
      }
    },
    deleteHabit: (id) => {
      if (isDemo) {
        dispatch(deleteDemoHabit(id));
      } else {
        dispatch(deleteHabit(id));
      }
    },
    createHabit: (habitData) => {
      if (isDemo) {
        dispatch(createDemoHabit(habitData));
      } else {
        dispatch(createHabit(habitData));
      }
    },
    reset: () => {
      if (isDemo) {
        dispatch(resetDemo());
      } else {
        dispatch(reset());
      }
    },
  };
}

export default useHabitActions;
