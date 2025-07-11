document.addEventListener('DOMContentLoaded', () => {
    const rolagem = document.querySelector('.rolagem-horizontal');
    if (!rolagem) return;

    let isDown = false;
    let startX;
    let scrollLeft;

    // Clona os cartões para criar efeito infinito
    function duplicarConteudo() {
        rolagem.innerHTML += rolagem.innerHTML;
    }
    duplicarConteudo();

    rolagem.addEventListener('mousedown', (e) => {
        isDown = true;
        rolagem.classList.add('ativo');
        startX = e.pageX - rolagem.offsetLeft;
        scrollLeft = rolagem.scrollLeft;
    });

    rolagem.addEventListener('mouseleave', () => {
        isDown = false;
        rolagem.classList.remove('ativo');
    });

    rolagem.addEventListener('mouseup', () => {
        isDown = false;
        rolagem.classList.remove('ativo');
    });

    rolagem.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - rolagem.offsetLeft;
        const walk = (x - startX) * 2; // multiplicador → sensibilidade
        rolagem.scrollLeft = scrollLeft - walk;

        // Lógica de loop infinito:
        if (rolagem.scrollLeft >= rolagem.scrollWidth / 2) {
            rolagem.scrollLeft = 0;
        } else if (rolagem.scrollLeft <= 0) {
            rolagem.scrollLeft = rolagem.scrollWidth / 2;
        }
    });
});
