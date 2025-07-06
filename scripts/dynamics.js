// 1. Selecionar os elementos do DOM
const carouselContainer = document.querySelector('.carousel-container');
const slide = document.querySelector('.carousel-slide');
const items = document.querySelectorAll('.depoimento'); 
//const prevBtn = document.querySelector('#prevBtn');
//const nextBtn = document.querySelector('#nextBtn');

// 2. Definir estado inicial
let currentIndex = 0;
const itemCount = items.length;
let isWheeling = false;

// Função para mover o slide
function moveToSlide(index) {
    slide.style.transform = `translateX(-${index * (100 / itemCount)}%)`;
}

carouselContainer.addEventListener('wheel', (event) => {
    // 1. Prevenir o comportamento padrão do scroll (rolar a página inteira)
    event.preventDefault();

    // 2. Implementar "throttling" para evitar disparos múltiplos e rápidos
    if (isWheeling) {
        return; // Se uma animação já está em andamento, não faça nada
    }

    // Lógica para ir para o próximo ou anterior
    if (event.deltaY > 0) {
        // Scroll para baixo -> Próximo slide
        if (currentIndex >= itemCount - 1) {
            currentIndex = 0;
        } else {
            currentIndex++;
        }
    } else {
        // Scroll para cima -> Slide anterior
        if (currentIndex <= 0) {
            currentIndex = itemCount - 1;
        } else {
            currentIndex--;
        }
    }
    
    // Move para o slide e ativa o "throttling"
    moveToSlide(currentIndex);
    isWheeling = true;

    // 3. Resetar o "throttling" após a animação terminar
    // O tempo (500ms) deve ser igual à duração da transição no CSS
    setTimeout(() => {
        isWheeling = false;
    }, 700); 
});

moveToSlide(0);

// 3. Adicionar "Event Listeners" para os botões

// Botão "Próximo"
/*nextBtn.addEventListener('click', () => {
    if (currentIndex >= itemCount - 1) {
        currentIndex = 0;
    } else {
        currentIndex++;
    }
    moveToSlide(currentIndex);
});*/

// Botão "Anterior"
/*prevBtn.addEventListener('click', () => {
    if (currentIndex <= 0) {
        currentIndex = itemCount - 1;
    } else {
        currentIndex--;
    }
    moveToSlide(currentIndex);
});*/