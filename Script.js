/* ==========================================
   HORTIFRUTI O JOSINELES - JAVASCRIPT
   ========================================== */

document.addEventListener('DOMContentLoaded', function() {
    // ==========================================
    // HEADER SCROLL EFFECT
    // ==========================================
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // ==========================================
    // MOBILE MENU TOGGLE
    // ==========================================
    const menuToggle = document.getElementById('menuToggle');
    const nav = document.getElementById('nav');
    const navLinks = document.querySelectorAll('.nav-link');
    
    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        nav.classList.toggle('active');
    });
    
    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            nav.classList.remove('active');
            
            // Update active state
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // ==========================================
    // HERO SLIDER
    // ==========================================
    const heroSlides = document.querySelectorAll('.hero-slide');
    const heroIndicators = document.querySelectorAll('.hero-indicators .indicator');
    let currentSlide = 0;
    let slideInterval;
    
    function showSlide(index) {
        heroSlides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
        heroIndicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === index);
        });
        currentSlide = index;
    }
    
    function nextSlide() {
        const next = (currentSlide + 1) % heroSlides.length;
        showSlide(next);
    }
    
    function startSlider() {
        slideInterval = setInterval(nextSlide, 5000);
    }
    
    function stopSlider() {
        clearInterval(slideInterval);
    }
    
    // Start auto-sliding
    startSlider();
    
    // Indicator clicks
    heroIndicators.forEach((indicator, index) => {
        indicator.addEventListener('click', function() {
            stopSlider();
            showSlide(index);
            startSlider();
        });
    });

    // ==========================================
    // QUOTES CAROUSEL
    // ==========================================
    const quoteCards = document.querySelectorAll('.quote-card');
    const quoteIndicators = document.querySelectorAll('.quote-indicator');
    let currentQuote = 0;
    let quoteInterval;
    
    function showQuote(index) {
        quoteCards.forEach((card, i) => {
            card.classList.toggle('active', i === index);
        });
        quoteIndicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === index);
        });
        currentQuote = index;
    }
    
    function nextQuote() {
        const next = (currentQuote + 1) % quoteCards.length;
        showQuote(next);
    }
    
    function startQuoteCarousel() {
        quoteInterval = setInterval(nextQuote, 4000);
    }
    
    function stopQuoteCarousel() {
        clearInterval(quoteInterval);
    }
    
    // Start auto-sliding quotes
    startQuoteCarousel();
    
    // Quote indicator clicks
    quoteIndicators.forEach((indicator, index) => {
        indicator.addEventListener('click', function() {
            stopQuoteCarousel();
            showQuote(index);
            startQuoteCarousel();
        });
    });

    // ==========================================
    // PRODUCT FILTERING
    // ==========================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');
    const searchInput = document.getElementById('searchProducts');
    
    function filterProducts(category, searchTerm = '') {
        productCards.forEach(card => {
            const cardCategory = card.dataset.category;
            const cardName = card.dataset.name.toLowerCase();
            const searchMatch = searchTerm === '' || cardName.includes(searchTerm.toLowerCase());
            const categoryMatch = category === 'todos' || cardCategory === category;
            
            if (categoryMatch && searchMatch) {
                card.classList.remove('hidden');
                // Trigger animation
                card.style.animation = 'none';
                card.offsetHeight; // Trigger reflow
                card.style.animation = 'fadeUp 0.5s ease forwards';
            } else {
                card.classList.add('hidden');
            }
        });
    }
    
    // Filter button clicks
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            const category = this.dataset.category;
            const searchTerm = searchInput.value;
            filterProducts(category, searchTerm);
        });
    });
    
    // Search input
    searchInput.addEventListener('input', function() {
        const activeFilter = document.querySelector('.filter-btn.active');
        const category = activeFilter ? activeFilter.dataset.category : 'todos';
        filterProducts(category, this.value);
    });

    // ==========================================
    // SCROLL ANIMATIONS
    // ==========================================
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // ==========================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ==========================================
    // NEWSLETTER FORM
    // ==========================================
    const newsletterForm = document.getElementById('newsletterForm');
    
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        
        // Simulate form submission
        const button = this.querySelector('button');
        const originalText = button.textContent;
        button.textContent = 'Cadastrado!';
        button.style.background = 'var(--primary-green)';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = '';
            this.reset();
        }, 2000);
        
        // Here you would typically send the email to your server
        console.log('Email cadastrado:', email);
    });

    // ==========================================
    // ACTIVE NAV LINK ON SCROLL
    // ==========================================
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // ==========================================
    // LAZY LOADING ENHANCEMENT
    // ==========================================
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    if ('loading' in HTMLImageElement.prototype) {
        // Browser supports native lazy loading
        lazyImages.forEach(img => {
            img.src = img.src;
        });
    } else {
        // Fallback for older browsers
        const lazyObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    lazyObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => {
            lazyObserver.observe(img);
        });
    }

    // ==========================================
    // PRELOADER (Optional)
    // ==========================================
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });
});
