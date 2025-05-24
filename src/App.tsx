import "./App.css";
import { Box, Container, Typography } from "@mui/material";
import AddHabbitForm from "./components/AddHabbitForm";
import HabitList from "./components/HabitList";

function App() {
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
