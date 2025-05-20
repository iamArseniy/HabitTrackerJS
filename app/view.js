const View = (() => {
    const habitForm = document.getElementById('habit-form');
    const habitName = document.getElementById('habit-name');
    const habitDesc = document.getElementById('habit-desc');
    const habitStart = document.getElementById('habit-start');
    const habitDays = document.getElementById('habit-days');
    const habitList = document.getElementById('habit-list');
    const habitDetailsModal = document.getElementById('habit-details-modal');
    const habitDatesList = document.getElementById('habit-dates-list');
    const closeModalButton = document.getElementById('close-modal');
    const habitIcon = document.getElementById('habit-icon');

    function renderHabits(habits, statusMap = {}) {
        if (!habitList) return;
        habitList.innerHTML = '';

        const isCreatePage = window.location.pathname.includes('create.html');

        const filterSelect = document.getElementById('filter-select');
        const filterValue = filterSelect ? filterSelect.value : 'all';

        const filteredHabits = habits.filter(habit => {
            const done = !!statusMap[habit.id];
            if (filterValue === 'done') return done;
            if (filterValue === 'not-done') return !done;
            return true;
        });

        filteredHabits.forEach(habit => {
            const li = document.createElement('li');

            if (!isCreatePage) {
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.checked = !!statusMap[habit.id];
                checkbox.addEventListener('change', () => {
                    Controller.handleToggleHabitToday(habit.id);
                });
                li.appendChild(checkbox);
            }

            console.log("icon:", habit.icon, "emoji:", getIconEmoji(habit.icon));
            const iconSpan = document.createElement('span');
            iconSpan.textContent = habit.icon ? getIconEmoji(habit.icon) + ' ' : '';
            li.appendChild(iconSpan);

            const title = document.createElement('span');
            title.textContent =  `${habit.name}`;
            title.style.cursor = 'pointer';
            title.addEventListener('click', () => {
                Controller.handleHabitClickById(habit.id);
            });

            li.appendChild(title);

            if (isCreatePage) {
                const deleteBtn = document.createElement('button');
                deleteBtn.textContent = 'Удалить';
                deleteBtn.style.marginLeft = '10px';
                deleteBtn.addEventListener('click', () => {
                    Controller.handleDeleteHabit(habit.id);
                });
                li.appendChild(deleteBtn);
            }

            habitList.appendChild(li);
        });
    }


    function renderHabitDetails(habit) {
        if (!habit || !Array.isArray(habit.dates)) return;
        habitDatesList.innerHTML = '';

        const modalContent = habitDetailsModal.querySelector('.modal-content');
        modalContent.innerHTML = `
            <h2>${habit.name}</h2>
            <p>${habit.description || ''}</p>
            <div id="habit-dates-list"></div>
            <button id="close-modal">Закрыть</button>
        `;

        const datesContainer = modalContent.querySelector('#habit-dates-list');
        const closeButton = modalContent.querySelector('#close-modal');

        habit.dates.forEach(dateObj => {
            const label = document.createElement('label');
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = dateObj.done;
            checkbox.addEventListener('change', () => {
                Controller.handleToggleHabitDate(dateObj.date, habit.id);
            });

            label.appendChild(checkbox);
            label.appendChild(document.createTextNode(` ${formatDateToRussian(dateObj.date)}`));
            datesContainer.appendChild(label);
        });

        closeButton.addEventListener('click', () => {
            habitDetailsModal.style.display = 'none';
        });

        habitDetailsModal.style.display = 'block';
    }


    function formatDateToRussian(dateStr) {
        const d = new Date(dateStr);
        return `${d.getDate()} ${d.toLocaleString('ru-RU', { month: 'long' })}`;
    }

    function bindFormSubmit(handler) {
        if (!habitForm) return;
        habitForm.addEventListener('submit', e => {
            e.preventDefault();
            handler(
                habitName.value,
                habitDesc.value,
                habitStart.value,
                parseInt(habitDays.value),
                habitIcon.value
            );
            habitName.value = '';
            habitDesc.value = '';
            habitStart.value = '';
            habitDays.value = '';
            habitIcon.value = 'cleaning';
        });
    }


    function bindCloseModal(handler) {
        if (!closeModalButton) return;
        closeModalButton.addEventListener('click', () => {
            habitDetailsModal.style.display = 'none';
        });
    }
    function getIconEmoji(icon) {
        const map = {
            cleaning: '🧹',
            fitness: '🏃‍♂️',
            water: '💧',
            nutrition: '🥗',
            reading: '📚',
            sleep: '💤',
            meditation: '🧘‍♀️',
            work: '💼'
        };
        return map[icon] || '';
    }


    return {
        renderHabits,
        renderHabitDetails,
        bindFormSubmit,
        bindCloseModal
    };
})();