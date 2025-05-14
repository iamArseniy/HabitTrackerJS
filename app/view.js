const View = (() => {
    const habitForm = document.getElementById('habit-form');
    const habitName = document.getElementById('habit-name');
    const habitStart = document.getElementById('habit-start');
    const habitDays = document.getElementById('habit-days');
    const habitList = document.getElementById('habit-list');
    const habitDetailsModal = document.getElementById('habit-details-modal');
    const habitDatesList = document.getElementById('habit-dates-list');
    const closeModalButton = document.getElementById('close-modal');
    const isIndexPage = !!document.getElementById('calendar-body');
    const isCreatePage = !!document.getElementById('habit-form');

    function renderHabits(habits) {
        if (!isCreatePage) return;
        habitList.innerHTML = '';
        habits.forEach((habit, habitIndex) => {
            const li = document.createElement('li');
            li.className = 'habit-item';
            const title = document.createElement('div');
            title.textContent = habit.name;
            title.style.cursor = 'pointer';
            title.addEventListener('click', () => {
                Controller.handleHabitClick(habitIndex);
            });
            li.appendChild(title);
            habitList.appendChild(li);
        });
    }

    function renderHabitDetails(habit) {
        if (!isCreatePage) return;
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
        if (!isCreatePage) return;
        habitForm.addEventListener('submit', e => {
            e.preventDefault();
            handler(habitName.value, habitStart.value, parseInt(habitDays.value));
            habitName.value = '';
            habitStart.value = '';
            habitDays.value = '';
        });
    }

    function bindCloseModal(handler) {
        if (!isCreatePage) return;
        closeModalButton.addEventListener('click', () => {
            habitDetailsModal.style.display = 'none';
        });
    }

    function renderCalendar(date = new Date()){
        if (!isIndexPage) return;
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const startIndex = (firstDay + 6) % 7;

        const tbody = document.getElementById('calendar-body');
        tbody.innerHTML = '';
        let row = document.createElement('tr');
        for (let i = 0; i < startIndex; i++){
            row.appendChild(document.createElement('td'));
        }

        for (let day = 1; day <= daysInMonth; day++){
            if (row.children.length === 7){
                tbody.appendChild(row);
                row = document.createElement('tr');
            }
            const td = document.createElement('td');
            td.textContent = day;
            td.dataset.day = day;
            row.appendChild(td);
        }

        while (row.children.length < 7){
            row.appendChild(document.createElement('td'));
        }
        tbody.appendChild(row);

        const heading = document.getElementById('current-date');
        const day = date.getDate();
        const monthName = date.toLocaleString('ru-RU', {month: 'long'});
        heading.textContent = `${day} ${monthName}`;
    };


    return {
        renderHabits,
        renderHabitDetails,
        bindFormSubmit,
        bindCloseModal,
        renderCalendar
    };
})();
