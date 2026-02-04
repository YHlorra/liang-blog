/**
 * 凉的博客 - 交互脚本
 */

(function() {
    'use strict';
    
    /* ============================================
       Theme Toggle
       ============================================ */
    
    const themeToggle = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;
    
    // Check for saved theme preference or system preference
    function getTheme() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            return savedTheme;
        }
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    
    // Apply theme
    function applyTheme(theme) {
        htmlElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }
    
    // Initialize theme
    applyTheme(getTheme());
    
    // Theme toggle button
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            applyTheme(newTheme);
        });
    }
    
    /* ============================================
       Scroll Reveal Animation
       ============================================ */
    
    function initScrollReveal() {
        const reveals = document.querySelectorAll('.reveal, .article-card, .stat-item');
        
        if (!reveals.length) return;
        
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        
        const revealOnScroll = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    revealOnScroll.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        reveals.forEach(element => {
            element.classList.add('reveal');
            revealOnScroll.observe(element);
        });
    }
    
    /* ============================================
       Navigation Scroll Effect
       ============================================ */
    
    function initNavScroll() {
        const nav = document.querySelector('.nav');
        if (!nav) return;
        
        let lastScroll = 0;
        
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 50) {
                nav.classList.add('nav-scrolled');
            } else {
                nav.classList.remove('nav-scrolled');
            }
            
            lastScroll = currentScroll;
        }, { passive: true });
    }
    
    /* ============================================
       Smooth Scroll for Anchor Links
       ============================================ */
    
    function initSmoothScroll() {
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
    }
    
    /* ============================================
       Article Card Interactions
       ============================================ */
    
    function initArticleCards() {
        const cards = document.querySelectorAll('.article-card');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-4px)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        });
    }
    
    /* ============================================
       Reading Time Estimation
       ============================================ */
    
    function estimateReadingTime() {
        const articles = document.querySelectorAll('.article-card');
        
        articles.forEach(article => {
            const excerpt = article.querySelector('.card-excerpt');
            if (excerpt) {
                const text = excerpt.textContent;
                const words = text.split(/\s+/).length;
                const minutes = Math.ceil(words / 200); // Average reading speed
                
                const readTime = article.querySelector('.read-time');
                if (readTime) {
                    readTime.textContent = `${minutes} min read`;
                }
            }
        });
    }
    
    /* ============================================
       Active Navigation Link
       ============================================ */
    
    function initActiveNavLink() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPage || (currentPage === '' && href === 'index.html')) {
                link.classList.add('active');
            }
        });
    }
    
    /* ============================================
       Initialize All
       ============================================ */
    
    function init() {
        initScrollReveal();
        initNavScroll();
        initSmoothScroll();
        initArticleCards();
        estimateReadingTime();
        initActiveNavLink();
        
        console.log('🌙 凉的博客已加载');
        console.log('🧊 设计: 冰与观察者');
    }
    
    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
})();
