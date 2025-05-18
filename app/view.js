const View = (() => {
    const habitForm = document.getElementById('habit-form');
    const habitName = document.getElementById('habit-name');
    const habitStart = document.getElementById('habit-start');
    const habitDays = document.getElementById('habit-days');
    const habitList = document.getElementById('habit-list');
    const habitDetailsModal = document.getElementById('habit-details-modal');
    const habitDatesList = document.getElementById('habit-dates-list');
    const closeModalButton = document.getElementById('close-modal');

    function renderHabits(habits) {
        habitList.innerHTML = '';
        habits.forEach((habit, index) => {
            const li = document.createElement('li');
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = habit.done;

            checkbox.addEventListener('change', () => {
                Controller.handleToggleDate(index);
            });

            li.appendChild(checkbox);
            li.append(` ${habit.name}`);
            habitList.appendChild(li);
        });
    }


    function renderHabitDetails(habit) {
        habitDatesList.innerHTML = '';
        habit.dates.forEach((dateObj, dateIndex) => {
            const label = document.createElement('label');
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = dateObj.done;
            checkbox.addEventListener('change', () => {
                Controller.handleToggleDate(habitIndex, dateIndex);
            });
            label.appendChild(checkbox);
            label.appendChild(document.createTextNode(` ${dateObj.date}`));
            habitDatesList.appendChild(label);
        });
        habitDetailsModal.style.display = 'block';
    }

    function bindFormSubmit(handler) {
        if (!habitForm) return; 
        habitForm.addEventListener('submit', e => {
            e.preventDefault();
            handler(habitName.value, habitStart.value, parseInt(habitDays.value));
            habitName.value = '';
            habitStart.value = '';
            habitDays.value = '';
        });
    }

    function bindCloseModal(handler) {
        if (!closeModalButton) return;    
        closeModalButton.addEventListener('click', () => {
            habitDetailsModal.style.display = 'none';
        });
    }


    return {
        renderHabits,
        renderHabitDetails,
        bindFormSubmit,
        bindCloseModal
    };
})();
