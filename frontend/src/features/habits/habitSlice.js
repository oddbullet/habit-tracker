import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import habitService from "./habitService";

const initialState = {
  habits: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getHabit = createAsyncThunk(
  "habit/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await habitService.getHabit(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createHabit = createAsyncThunk(
  "habit/create",
  async (habitData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await habitService.createHabit(habitData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateHabitTitle = createAsyncThunk(
  "habit/updateTitle",
  async (title, habitId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await habitService.updateHabitTitle(title, habitId, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateHabitCompleteDate = createAsyncThunk(
  "habit/updateCompleteDate",
  async ({ date, id }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await habitService.updateHabitCompleteDate(date, id, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteHabitCompleteDate = createAsyncThunk(
  "habit/deleteCompleteDate",
  async ({ date, id }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await habitService.deleteHabitCompleteDate(date, id, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateHabitStreak = createAsyncThunk(
  "habit/updateStreak",
  async ({ streak, id }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await habitService.updateHabitStreak(streak, id, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteHabit = createAsyncThunk(
  "habit/delete",
  async (habitId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await habitService.deleteHabit(habitId, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const habitSlice = createSlice({
  name: "habit",
  initialState,
  reducers: {
    reset: (state) => {
      (state.isError = false),
        (state.isSuccess = false),
        (state.isLoading = false),
        (state.message = "");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createHabit.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createHabit.fulfilled, (state, actions) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.habits.push(actions.payload);
      })
      .addCase(createHabit.rejected, (state, actions) => {
        state.isLoading = false;
        state.isError = true;
        state.message = actions.payload;
      })
      .addCase(getHabit.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getHabit.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.habits = action.payload;
      })
      .addCase(getHabit.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateHabitTitle.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateHabitTitle.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const index = state.habits.findIndex(
          (habit) => habit._id === action.payload._id
        );
        if (index !== -1) {
          state.habits[index] = action.payload;
        }
      })
      .addCase(updateHabitTitle.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateHabitCompleteDate.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateHabitCompleteDate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const index = state.habits.findIndex(
          (habit) => habit._id === action.payload._id
        );
        if (index !== -1) {
          state.habits[index] = action.payload;
        }
      })
      .addCase(updateHabitCompleteDate.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteHabitCompleteDate.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteHabitCompleteDate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const index = state.habits.findIndex(
          (habit) => habit._id === action.payload._id
        );
        if (index !== -1) {
          state.habits[index] = action.payload;
        }
      })
      .addCase(deleteHabitCompleteDate.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateHabitStreak.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateHabitStreak.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const index = state.habits.findIndex(
          (habit) => habit._id === action.payload._id
        );
        if (index !== -1) {
          state.habits[index] = action.payload;
        }
      })
      .addCase(updateHabitStreak.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(deleteHabit.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteHabit.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.habits = state.habits.filter(
          (habit) => habit._id !== action.payload.id
        );
      })
      .addCase(deleteHabit.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = habitSlice.actions;
export default habitSlice.reducer;
