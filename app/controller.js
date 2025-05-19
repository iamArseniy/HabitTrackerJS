const Controller = (() => {
    let activeDate = new Date().toISOString().split('T')[0];

    function init() {
        if (typeof CalendarView !== 'undefined') {
            CalendarView.renderCalendar();
            CalendarView.bindMonthSwitching(setActiveDate);
            if (window.location.pathname.includes('index.html')) {
                render();
            }
        }

        if (typeof View !== 'undefined') {
        View.bindFormSubmit(handleAddHabit);
        View.bindCloseModal(handleCloseModal);
        if (window.location.pathname.includes('create.html')) {
            renderCreate();
        }
    }
        
    }

    function handleAddHabit(name, description, startDateStr, days) {
        const dateList = [];
        const startDate = new Date(startDateStr);

        for (let i = 0; i < days; i++) {
            const d = new Date(startDate);
            d.setDate(d.getDate() + i);
            dateList.push(d.toISOString().split('T')[0]);
        }

        const habit = {
            name: name,
            description: description
        };

        Model.addHabitToDates(habit, dateList);
        renderCreate();
    }

    function handleHabitClick(index) {
        const habits = Model.getAllHabits();
        const habit = habits[index];         
        const habitDates = Model.getHabitById(habit.id); 

        View.renderHabitDetails({
        id:    habit.id,
        name:  habit.name,
        description: habit.description,
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

    function handleToggleHabitDate(dateStr, habitId) {
        Model.toggleHabitStatus(dateStr, habitId);
        const updatedDates = Model.getHabitById(habitId);

        const allHabits = Model.getAllHabits();
        const habit = allHabits.find(h => h.id === habitId);

        View.renderHabitDetails({
            id: habitId,
            name: habit?.name || '',
            description: habit?.description || '',
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
        if (window.location.pathname.includes('create.html')) {
            renderCreate();
        } else {
            render();
        }
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
