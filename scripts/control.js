/* Script com a lógica de controle da landing page */

// Espera o DOM estar completamente carregado antes de executar o script:
document.addEventListener('DOMContentLoaded', () => {
    // Seleciona TODOS os 'wrappers' de carrossel da página:
    const allCarouselWrappers = document.querySelectorAll('.carousel-wrapper');

    for (const wrapper of allCarouselWrappers) {
        
        // Encontra os elementos específicos dentro do wrapper atual:
        const slide = wrapper.querySelector('.carousel-slide');
        const items = wrapper.querySelectorAll('.carousel-item');
        const prevBtn = wrapper.querySelector('.carousel-prev');
        const nextBtn = wrapper.querySelector('.carousel-next');
        const indicators = wrapper.querySelectorAll('.carousel-indicator');

        // Define os estados iniciais de cada carrossel:
        const totalItems = items.length;
        let itemsPerView;
        let totalSteps;
        let currentStep = 0;
        //let isWheeling = false;
        let isMobile = false;
        let isDragging = false;
        let startX = 0;
        let endX = 0;

        // Configura o carrossel:
        function setupCarousel() {
            // Verifica se a tela é mobile
            isMobile = window.innerWidth <= 768;

            // Define quantos itens por vez com base no tamanho da tela:
            if (isMobile) {
                itemsPerView = 1;
            } else {
                // No desktop, usa o data-attribute ou o padrão 1:
                itemsPerView = parseInt(wrapper.dataset.itemsPerView, 10) || 1;
            }
            
            // Recalcula o número total de passos:
            totalSteps = Math.ceil(totalItems / itemsPerView);
            
            // Garante que o passo atual não seja inválido após o redimensionamento:
            if (currentStep >= totalSteps) {
                currentStep = totalSteps - 1;
            }

            const itemWidth = 100 / itemsPerView;
            slide.style.width = `${itemWidth * totalItems}%`;
            
            for (const item of items) {
                item.style.width = `${100 / totalItems}%`;
            }

            // Define a visibilidade dos botões de navegação:
            if (isMobile) {
                prevBtn.style.display = 'none';
                nextBtn.style.display = 'none';
            } else {
                prevBtn.style.display = 'flex';
                nextBtn.style.display = 'flex';
            }
            moveToStep(currentStep);
        }

        // Calcula o deslocamento. Cada passo e move o trilho pelo tamanho de uma "página" (100% do contêiner):
        function moveToStep(step) {
            const newTransform = -step * (itemsPerView * (100 / totalItems));
            console.log(`Moving to step ${step}, transform: ${newTransform}%`);
            slide.style.transform = `translateX(${newTransform}%)`;
            for (const indicator of indicators) {
                indicator.classList.remove('carousel-indicator-active');
            }
            indicators[(step%3)].classList.add('carousel-indicator-active');
        }

        if (prevBtn && nextBtn) {
            // Adiciona um "Event Listener" para o clique no botão "Anterior":
            prevBtn.addEventListener('click', () => {
                if (currentStep > 0) {
                    currentStep--;
                }
                else {
                    currentStep = totalSteps - 1;
                }
                moveToStep(currentStep);
            });

            // Adiciona um "Event Listener" para o clique no botão "Próximo":
            nextBtn.addEventListener('click', () => {
                if (currentStep < totalSteps - 1) {
                    currentStep++;
                }
                else {
                    currentStep = 0;
                }
                moveToStep(currentStep);
            });
        }

        // Adiciona um "Event Listener" para a rolagem do mouse (scroll):
        /*carouselContainer.addEventListener('wheel', (event) => {
            // Prevene o comportamento padrão do scroll (rolar a página inteira):
            event.preventDefault();

            // Se uma animação já estiver em andamento, impede o scroll ("throttling"):
            if (isWheeling) {
                return;
            }

            // Lógica para avançar ou retroceder os passos:
            if (event.deltaY > 0) {
                // Scroll para baixo -> Próximo slide:
                if (currentStep < totalSteps - 1) {
                    currentStep++;
                }
                else {
                    currentStep = 0;
                }
            } else {
                // Scroll para cima -> Slide anterior:
                if (currentStep > 0) {
                    currentStep--;
                }
                else {
                    currentStep = totalSteps - 1;
                }
            }
            
            // Realiza o passo e ativa o "throttling":
            moveToStep(currentStep);
            isWheeling = true;

            // Reseta o "throttling" após a animação terminar:
            // O tempo (700ms) deve ser igual à duração da transição no CSS.
            setTimeout(() => {
                isWheeling = false;
            }, 700); 
        }); */

        slide.addEventListener('touchstart', (event) => {
            startX = event.touches[0].clientX;
            isDragging = true;
            // Remove a transição suave durante o arraste para um feedback instantâneo
            slide.style.transition = 'none';
        });

        slide.addEventListener('touchmove', (event) => {
            if (!isDragging) return;
            // Calcula a distância do deslize
            const currentX = event.touches[0].clientX;
            const diffX = currentX - startX;
            
            // Move o slide em tempo real com o dedo
            const percentageToMovePerStep = 100 / totalSteps;
            const baseTransform = -currentStep * percentageToMovePerStep;
            // Converte a distância em pixels para porcentagem do slide
            const dragPercentage = (diffX / slide.offsetWidth) * 100 * totalSteps;
            
            slide.style.transform = `translateX(${baseTransform + dragPercentage}%)`;
        });

        slide.addEventListener('touchend', () =>{
            if (!isDragging) return;
            isDragging = false;
            
            // Adiciona a transição de volta para a animação suave
            slide.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)';

            const threshold = 50; // Mínimo de pixels para considerar um swipe válido
            const diff = startX - endX; // endX não foi atualizado em move, usamos startX - currentX
            
            // Calcula a diferença final do arraste
            const finalDiff = startX - (event.changedTouches[0].clientX || startX);

            if (Math.abs(finalDiff) > threshold) {
                if (finalDiff > 0) { // Deslize para a esquerda (próximo)
                    if (currentStep < totalSteps - 1) {
                        currentStep++;
                    }
                } else { // Deslize para a direita (anterior)
                    if (currentStep > 0) {
                        currentStep--;
                    }
                }
            }
            
            // Move para o slide correto (seja o novo ou o atual, se o swipe foi inválido)
            moveToStep(currentStep);
        });

        //Reconfigura o carrossel quando a janela é redimensionada:
        window.addEventListener('resize', setupCarousel);

        // Inicializa o carrossel:
        setupCarousel();
    }

    //Função para enviar e-mail:

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