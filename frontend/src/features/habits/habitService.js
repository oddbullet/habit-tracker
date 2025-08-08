import api from "../../app/axios";

const API_URL = "/habits/";

async function getHabit(token) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await api.get(API_URL, config);

  return response.data;
}

async function createHabit(habitData, token) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await api.post(API_URL, habitData, config);

  return response.data;
}

async function updateHabitTitle(newTitle, habitId, token) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await api.put(
    API_URL + "title/" + habitId,
    newTitle,
    config
  );

  return response.data;
}

async function updateHabitCompleteDate(newDate, habitId, token) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await api.put(
    API_URL + "date/" + habitId,
    { date: newDate },
    config
  );

  return response.data;
}

async function updateHabitStreak(newStreak, habitId, token) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await api.put(
    API_URL + "stat/" + habitId,
    { streak: newStreak },
    config
  );

  return response.data;
}

async function deleteHabit(habitId, token) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await api.delete(API_URL + "delete/" + habitId, config);

  return response.data;
}

const habitService = {
  getHabit,
  createHabit,
  updateHabitTitle,
  updateHabitCompleteDate,
  updateHabitStreak,
  deleteHabit,
};

export default habitService;
