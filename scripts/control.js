/* Script com a lógica de controle da landing page */

// Espera o DOM estar completamente carregado antes de executar o script:
document.addEventListener('DOMContentLoaded', () => {
    // Seleciona TODOS os wrappers de carrossel da página:
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
<<<<<<< HEAD
        if (totalItems === 0) continue; // Pula para o próximo se o carrossel estiver vazio

        // Inicia o carrossel com o item do meio
        let currentIndex = Math.floor(totalItems / 2);
=======
        if (totalItems === 0) continue; 

        let currentIndex = 0;
        let itemsPerView = 3; // Valor padrão
>>>>>>> main
        
        let isDragging = false;
        let startX = 0;
        let currentTranslate = 0;
        let prevTranslate = 0;

<<<<<<< HEAD
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
=======
        
        function updateItemsPerView() {
            const fixedItemsPerView = parseInt(wrapper.dataset.itemsPerView, 10);

            if (!isNaN(fixedItemsPerView) && fixedItemsPerView > 0) {
                itemsPerView = fixedItemsPerView;
            } else {
                const width = window.innerWidth;
                if (width < 769) { // <-- ATUALIZADO para corresponder ao CSS
                    itemsPerView = 1;
                } else if (width < 1081) { // <-- ATUALIZADO para corresponder ao CSS
                    itemsPerView = 2;
                } else {
                    itemsPerView = 3;
                }
            }
        }


        // Função para criar os indicadores (bolinhas)
        function createIndicators() {
            if (!indicatorsContainer) return;
            indicatorsContainer.innerHTML = ''; 
            const numPages = Math.ceil(totalItems / itemsPerView);
            for (let i = 0; i < numPages; i++) {
                const indicator = document.createElement('div');
                indicator.classList.add('carousel-indicator');
                indicator.addEventListener('click', () => moveToIndex(i * itemsPerView));
                indicatorsContainer.appendChild(indicator);
            }
        }

        // Função para atualizar qual indicador está ativo
        function updateIndicators() {
            if (!indicatorsContainer) return;
            const indicators = indicatorsContainer.querySelectorAll('.carousel-indicator');
            const currentPage = Math.floor(currentIndex / itemsPerView);
            indicators.forEach((indicator, idx) => {
                indicator.classList.toggle('carousel-indicator-active', idx === currentPage);
            });
        }

        // Função para mover o carrossel para um índice específico
        function moveToIndex(index) {
            // Garante que o índice não saia dos limites
            currentIndex = Math.max(0, Math.min(index, totalItems - itemsPerView));
            
            const itemWidth = items[0].offsetWidth;
            const gap = parseFloat(getComputedStyle(slide).gap) || 0;
            const offset = -currentIndex * (itemWidth + gap);
            
            slide.style.transform = `translateX(${offset}px)`;
            prevTranslate = offset; 
>>>>>>> main

            updateIndicators();
        }

        // --- EVENT LISTENERS ---

        if (prevBtn && nextBtn) {
            prevBtn.addEventListener('click', () => {
<<<<<<< HEAD
                moveToIndex(currentIndex - 1);
            });

            nextBtn.addEventListener('click', () => {
                moveToIndex(currentIndex + 1);
=======
                moveToIndex(currentIndex - itemsPerView);
            });

            nextBtn.addEventListener('click', () => {
                moveToIndex(currentIndex + itemsPerView);
>>>>>>> main
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
<<<<<<< HEAD
            slide.style.transition = 'none'; // Remove transição durante o arrastar
=======
            slide.style.transition = 'none'; 
>>>>>>> main
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
<<<<<<< HEAD
            const threshold = 50; // Distância mínima para mudar de slide

            if (movedBy < -threshold && currentIndex < totalItems - 1) {
                moveToIndex(currentIndex + 1);
            } else if (movedBy > threshold && currentIndex > 0) {
                moveToIndex(currentIndex - 1);
            } else {
                moveToIndex(currentIndex); // Volta para o slide atual se não arrastar o suficiente
=======
            const threshold = 100; // Aumenta o threshold para evitar mudanças acidentais

            if (movedBy < -threshold) {
                moveToIndex(currentIndex + itemsPerView);
            } else if (movedBy > threshold) {
                moveToIndex(currentIndex - itemsPerView);
            } else {
                moveToIndex(currentIndex); 
>>>>>>> main
            }
        }

        // Previne o comportamento padrão de arrastar imagem no navegador
        slide.addEventListener('dragstart', (e) => e.preventDefault());

        // Configuração inicial e reajuste no redimensionamento da janela
        function setupCarousel() {
<<<<<<< HEAD
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
=======
            updateItemsPerView();
            createIndicators();
            moveToIndex(0); // Sempre começa do primeiro item
        }

        window.addEventListener('resize', setupCarousel);
        setupCarousel(); 

        // --- LÓGICA PARA PREVENIR CLIQUE ACIDENTAL AO ARRASTAR ---
        const clickableLinks = wrapper.querySelectorAll('a');
        clickableLinks.forEach(link => {
            let isClickValid = false;

            link.addEventListener('click', (e) => {
                if (!isClickValid) {
                    e.preventDefault();
                }
            });

            link.addEventListener('mousedown', () => {
                isClickValid = true;
            });

            link.addEventListener('mousemove', () => {
                isClickValid = false;
            });

            // Adiciona o listener de duplo clique para abrir o link
            link.addEventListener('dblclick', (e) => {
                e.preventDefault(); 
                const url = link.href;
                if (url) {
                    window.open(url, link.target || '_blank');
                }
            });
        });
    } 

    // --- LÓGICA DO FORMULÁRIO DE CONTATO  ---
>>>>>>> main
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