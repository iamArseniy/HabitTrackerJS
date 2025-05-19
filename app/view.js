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

    function renderHabits(habits, statusMap = {}) {
        if (!habitList) return;
        habitList.innerHTML = '';

        habits.forEach((habit, index) => {
            const li = document.createElement('li');
            if (window.location.pathname.includes('index.html')) {
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.checked = !!statusMap[habit.id];
                checkbox.addEventListener('change', () => {
                    Controller.handleToggleDate(index);
                });
                li.appendChild(checkbox);
            }

            const title = document.createElement('span');
            title.textContent = ` ${habit.name}`;
            title.style.cursor = 'pointer';
            title.addEventListener('click', () => {
                Controller.handleHabitClick(index);
            });

            li.appendChild(title);
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
            handler(habitName.value, habitDesc.value, habitStart.value, parseInt(habitDays.value));
            habitName.value = '';
            habitDesc.value = '';
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
