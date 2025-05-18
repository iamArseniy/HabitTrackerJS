const CalendarView = (() => {
    let currentDate = new Date();
    const today = new Date();

    function renderCalendar() {
        clearCalendar();
        renderCalendarHeader();
        renderCalendarTable();
        renderSidebarDate();
    }

    function clearCalendar() {
        const tbody = document.getElementById('calendar-body');
        if (tbody) tbody.innerHTML = '';
    }

    function renderCalendarHeader() {
        const title = document.getElementById('calendar-title');
        if (!title) return;
        const year = currentDate.getFullYear();
        const monthName = currentDate.toLocaleString('ru-RU', { month: 'long' });
        title.textContent = `${monthName} ${year}`;
    }

    function renderSidebarDate() {
        const heading = document.getElementById('current-date');
        if (!heading || typeof Controller === 'undefined') return;

        const activeDateStr = Controller.getActiveDate();
        const activeDate = new Date(activeDateStr);
        const formatted = activeDate.toLocaleString('ru-RU', {
        day: 'numeric',
        month: 'long'
        });

        heading.textContent = formatted;
    }


    function renderCalendarTable() {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const tbody = document.getElementById('calendar-body');
        if (!tbody) return;

        const firstDay = new Date(year, month, 1).getDay();
        const startIndex = (firstDay + 6) % 7;
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const daysInPrevMonth = new Date(year, month, 0).getDate();

        let nextMonthDay = 1;
        let row = document.createElement('tr');

        //Дни предыдущего месяца
        for (let i = 0; i < startIndex; i++) {
            const td = document.createElement('td');
            td.textContent = daysInPrevMonth - startIndex + i + 1;
            td.style.opacity = '0.3';
            row.appendChild(td);
        }

        // Дни текущего месяца
        for (let day = 1; day <= daysInMonth; day++) {
            if (row.children.length === 7) {
                tbody.appendChild(row);
                row = document.createElement('tr');
            }
            const td = document.createElement('td');
            td.textContent = day;
            td.dataset.day = day;

            //обработчик клика в календаре для переключения дня
            td.addEventListener('click', () => {
                const year = currentDate.getFullYear();
                const month = currentDate.getMonth();
                const clickedDate = new Date(year, month, day);

                const yearStr = clickedDate.getFullYear();
                const monthStr = String(clickedDate.getMonth() + 1).padStart(2, '0');
                const dayStr = String(clickedDate.getDate()).padStart(2, '0');
                const dateStr = `${yearStr}-${monthStr}-${dayStr}`;

                Controller.setActiveDate(dateStr);
                renderSidebarDate();
            });


            row.appendChild(td);
        }

        //Дни следующего месяца
        while (row.children.length < 7) {
            const td = document.createElement('td');
            td.textContent = nextMonthDay++;
            td.style.opacity = '0.3';
            row.appendChild(td);
        }

        tbody.appendChild(row);
    }


    function bindMonthSwitching() {
        const prev = document.getElementById('prev-month');
        const next = document.getElementById('next-month');
        if (!prev || !next) return;

        prev.addEventListener('click', () => {
            const year = currentDate.getFullYear();
            const month = currentDate.getMonth() - 1;
            currentDate = new Date(year, month, 1);
            renderCalendar();
        });

        next.addEventListener('click', () => {
            const year = currentDate.getFullYear();
            const month = currentDate.getMonth() + 1;
            currentDate = new Date(year, month, 1);
            renderCalendar();
        });
    }

    return {
        renderCalendar,
        bindMonthSwitching
    };
})();
