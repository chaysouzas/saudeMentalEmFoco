document.addEventListener('DOMContentLoaded', () => {
    const menu = document.querySelector('.cabecalho__menu-lista');
    const btn = document.querySelector('.cabecalho__menu-hamburguer');

    // Estado inicial do menu
    Object.assign(menu.style, {
        opacity: '0',
        visibility: 'hidden',
        transition: 'opacity 0.3s ease'
    });

    // Alternar menu ao clicar no botão
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const menuFechado = menu.style.visibility === 'hidden';
        Object.assign(menu.style, {
            visibility: menuFechado ? 'visible' : 'hidden',
            opacity: menuFechado ? '1' : '0'
        });
    });

    // Fechar menu ao clicar fora
    document.addEventListener('click', () => {
        Object.assign(menu.style, { opacity: '0', visibility: 'hidden' });
    });

    // Impedir fechamento ao clicar no menu
    menu.addEventListener('click', (e) => e.stopPropagation());
});


//CARROSSEL

document.addEventListener('DOMContentLoaded', function(){    
    //array com as configurações de ambos os carrosseis 
    const carrossels = [
        { // CONF MOBILE
        container: document.querySelector('.carrossel'),
        slides: document.querySelectorAll('.carrossel__slide'),
        dots: document.querySelectorAll('.nav-dot'),
        prevBtn: document.querySelector('.carrossel__flecha.esquerda'),
        nextBtn: document.querySelector('.carrossel__flecha.direita'),
        isDesktop: false // define se é um carrossel para desktop
        },

        { // CONF TABLET/DESKTOP
        container: document.querySelector('.carrossel__container-tablet-desktop'),
        slides: document.querySelectorAll('.carrossel__tablet-desktop .carrossel__slide'),
        dots: document.querySelectorAll('.carrossel__tablet-desktop .nav-dot'),
        prevBtn: document.querySelector('.carrossel__flecha-tablet-desktop.esquerda'),
        nextBtn: document.querySelector('.carrossel__flecha-tablet-desktop.direita'),
        isDesktop: true  // define se é um carrossel para desktop
        }

    ];

    carrossels.forEach(iniciarCarrossel);

    function iniciarCarrossel(carrossel){
        let slideAtual = 0;
        const slideContador = carrossel.slides.length;
        let intervaloDeReprodução;

        function atualizarCarrossel(){
            const translateValue = carrossel.isDesktop ?
            `translateX(-${slideAtual * 100}%)` :
            `translateX(-${slideAtual * 100}%)`;

            carrossel.container.style.transform = translateValue;

            carrossel.dots.forEach((dot, index) =>{
                dot.classList.toggle('active', index === slideAtual);
            });
        }

        function irParaSlide(index){
            slideAtual = index;
            atualizarCarrossel();
            resetAutoplay();
        }

        function voltarSlide(){
            slideAtual = (slideAtual > 0) ? slideAtual - 1  : slideContador -1;
            atualizarCarrossel();
            resetAutoplay();
        }

        function proximoSlide(){
            slideAtual = (slideAtual < slideContador - 1) ? slideAtual +1 : 0; 
            atualizarCarrossel();
            resetAutoplay();
        }

        function deslizarSlide(startX, endX){
            if(endX < startX - 40){
                proximoSlide();
            } else if(endX > startX + 50){
                voltarSlide();
            }
        }

        function startAutoplay() {
            intervaloDeReprodução = setInterval(proximoSlide, carrossel.isDesktop ? 6000 : 4000);
        }

        function resetAutoplay() {
            clearInterval(intervaloDeReprodução);
            startAutoplay();
        }

        function stopAutoplay() {
            clearInterval(intervaloDeReprodução);
        }

        // Event Listeners
        carrossel.prevBtn.addEventListener('click', voltarSlide);
        carrossel.nextBtn.addEventListener('click', proximoSlide);

        carrossel.dots.forEach(dot => {
            dot.addEventListener('click', function() {
                irParaSlide(parseInt(this.getAttribute('data-index')));
            });
        });

        // Swipe para mobile
        
        if (!carrossel.isDesktop) {
            let touchStartX = 0;
            let touchEndX = 0;

            carrossel.container.addEventListener('touchstart', function(e) {
                touchStartX = e.changedTouches[0].screenX;
                stopAutoplay();
            }, { passive: true });

            carrossel.container.addEventListener('touchend', function(e) {
                touchEndX = e.changedTouches[0].screenX;
                deslizarSlide(touchStartX, touchEndX);
                startAutoplay();
            }, { passive: true });
        }

                // Pausar autoplay ao interagir
                carrossel.container.addEventListener('mouseenter', stopAutoplay);
                carrossel.container.addEventListener('mouseleave', startAutoplay);
                carrossel.container.addEventListener('focusin', stopAutoplay);
                carrossel.container.addEventListener('focusout', startAutoplay);
        
                // Iniciar autoplay
                
                atualizarCarrossel();

    }

});
