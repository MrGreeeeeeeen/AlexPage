document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('modal');
    const label = document.createElement('div');
    const modalContent = modal.querySelector('.modal-content');

    // Создаем и стилизуем ярлык
    label.id = 'serviceLabel';
    label.textContent = 'Запись на консультацию';
    document.body.appendChild(label);

    // Применяем анимацию градиента к ярлыку и модальному контенту
    animateGradient(label);
    animateGradient(modalContent);

    const closeBtn = modal.querySelector('.close');
    const form = document.getElementById('consultation-form');

    // Функция для анимации скрытия label
    function hideLabel() {
        label.style.transition = 'transform 0.5s ease-out';
        label.style.transform = 'translateX(-100%)';
    }

    // Функция для анимации показа label
    function showLabel() {
        label.style.transition = 'transform 0.5s ease-in';
        label.style.transform = 'translateX(0)';
    }

    // Открытие модального окна
    label.onclick = function() {
        modal.style.display = "flex";
        modal.style.justifyContent = "center";
        modal.style.alignItems = "center";
        hideLabel();
    }

    // Закрытие модального окна
closeBtn.onclick = function() {
    modal.style.display = "none";
    showLabel();
    label.style.transform = ''; // Сброс transform
}

    // Закрытие модального окна при клике вне его
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        showLabel();
        label.style.transform = ''; // Сброс transform
    }
}
    // Обработчик отправки формы
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();

            const name = form.querySelector('input[type="text"]').value.trim();
            const email = form.querySelector('input[type="email"]').value.trim();
            const message = form.querySelector('textarea').value.trim();

            if (!name || !email || !message) {
                alert('Заполните все поля!');
                return;
            }

            if (!/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(email)) {
                alert('Введите корректный email!');
                return;
            }

            // Отправка данных на сервер
            fetch('/send-message', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    message: message
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Ваше сообщение отправлено!');
                    form.reset();
                    modal.style.display = "none";
                    showLabel(); // Показываем ярлык
                    label.style.transform = ''; // Сброс transform
                } else {
                    alert('Ошибка отправки: ' + data.error);
                }
            })
            .catch(error => {
                alert('Ошибка соединения: ' + error.message);
                console.error('Ошибка:', error);
            });
        });
    } else {
        console.error('Форма с идентификатором "consultation-form" не найдена.');
    }

});

function animateGradient(element) {
    let hue = 0;

    function updateGradient() {
        hue = (hue + 0.3) % 360;
        const color1 = `hsla(${hue}, 60%, 60%, 0.9)`;
        const color2 = `hsla(${(hue + 120) % 360}, 60%, 60%, 0.9)`;
        const color3 = `hsla(${(hue + 240) % 360}, 60%, 60%, 0.9)`;

        element.style.background = `
            linear-gradient(45deg,
            ${color1}, 
            ${color2}, 
            ${color3})
        `;
        element.style.backgroundSize = '200% 200%';
        element.style.animation = 'gradientShift 5s ease infinite, colorfulShadow 10s infinite linear';

        requestAnimationFrame(updateGradient);
    }

    updateGradient();
}