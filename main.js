// Aguarda o DOM (estrutura HTML) estar completamente carregado
document.addEventListener('DOMContentLoaded', function() {
            
    // ============================================
    // ATIVA OS ÍCONES (Lucide)
    // Deve rodar o mais cedo possível
    // ============================================
    if (typeof lucide !== 'undefined') {
        try {
            lucide.createIcons();
        } catch (error) {
            console.error("Erro ao criar ícones Lucide:", error);
        }
    }

    // ============================================
    // Menu Mobile Toggle
    // ============================================
    const menuToggle = document.getElementById('menu-toggle');
    const menuMobile = document.getElementById('menu-mobile');
    const navLinks = document.querySelectorAll('.nav-link');

    if (menuToggle && menuMobile) {
        // Alterna a visibilidade do menu ao clicar no botão
        menuToggle.addEventListener('click', () => {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            menuMobile.classList.toggle('hidden');
        });

        // Fecha o menu ao clicar em um link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.setAttribute('aria-expanded', 'false');
                menuMobile.classList.add('hidden');
            });
        });
    }

    // ============================================
    // Carrossel de Imagens (Galeria)
    // ============================================
    const carouselContainer = document.getElementById('carousel-container');
    if (carouselContainer) {
        const slides = carouselContainer.querySelectorAll('.carousel-slide');
        const prevBtn = document.getElementById('prev-slide');
        const nextBtn = document.getElementById('next-slide');
        const dotsContainer = document.getElementById('carousel-dots');
        
        let currentIndex = 0;
        let slideInterval;

        // Cria os pontos de navegação dinamicamente
        slides.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.classList.add('w-3', 'h-3', 'rounded-full', 'bg-gray-500', 'hover:bg-brand-accent', 'transition-colors');
            dot.setAttribute('aria-label', `Ir para slide ${index + 1}`);
            dot.addEventListener('click', () => {
                showSlide(index);
                resetInterval();
            });
            dotsContainer.appendChild(dot);
        });

        const dots = dotsContainer.querySelectorAll('button');

        function showSlide(index) {
            // Garante que o índice seja cíclico
            currentIndex = (index + slides.length) % slides.length;
            
            slides.forEach((slide, i) => {
                slide.classList.add('hidden');
                dots[i].classList.remove('bg-brand-accent');
                dots[i].classList.add('bg-gray-500');
            });
            
            slides[currentIndex].classList.remove('hidden');
            dots[currentIndex].classList.add('bg-brand-accent');
            dots[currentIndex].classList.remove('bg-gray-500');
        }

        function nextSlide() {
            showSlide(currentIndex + 1);
        }

        function prevSlide() {
            showSlide(currentIndex - 1);
        }

        function startInterval() {
            slideInterval = setInterval(nextSlide, 5000); // Muda a cada 5 segundos
        }

        function resetInterval() {
            clearInterval(slideInterval);
            startInterval();
        }

        // Event Listeners dos botões
        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetInterval();
        });

        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetInterval();
        });

        // Inicia o carrossel
        showSlide(0);
        startInterval();
    }

    // ============================================
    // Atualiza o ano no rodapé
    // ============================================
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // ============================================
    // Fundo do Header ao Rolar
    // ============================================
    const navbar = document.getElementById('navbar');
    if(navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('bg-brand-primary', 'shadow-lg');
            } else {
                navbar.classList.remove('bg-brand-primary', 'shadow-lg');
            }
        });
    }
});

// Aguarda TODOS os recursos (imagens, etc.) carregarem
window.addEventListener('load', () => {
    // ============================================
    // Esconde a Animação de Loading
    // ============================================
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        // Remove o preloader do DOM após a transição
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500); // Deve bater com a duração da transição no CSS
    }
    // Libera o scroll da página
    document.body.classList.remove('loading');
});