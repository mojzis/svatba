/**
 * Wedding Website - Main JavaScript
 * Anežka & Adam - 23. května 2026
 */

// ===================================
// Smooth Scroll Enhancement
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    // Enhanced smooth scroll for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');

            // Skip if it's just "#"
            if (href === '#') {
                e.preventDefault();
                return;
            }

            const target = document.querySelector(href);

            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Scroll indicator - hide after scroll
    const scrollIndicator = document.querySelector('.scroll-indicator');
    let hasScrolled = false;

    window.addEventListener('scroll', () => {
        if (!hasScrolled && window.scrollY > 100) {
            hasScrolled = true;
            if (scrollIndicator) {
                scrollIndicator.style.opacity = '0';
                scrollIndicator.style.transition = 'opacity 0.5s ease';
            }
        }
    });

    // ===================================
    // Scroll Animations
    // ===================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe sections for fade-in animations
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('fade-in-section');
        observer.observe(section);
    });

    // ===================================
    // Animation Placeholders
    // ===================================

    /**
     * Placeholder for future illustration animations
     * These will be activated when illustration elements are added
     */
    const decorationElements = document.querySelectorAll('.decoration-element');

    // Example: Parallax effect on decoration elements
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;

        decorationElements.forEach((element, index) => {
            // Different speeds for each element
            const speed = 0.1 + (index * 0.05);
            const yPos = -(scrolled * speed);

            // This will be more useful when actual images are added
            // element.style.transform = `translateY(${yPos}px)`;
        });
    });

    /**
     * Placeholder for future hero illustration animation
     * This could animate SVG paths or individual illustration elements
     */
    const initHeroAnimations = () => {
        // TODO: Add illustration element animations
        // Examples:
        // - Stagger fade-in of illustration elements
        // - Subtle floating/bobbing animations
        // - Path drawing animations for SVG elements

        console.log('Hero animation placeholders ready');
    };

    // ===================================
    // Dynamic Date Countdown (Optional)
    // ===================================
    const weddingDate = new Date('2026-05-23T10:00:00');

    const updateCountdown = () => {
        const now = new Date();
        const diff = weddingDate - now;

        if (diff > 0) {
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

            // This can be displayed somewhere if needed
            // console.log(`${days} days, ${hours} hours until the wedding!`);
        }
    };

    // Update countdown every hour
    updateCountdown();
    setInterval(updateCountdown, 1000 * 60 * 60);

    // ===================================
    // Image Lazy Loading Enhancement
    // ===================================
    const lazyLoadImages = () => {
        const images = document.querySelectorAll('img[data-src]');

        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    };

    lazyLoadImages();

    // ===================================
    // News Section - Highlight Latest
    // ===================================
    const highlightLatestNews = () => {
        const newsItems = document.querySelectorAll('.news-item');
        if (newsItems.length > 0) {
            // The first item is already marked as highlighted in HTML
            // This could be made dynamic if news items are loaded dynamically
        }
    };

    highlightLatestNews();

    // ===================================
    // Initialize
    // ===================================
    initHeroAnimations();

    // Log ready state
    console.log('Wedding website initialized ❤️');
});

// ===================================
// Add CSS for fade-in animations
// ===================================
const style = document.createElement('style');
style.textContent = `
    .fade-in-section {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }

    .fade-in-section.visible {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);
