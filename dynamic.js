
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