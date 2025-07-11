document.addEventListener('DOMContentLoaded', () => {
    
    const carrosseis = document.querySelectorAll('.rolagem-horizontal');
    if (!carrosseis.length) return;

    
    carrosseis.forEach(carrossel => {
        let isDown = false;
        let startX;
        let scrollLeft;
        let originalContentWidth;

        
        function setupInfiniteScroll() {
            const items = [...carrossel.children];
            items.forEach(item => {
                const clone = item.cloneNode(true);
                clone.setAttribute('aria-hidden', 'true');
                carrossel.appendChild(clone);
            });
            originalContentWidth = carrossel.scrollWidth / 2;
        }

        const startDragging = (e) => {
            isDown = true;
            carrossel.classList.add('ativo');
            startX = (e.pageX || e.touches[0].pageX) - carrossel.offsetLeft;
            scrollLeft = carrossel.scrollLeft;
        };

        const stopDragging = () => {
            isDown = false;
            carrossel.classList.remove('ativo');
        };

        const onDrag = (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = (e.pageX || e.touches[0].pageX) - carrossel.offsetLeft;
            const walk = (x - startX) * 2;
            window.requestAnimationFrame(() => {
                carrossel.scrollLeft = scrollLeft - walk;
            });
        };

        const checkInfiniteLoop = () => {
            if (!isDown) return;
            if (carrossel.scrollLeft >= originalContentWidth) {
                carrossel.scrollLeft -= originalContentWidth;
                scrollLeft = carrossel.scrollLeft;
            } else if (carrossel.scrollLeft <= 0 && scrollLeft > 0) {
                carrossel.scrollLeft += originalContentWidth;
                scrollLeft = carrossel.scrollLeft;
            }
        };

        // Eventos de Mouse
        carrossel.addEventListener('mousedown', startDragging);
        carrossel.addEventListener('mouseleave', stopDragging);
        carrossel.addEventListener('mouseup', stopDragging);
        carrossel.addEventListener('mousemove', (e) => {
            onDrag(e);
            checkInfiniteLoop();
        });

        // Eventos de Toque (para dispositivos móveis)
        carrossel.addEventListener('touchstart', startDragging, { passive: true });
        carrossel.addEventListener('touchend', stopDragging);
        carrossel.addEventListener('touchcancel', stopDragging);
        carrossel.addEventListener('touchmove', (e) => {
            onDrag(e);
            checkInfiniteLoop();
        });

        // Inicializa o carrossel
        setupInfiniteScroll();
    });
});