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

    // Создаем содержимое модального окна
    // Удалите этот блок кода
    modalContent.innerHTML = `
        <span class="close">×</span>
        <h2>Запись на консультацию</h2>
        <form class="consultation-form">
            <input type="text" placeholder="Ваше имя" required>
            <input type="email" placeholder="Ваш email" required>
            <textarea placeholder="Ваше сообщение" required></textarea>
            <button type="submit">Отправить</button>
        </form>
        <div class="social-links">
            <a href="#" class="social-icon"><i class="fab fa-telegram-plane"></i></a>
            <a href="#" class="social-icon"><i class="fab fa-whatsapp"></i></a>
            <a href="#" class="social-icon"><i class="fas fa-phone"></i></a>
        </div>
    `;


    // Удалите этот блок кода
    modalContent.style.borderRadius = '50%';
    modalContent.style.width = '350px';
    modalContent.style.height = '350px';
    modalContent.style.display = 'flex';
    modalContent.style.flexDirection = 'column';
    modalContent.style.justifyContent = 'center';
    modalContent.style.alignItems = 'center';
    modalContent.style.boxSizing = 'border-box';
    modalContent.style.alignItems = 'center';
    modalContent.style.boxSizing = 'border-box';
    modalContent.style.overflow = 'hidden';

    const closeBtn = modal.querySelector('.close');

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
    }

    // Закрытие модального окна при клике вне его
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
            showLabel();
        }
    }


    // Обработчик отправки формы
    const form = modal.querySelector('.consultation-form');
    form.addEventListener('submit', function (event) {
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

        // Твой токен и chat_id
        const TOKEN = "7698667445:AAEWssGLH1FgzBQaftgfI2o6QOS_gVlKtI8";
        const CHAT_ID = "85203644"; // Измените на ваш правильный CHAT_ID
        const TEXT = `📩 *Новая заявка!*\n\n👤 Имя: ${name}\n📧 Email: ${email}\n💬 Сообщение: ${message}`;

        // Отправка запроса в Telegram API
        fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: TEXT,
                parse_mode: "Markdown"
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.ok) {
                alert('Ваше сообщение отправлено!');
                form.reset();
                modal.style.display = "none";
            } else {
                alert('Ошибка отправки: ' + data.description);
            }
        })
        .catch(error => {
            alert('Ошибка соединения: ' + error.message);
            console.error('Ошибка:', error);
        });

    });
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

