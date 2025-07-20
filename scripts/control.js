/* Script com a lógica de controle da landing page */

// Espera o DOM estar completamente carregado antes de executar o script:
document.addEventListener('DOMContentLoaded', () => {
    // Seleciona TODOS os 'wrappers' de carrossel da página:
    const allCarouselWrappers = document.querySelectorAll('.carousel-wrapper');

    for (const wrapper of allCarouselWrappers) {
        
        // Encontra os elementos específicos dentro do wrapper atual:
        const container = wrapper.querySelector('.carousel-container');
        const slide = wrapper.querySelector('.carousel-slide');
        const items = wrapper.querySelectorAll('.carousel-item');
        const prevBtn = wrapper.querySelector('.carousel-prev');
        const nextBtn = wrapper.querySelector('.carousel-next');
        const indicatorsContainer = wrapper.querySelector('.carousel-indicators');

        const totalItems = items.length;
        if (totalItems === 0) continue; // Pula para o próximo se o carrossel estiver vazio

        // Inicia o carrossel com o item do meio
        let currentIndex = Math.floor(totalItems / 2);
        
        let isDragging = false;
        let startX = 0;
        let currentTranslate = 0;
        let prevTranslate = 0;

        // Função para criar os indicadores (bolinhas)
        function createIndicators() {
            if (!indicatorsContainer) return;
            indicatorsContainer.innerHTML = ''; // Limpa indicadores antigos
            for (let i = 0; i < totalItems; i++) {
                const indicator = document.createElement('div');
                indicator.classList.add('carousel-indicator');
                indicator.addEventListener('click', () => moveToIndex(i));
                indicatorsContainer.appendChild(indicator);
            }
        }

        // Função para atualizar qual indicador está ativo
        function updateIndicators() {
            if (!indicatorsContainer) return;
            const indicators = indicatorsContainer.querySelectorAll('.carousel-indicator');
            indicators.forEach((indicator, idx) => {
                indicator.classList.toggle('carousel-indicator-active', idx === currentIndex);
            });
        }

        // Função para mover o carrossel para um índice específico
        function moveToIndex(index) {
            currentIndex = Math.max(0, Math.min(index, totalItems - 1));

            const item = items[currentIndex];
            if (!item) return;

            const itemWidth = item.offsetWidth;
            const containerWidth = container.offsetWidth;
            const gap = parseFloat(getComputedStyle(slide).gap) || 0;
            const offset = (containerWidth / 2) - (itemWidth / 2) - (currentIndex * (itemWidth + gap));
            
            slide.style.transform = `translateX(${offset}px)`;
            prevTranslate = offset; // Armazena a posição final

            items.forEach((item, i) => {
                item.classList.toggle('active-item', i === currentIndex);
            });

            updateIndicators();
        }

        // --- EVENT LISTENERS ---

        if (prevBtn && nextBtn) {
            prevBtn.addEventListener('click', () => {
                moveToIndex(currentIndex - 1);
            });

            nextBtn.addEventListener('click', () => {
                moveToIndex(currentIndex + 1);
            });
        }

        // LÓGICA DE ARRASTAR (MOUSE E TOUCH)
        slide.addEventListener('mousedown', dragStart);
        slide.addEventListener('touchstart', dragStart, { passive: true });

        slide.addEventListener('mouseup', dragEnd);
        slide.addEventListener('mouseleave', dragEnd);
        slide.addEventListener('touchend', dragEnd);

        slide.addEventListener('mousemove', drag);
        slide.addEventListener('touchmove', drag, { passive: true });

        function dragStart(event) {
            isDragging = true;
            startX = event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
            slide.style.transition = 'none'; // Remove transição durante o arrastar
            slide.style.cursor = 'grabbing';
        }

        function drag(event) {
            if (!isDragging) return;
            const currentPosition = event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
            currentTranslate = prevTranslate + currentPosition - startX;
            slide.style.transform = `translateX(${currentTranslate}px)`;
        }

        function dragEnd(event) {
            if (!isDragging) return;
            isDragging = false;
            slide.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)';
            slide.style.cursor = 'grab';

            const movedBy = currentTranslate - prevTranslate;
            const threshold = 50; // Distância mínima para mudar de slide

            if (movedBy < -threshold && currentIndex < totalItems - 1) {
                moveToIndex(currentIndex + 1);
            } else if (movedBy > threshold && currentIndex > 0) {
                moveToIndex(currentIndex - 1);
            } else {
                moveToIndex(currentIndex); // Volta para o slide atual se não arrastar o suficiente
            }
        }

        // Previne o comportamento padrão de arrastar imagem no navegador
        slide.addEventListener('dragstart', (e) => e.preventDefault());

        // Configuração inicial e reajuste no redimensionamento da janela
        function setupCarousel() {
            createIndicators();
            // Move para o índice atual (que pode ser o do meio na primeira carga)
            moveToIndex(currentIndex);
        }

        window.addEventListener('resize', setupCarousel);
        setupCarousel(); // Primeira execução

        // --- LÓGICA PARA PREVENIR CLIQUE ACIDENTAL AO ARRASTAR ---
        const clickableLinks = wrapper.querySelectorAll('a');
        clickableLinks.forEach(link => {
            let clickTimer = null;
            let isClickValid = false;

            link.addEventListener('click', (e) => {
                // Se o clique não for válido (porque foi um arraste), previne a ação.
                if (!isClickValid) {
                    e.preventDefault();
                }
            });

            link.addEventListener('mousedown', () => {
                // Quando o mouse é pressionado, consideramos o clique potencialmente válido.
                isClickValid = true;
            });

            link.addEventListener('mousemove', () => {
                // Se o mouse se mover, significa que é um arraste, então o clique não é válido.
                isClickValid = false;
            });

            // Adiciona o listener de duplo clique para abrir o link
            link.addEventListener('dblclick', (e) => {
                e.preventDefault(); // Previne qualquer comportamento padrão residual
                const url = link.href;
                if (url) {
                    // Abre o link em uma nova aba
                    window.open(url, link.target || '_blank');
                }
            });
        });

    } // Fim do loop 'for (const wrapper of allCarouselWrappers)'

    // --- LÓGICA DO FORMULÁRIO DE CONTATO (permanece a mesma) ---
    emailjs.init('nRFCdVlUADZocJb5U');

    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); 
            
            const submitButton = this.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;
            submitButton.textContent = 'Enviando...';
            submitButton.disabled = true;

            emailjs.sendForm('service_fu1jrxm', 'template_vn7yr0l', this).then(() => {
                alert('Mensagem enviada com sucesso!');
                submitButton.textContent = originalButtonText;
                submitButton.disabled = false;
                contactForm.reset(); 
            }, (error) => {
                alert('Ocorreu um erro ao enviar a mensagem. Tente novamente.');
                console.log('FAILED...', error);
                submitButton.textContent = originalButtonText;
                submitButton.disabled = false;
            });
        });
    }
});