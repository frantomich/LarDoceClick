/* Script com a lógica de controle da landing page */

// Espera o DOM estar completamente carregado antes de executar o script:
document.addEventListener('DOMContentLoaded', () => {
    // Seleciona TODOS os 'wrappers' de carrossel da página:
    const allCarouselWrappers = document.querySelectorAll('.carousel-wrapper');

    for (const wrapper of allCarouselWrappers) {
        // Busca o número de itens por visualização a partir do atributo 'data-items-per-view':
        const itemsPerView = parseInt(wrapper.dataset.itemsPerView, 10) || 1;

        // Encontra os elementos específicos dentro do wrapper atual:
        const slide = wrapper.querySelector('.carousel-slide');
        const items = wrapper.querySelectorAll('.carousel-item');
        const prevBtn = wrapper.querySelector('.carousel-prev');
        const nextBtn = wrapper.querySelector('.carousel-next');
        const indicators = wrapper.querySelectorAll('.carousel-indicator');

        // Define os estados iniciais de cada carrossel:
        const totalItems = items.length;
        const totalSteps = Math.ceil(totalItems / itemsPerView);
        let currentStep = 0;
        //let isWheeling = false;

        // Configura o carrossel:
        function setupCarousel() {
            const itemWidth = 100 / itemsPerView;
            slide.style.width = `${itemWidth * totalItems}%`;
            
            for (const item of items) {
                item.style.width = `${100 / totalItems}%`;
            }
        }

        // Calcula o deslocamento. Cada passo e move o trilho pelo tamanho de uma "página" (100% do contêiner):
        function moveToStep(step) {
            const newTransform = -step * (itemsPerView * (100 / totalItems));
            console.log(`Moving to step ${step}, transform: ${newTransform}%`);
            slide.style.transform = `translateX(${newTransform}%)`;
            for (const indicator of indicators) {
                indicator.classList.remove('carousel-indicator-active');
            }
            indicators[step].classList.add('carousel-indicator-active');
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

        // Inicializa o carrossel:
        setupCarousel();
        moveToStep(0);
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