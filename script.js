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
    const bubble = document.getElementById('serviceBubble');
    const expandedBubble = document.getElementById('expandedBubble');
    const label = document.createElement('div');

    // Создаем и стилизуем ярлык
    label.id = 'serviceLabel';
    label.className = 'mobile-label';
    label.textContent = 'Запись на консультацию';
    document.body.appendChild(label);

    // Устанавливаем позицию label
    label.style.position = 'fixed';
    label.style.left = '20px';
    label.style.bottom = '20px';
    label.style.zIndex = '1000';
    const closeButton = document.createElement('button');
    closeButton.textContent = 'X';
    closeButton.className = 'close-button';

    function addClickEffect(element) {
        element.addEventListener('mousedown', function () {
            this.style.transform = 'scale(0.95)';
            this.style.boxShadow = '0 0 15px rgba(255, 255, 255, 0.8)';
        });

        element.addEventListener('mouseup', function () {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = '';
        });

        element.addEventListener('mouseleave', function () {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = '';
        });
    }

    addClickEffect(label);

    function closeBubble() {
        expandedBubble.style.display = 'none';
        label.style.display = 'block';

        if (expandedBubble.contains(closeButton)) {
            expandedBubble.removeChild(closeButton);
        }
    }

    label.addEventListener('click', function () {
        this.style.display = 'none';
        expandedBubble.style.display = 'block';
        expandedBubble.appendChild(closeButton);
    });

    closeButton.addEventListener('click', function (event) {
        event.stopPropagation();
        closeBubble();
    });

    document.addEventListener('click', function (event) {
        if (expandedBubble.style.display === 'block' && 
            !expandedBubble.contains(event.target) && 
            !label.contains(event.target)) {
            closeBubble();
        }
    });

    // Скрываем оригинальный bubble
    bubble.style.display = 'none';

    // Добавляем стили для анимации
    const style = document.createElement('style');
    style.textContent = `
        @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
        @keyframes colorfulShadow {
            0% { box-shadow: 0 0 15px rgba(255, 0, 255, 0.7); }
            33% { box-shadow: 0 0 15px rgba(0, 255, 255, 0.7); }
            66% { box-shadow: 0 0 15px rgba(255, 255, 0, 0.7); }
            100% { box-shadow: 0 0 15px rgba(255, 0, 255, 0.7); }
        }
    `;
    document.head.appendChild(style);

    // Скрываем оригинальный bubble
    bubble.style.display = 'none';
    animateGradient(label);
    animateGradient(expandedBubble);

});
