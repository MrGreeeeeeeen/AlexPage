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

document.addEventListener('DOMContentLoaded', function () {
    const expandedBubble = document.getElementById('expandedBubble');
    const label = document.createElement('div');

    // Создаем и стилизуем ярлык
    label.id = 'serviceLabel';
    label.className = 'mobile-label animate-gradient';
    label.textContent = 'Запись на консультацию';
    document.body.appendChild(label);

    // Применяем анимацию градиента к ярлыку
    animateGradient(label);

    const closeButton = document.createElement('button');
    closeButton.textContent = 'X';
    closeButton.className = 'close-button';

    function toggleBubble(show) {
        expandedBubble.style.display = show ? 'block' : 'none';
        label.style.display = show ? 'none' : 'block';
        if (show) {
            expandedBubble.appendChild(closeButton);
        } else if (expandedBubble.contains(closeButton)) {
            expandedBubble.removeChild(closeButton);
        }
    }

    // Делегирование событий
    document.body.addEventListener('click', function(event) {
        if (event.target === label) {
            toggleBubble(true);
        } else if (event.target === closeButton || 
                   (expandedBubble.style.display === 'block' && 
                    !expandedBubble.contains(event.target) && 
                    !label.contains(event.target))) {
            toggleBubble(false);
        }
    });

    // Скрываем оригинальный bubble
    document.getElementById('serviceBubble').style.display = 'none';

    // Добавляем классы для анимации вместо прямого изменения стилей
    label.classList.add('animate-gradient');
    expandedBubble.classList.add('animate-gradient');
});

