const Controller = (() => {
    let activeDate = new Date().toISOString().split('T')[0];

    function init() {
        if (typeof CalendarView !== 'undefined') {
            CalendarView.renderCalendar();
            CalendarView.bindMonthSwitching(setActiveDate);
            render();
        }

        if (typeof View !== 'undefined') {
            View.bindFormSubmit(handleAddHabit);
            View.bindCloseModal(handleCloseModal);
            renderCreate();
        }
        
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

    function handleHabitClick(index) {
        const habits = Model.getAllHabits();
        const habit = habits[index];         
        const habitDates = Model.getHabitById(habit.id); 

        View.renderHabitDetails({
        id:    habit.id,
        name:  habit.name,
        dates: habitDates
        });
    }

    function handleToggleDate(index) {
        const habits = Model.getHabitsByDate(activeDate);
        const habit = habits[index];
        if (!habit) return;
        Model.toggleHabitStatus(activeDate, habit.id);
        render();
    }

    // Переключение статуса прямо в модалке 
    function handleToggleHabitDate(dateStr, habitId) {
        Model.toggleHabitStatus(dateStr, habitId);
        const updatedDates = Model.getHabitById(habitId);
        View.renderHabitDetails({
            id: habitId,
            name: habitId,
            dates: updatedDates
        });
    }
    
    function handleCloseModal() {
        render();
    }

    function render() {
        const habits = Model.getHabitsByDate(activeDate);
        const statusMap = Model.getTodayStatusMap(activeDate);
        View.renderHabits(habits, statusMap);
    }

    function renderCreate() {
        const habits = Model.getAllHabits();
        const today = new Date().toISOString().split('T')[0];
        const statusMap = Model.getTodayStatusMap(today);
        View.renderHabits(habits, statusMap);
    }

    function handleToggleHabitToday(habitId) {
        const today = new Date().toISOString().split('T')[0];
        Model.toggleHabitStatus(today, habitId);
        render();
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
        handleCloseModal,
        setActiveDate,
        getActiveDate,
        handleToggleHabitDate,
        handleToggleHabitToday
    };
})();
