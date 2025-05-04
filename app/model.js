const Model = (() => {
    let habits = JSON.parse(localStorage.getItem('habits')) || [];

    function save() {
        localStorage.setItem('habits', JSON.stringify(habits));
    }

    function addHabit(name, startDate, days) {
        const dates = [];
        const start = new Date(startDate);
        for (let i = 0; i < days; i++) {
            const d = new Date(start);
            d.setDate(start.getDate() + i);
            dates.push({
                date: d.toISOString().split('T')[0],
                done: false
            });
        }
        habits.push({ name, dates, expanded: false });
        save();
    }

    function toggleDate(habitIndex, dateIndex) {
        habits[habitIndex].dates[dateIndex].done = !habits[habitIndex].dates[dateIndex].done;
        save();
    }

    function getHabitByIndex(habitIndex) {
        return habits[habitIndex];
    }

    function getHabits() {
        return habits;
    }

    return {
        addHabit,
        toggleDate,
        getHabitByIndex,
        getHabits
    };
})();
