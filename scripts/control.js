/* Script com a lógica de controle da landing page */

// Seleciona TODOS os 'wrappers' de carrossel da página:
const allCarouselWrappers = document.querySelectorAll('.carousel-wrapper');

// Itera sobre cada wraper encontrado:
for(const wrapper of allCarouselWrappers) {
    // Encontra os elementos específicos dentro do wrapper atual:
    const carouselContainer = wrapper.querySelector('.carousel-container');
    const indicators = carouselContainer.querySelectorAll('.carousel-indicator');
    const slide = wrapper.querySelector('.carousel-slide');
    const items = wrapper.querySelectorAll('.carousel-item');
    const prevBtn = wrapper.querySelector('.carousel-prev');
    const nextBtn = wrapper.querySelector('.carousel-next');
    
    // Define os estados iniciais de cada carrossel:
    let currentIndex = 0;
    const itemCount = items.length;
    //let isWheeling = false;

    function moveToSlide(index) {
        slide.style.transform = `translateX(-${index * (100 / itemCount)}%)`;
        for (const indicator of indicators) {
            indicator.classList.remove('carousel-indicator-active');
        }
        indicators[index].classList.add('carousel-indicator-active');
    }

    // Adiciona um "Event Listener" para o clique no botão "Próximo":
    nextBtn.addEventListener('click', () => {
        if (currentIndex >= itemCount - 1) {
            currentIndex = 0;
        } else {
            currentIndex++;
        }
        moveToSlide(currentIndex);
    });

    // Adiciona um "Event Listener" para o clique no botão "Anterior":
    prevBtn.addEventListener('click', () => {
        if (currentIndex <= 0) {
            currentIndex = itemCount - 1;
        } else {
            currentIndex--;
        }
        moveToSlide(currentIndex);
    });

    // Adiciona um "Event Listener" para a rolagem do mouse (scroll):
    /*carouselContainer.addEventListener('wheel', (event) => {
        // Prevene o comportamento padrão do scroll (rolar a página inteira):
        event.preventDefault();

        // Se uma animação já estiver em andamento, impede o scroll ("throttling"):
        if (isWheeling) {
            return;
        }

        // Lógica para ir para avançar ou retroceder o slide:
        if (event.deltaY > 0) {
            // Scroll para baixo -> Próximo slide:
            if (currentIndex >= itemCount - 1) {
                currentIndex = 0;
            } else {
                currentIndex++;
            }
        } else {
            // Scroll para cima -> Slide anterior:
            if (currentIndex <= 0) {
                currentIndex = itemCount - 1;
            } else {
                currentIndex--;
            }
        }
        
        // Move o slide e ativa o "throttling":
        moveToSlide(currentIndex);
        isWheeling = true;

        // Reseta o "throttling" após a animação terminar:
        // O tempo (700ms) deve ser igual à duração da transição no CSS.
        setTimeout(() => {
            isWheeling = false;
        }, 700); 
    }); */

    // Inicializa o carrossel movendo para o primeiro slide:
    moveToSlide(0);
}

//Função para enviar e-mail:
document.addEventListener('DOMContentLoaded', function() {
    
    emailjs.init('nRFCdVlUADZocJb5U');

    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); 
            
            const submitButton = this.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;
            submitButton.textContent = 'Enviando...';
            submitButton.disabled = true;

            
            emailjs.sendForm('service_fu1jrxm', 'template_vn7yr0l', this)
                .then(() => {
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
