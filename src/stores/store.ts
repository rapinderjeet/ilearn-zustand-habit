import { produce } from "immer";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export enum HabitFrequency {
  DAILY = "daily",
  WEEKLY = "weekly",
}

export interface Habit {
  id: string;
  name: string;
  frequency: HabitFrequency;
  completedDates: Array<string>;
  createdAt: string;
}

interface HabitState {
  habits: Array<Habit>;
  addHabit: (name: string, frequency: HabitFrequency) => void;
  removeHabit: (id: string) => void;
  toggleHabit: (id: string, date: string) => void;
}

export const useHabitStore = create<HabitState>()(
  persist(
    devtools((set) => {
      return {
        habits: [],
        addHabit: (name, frequency) =>
          set(
            produce((state) => {
              state.habits.push({
                id: Date.now().toString(),
                name,
                frequency,
                completedDates: [],
                createdAt: new Date().toISOString(),
              });
            })
          ),
        removeHabit: (id) =>
          set(
            produce((state) => {
              state.habits = state.habits.filter(
                (habit: any) => habit.id !== id
              );
            })
          ),
        toggleHabit: (id, date) =>
          set(
            produce((state) => {
              const habit = state.habits.find((habit: any) => habit.id === id);
              if (habit) {
                if (habit.completedDates.includes(date)) {
                  habit.completedDates = habit.completedDates.filter(
                    (cdate: any) => date !== cdate
                  );
                } else {
                  habit.completedDates.push(date);
                }
              }
            })
          ),
      };
    }),
    {
      name: "habit",
    }
  )
);
