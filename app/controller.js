const Controller = (() => {
    let activeDate = new Date().toISOString().split('T')[0];

    function init() {
        if (typeof CalendarView !== 'undefined') {
            CalendarView.renderCalendar();
            CalendarView.bindMonthSwitching();
        }

        if (typeof View !== 'undefined') {
            View.bindFormSubmit(handleAddHabit);
            View.bindCloseModal(handleCloseModal);
        }
        render();
    }

    function handleAddHabit(name, startDateStr, days) {
        const dateList = [];
        const startDate = new Date(startDateStr);

        for (let i = 0; i < days; i++) {
            const d = new Date(startDate);
            d.setDate(d.getDate() + i);
            dateList.push(d.toISOString().split('T')[0]);
        }

        const habit = {
            name: name,
            description: "" 
        };

        Model.addHabitToDates(habit, dateList);
        render();
    }

    function handleToggleDate(index) {
        Model.toggleHabitStatus(activeDate, index);
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
        const habits = Model.getHabitsByDate(activeDate);
        View.renderHabits(habits);
    }


    function setActiveDate(dateStr) {
        activeDate = dateStr;
        render();
    }

    function getActiveDate() {
        return activeDate;
    }

    return {
        init,
        handleToggleDate,
        handleHabitClick,
        setActiveDate,
        getActiveDate
    };
})();
