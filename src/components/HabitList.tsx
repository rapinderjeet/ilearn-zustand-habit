import { Habit, useHabitStore } from "../stores/store";
import {
  Box,
  Button,
  Grid,
  LinearProgress,
  Paper,
  Typography,
} from "@mui/material";
import { CheckCircle, Delete } from "@mui/icons-material";

const HabitList = () => {
  const { habits, removeHabit, toggleHabit } = useHabitStore();
  const today = new Date().toISOString().split("T")[0];

  const getStreak = (habit: Habit) => {
    let streak = 0;
    let checkDate = new Date();

    while (true) {
      if (
        habit.completedDates.includes(checkDate.toISOString().split("T")[0])
      ) {
        checkDate.setDate(checkDate.getDate() - 1);
        streak++;
        console.log("streak >> ", streak);
      } else {
        break;
      }
    }

    return streak;
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        mt: 4,
      }}
    >
      {habits.map((habit) => (
        <Paper key={habit.id} elevation={2} sx={{ p: 2 }}>
          <Grid container alignItems="center">
            <Grid xs={12} sm={6}>
              <Typography variant="h6">{habit.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                {habit.frequency.charAt(0).toUpperCase() +
                  habit.frequency.slice(1)}
              </Typography>
            </Grid>

            <Grid xs={12} sm={6}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: 1,
                }}
              >
                <Button
                  variant="outlined"
                  color={
                    habit.completedDates.includes(today) ? "success" : "primary"
                  }
                  startIcon={<CheckCircle />}
                  onClick={() => toggleHabit(habit.id, today)}
                >
                  {habit.completedDates.includes(today)
                    ? "Completed"
                    : "Mark Complete"}
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<Delete />}
                  onClick={() => removeHabit(habit.id)}
                >
                  Remove
                </Button>
              </Box>
            </Grid>
          </Grid>

          <Box
            sx={{
              mt: 2,
            }}
          >
            <Typography>Current Streak: {getStreak(habit)}</Typography>
            <LinearProgress
              variant="determinate"
              value={(getStreak(habit) / 30) * 100}
              sx={{ mt: 1 }}
            />
          </Box>
        </Paper>
      ))}
    </Box>
  );
};

export default HabitList;
