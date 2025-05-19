let habitData = JSON.parse(localStorage.getItem('habitData')) || {};

function saveHabits() {
  localStorage.setItem('habitData', JSON.stringify(habitData));
}


function generateId() {
  return 'habit-' + Math.random().toString(36).slice(2, 11);
}

function getAllHabits() {
  const unique = new Map();
  for (const date in habitData) {
    for (const habit of habitData[date]) {
      if (!unique.has(habit.id)) {
        unique.set(habit.id, {
          id: habit.id,
          name: habit.name
        });
      }
    }
  }
  return Array.from(unique.values());
}


function addHabitToDates(habit, dateList) {
  const id = generateId();

  dateList.forEach(date => {
    if (!habitData[date]) habitData[date] = [];
    habitData[date].push({
      id,
      name: habit.name,
      description: habit.description || "",
      done: false
    });
  });

  saveHabits();
}

function getHabitById(id) {
  const result = [];
  for (const date in habitData) {
    for (const h of habitData[date]) {
      if (h.id === id) {
        result.push({ date, done: h.done });
      }
    }
  }
  return result;
}

function getHabitsByDate(date) {
  return habitData[date] || [];
}

function toggleHabitStatus(date, id) {
  if (!habitData[date]) return;
  const list = habitData[date];
  const idx = list.findIndex(h => h.id === id);
  if (idx !== -1) {
    list[idx].done = !list[idx].done;
    saveHabits();
  }
}

function getTodayStatusMap(date) {
  const result = {};
  if (!habitData[date]) return result;
  for (const habit of habitData[date]) {
    result[habit.id] = habit.done;
  }
  return result;
}


const Model = {
  addHabitToDates,
  getHabitsByDate,
  getHabitById,
  toggleHabitStatus,
  getAllHabits,
  getTodayStatusMap
};
