document.addEventListener("DOMContentLoaded", function () {
    const cards = document.querySelectorAll(".cartao-imovel");
    const link = "https://www.google.com/maps/place/Instituto+de+Ci%C3%AAncias+Exatas+e+Aplicadas+-+ICEA%2FUFOP/@-19.8361918,-43.1702806,17z/data=!3m1!4b1!4m6!3m5!1s0xa507511efdbbd3:0x55a7ef3c198b9753!8m2!3d-19.8361918!4d-43.1677057!16s%2Fg%2F1tf172_b?entry=ttu&g_ep=EgoyMDI1MDcwOC4wIKXMDSoASAFQAw%3D%3D";

    cards.forEach(card => {
        card.style.cursor = "pointer";
        // Altera o evento de "click" para "dblclick"
        card.addEventListener("dblclick", function () {
            window.open(link, "_blank");
        });
    });
});
