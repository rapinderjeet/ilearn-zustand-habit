import "./App.css";
import { Box, Container, Typography } from "@mui/material";
import { useHabitStore } from "./stores/store";
import AddHabbitForm from "./components/AddHabbitForm";
import HabitList from "./components/HabitList";

function App() {
  // const store = useHabitStore();
  // console.log("store", store);
  return (
    <Container>
      <Box>
        <Typography variant="h3" component="h1" gutterBottom align="center">
          Habit Tracker
        </Typography>

        <AddHabbitForm />

        <HabitList />
      </Box>
    </Container>
  );
}

export default App;
