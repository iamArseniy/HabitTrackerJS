const Controller = (() => {
    function init() {
        if (typeof CalendarView !== 'undefined') {
            CalendarView.renderCalendar();
            CalendarView.bindMonthSwitching();
        }

        if (typeof View !== 'undefined') {
            View.bindFormSubmit(handleAddHabit);
            View.bindCloseModal(handleCloseModal);
            render();
        }
    }

    function handleAddHabit(name, startDate, days) {
        Model.addHabit(name, startDate, days);
        render();
    }

    function handleToggleDate(habitIndex, dateIndex) {
        Model.toggleDate(habitIndex, dateIndex);
        render();
    }

    function handleHabitClick(habitIndex) {
        const habit = Model.getHabitByIndex(habitIndex);
        View.renderHabitDetails(habit);
    }

    function handleCloseModal() {
        render();
    }

    function render() {
        const habits = Model.getHabits();
        View.renderHabits(habits);
    }

    return {
        init,
        handleToggleDate,
        handleHabitClick
    };
})();
