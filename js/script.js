// Mobile Navigation
class MobileNavigation {
    constructor() {
        this.hamburger = document.querySelector('.hamburger');
        this.navLinks = document.querySelector('.nav-links');
        this.navbar = document.querySelector('.navbar');
        
        if (this.hamburger && this.navLinks) {
            this.init();
        }
    }
    
    init() {
        this.hamburger.addEventListener('click', () => {
            this.hamburger.classList.toggle('active');
            this.navLinks.classList.toggle('active');
        });
    }
}

const mobileNav = new MobileNavigation();

// Navbar Scroll Effect
class NavbarScrollEffect {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.lastScrollTop = 0;
        this.isScrolling = false;
        
        if (this.navbar) {
            this.init();
        }
    }
    
    init() {
        // Throttle scroll events for performance
        window.addEventListener('scroll', this.throttledScroll.bind(this), { passive: true });
    }
    
    throttledScroll() {
        if (!this.isScrolling) {
            requestAnimationFrame(() => {
                this.handleScroll();
                this.isScrolling = false;
            });
            this.isScrolling = true;
        }
    }
    
    handleScroll() {
        if (window.scrollY > 50) {
            this.navbar.classList.add('scrolled');
        } else {
            this.navbar.classList.remove('scrolled');
        }
    }
}

const navbarEffect = new NavbarScrollEffect();

// Smooth Scrolling
class SmoothScrolling {
    constructor() {
        this.init();
    }
    
    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', this.handleClick.bind(this));
        });
    }
    
    handleClick(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            this.closeMobileMenu();
        }
    }
    
    closeMobileMenu() {
        const hamburger = document.querySelector('.hamburger');
        const navLinks = document.querySelector('.nav-links');
        if (window.innerWidth <= 768 && hamburger && navLinks) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        }
    }
}

const smoothScroll = new SmoothScrolling();

// Form Submission with Animation
class FormSubmission {
    constructor() {
        this.contactForm = document.querySelector('.contact-form form');
        if (this.contactForm) {
            this.init();
        }
    }
    
    init() {
        this.contactForm.addEventListener('submit', this.handleSubmit.bind(this));
    }
    
    handleSubmit(e) {
        e.preventDefault();
        
        const submitButton = this.contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        // Add loading animation
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitButton.disabled = true;

        // Simulate form submission (replace with actual form submission)
        setTimeout(() => {
            // Show success message
            this.showSuccessMessage();

            // Reset form
            this.contactForm.reset();
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
        }, 1500);
    }
    
    showSuccessMessage() {
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <p>Thank you for your message. We will get back to you soon!</p>
        `;
        this.contactForm.appendChild(successMessage);

        // Remove success message after 3 seconds
        setTimeout(() => {
            successMessage.remove();
        }, 3000);
    }
}

const formHandler = new FormSubmission();

// Scroll to Top Button
class ScrollToTopButton {
    constructor() {
        this.button = null;
        this.isScrolling = false;
        this.init();
    }
    
    init() {
        this.createButton();
        this.addEventListeners();
    }
    
    createButton() {
        this.button = document.createElement('button');
        this.button.innerHTML = '<i class="fas fa-arrow-up"></i>';
        this.button.className = 'scroll-top';
        document.body.appendChild(this.button);
    }
    
    addEventListeners() {
        // Throttle scroll events for performance
        window.addEventListener('scroll', this.throttledScroll.bind(this), { passive: true });
        
        this.button.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    throttledScroll() {
        if (!this.isScrolling) {
            requestAnimationFrame(() => {
                this.handleScroll();
                this.isScrolling = false;
            });
            this.isScrolling = true;
        }
    }
    
    handleScroll() {
        if (window.pageYOffset > 300) {
            this.button.style.display = 'block';
            setTimeout(() => {
                this.button.style.opacity = '1';
            }, 10);
        } else {
            this.button.style.opacity = '0';
            setTimeout(() => {
                this.button.style.display = 'none';
            }, 300);
        }
    }
}

const scrollToTopBtn = new ScrollToTopButton();

// Intersection Observer for Animations
class AnimationObserver {
    constructor() {
        this.options = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        this.observer = null;
        this.init();
    }
    
    init() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    this.observer.unobserve(entry.target);
                }
            });
        }, this.options);
        
        // Observe elements for animation
        document.querySelectorAll('.animate-on-scroll, .mission-card, .expertise-item, .feature, .stat-item, .team-feature, .contact-card').forEach(el => {
            this.observer.observe(el);
        });
    }
}

const animationObserver = new AnimationObserver();

// Parallax Effect for Hero Section
class ParallaxEffect {
    constructor() {
        this.hero = document.querySelector('.hero');
        this.isScrolling = false;
        if (this.hero) {
            this.init();
        }
    }
    
    init() {
        window.addEventListener('scroll', this.throttledScroll.bind(this), { passive: true });
    }
    
    throttledScroll() {
        if (!this.isScrolling) {
            requestAnimationFrame(() => {
                this.handleScroll();
                this.isScrolling = false;
            });
            this.isScrolling = true;
        }
    }
    
    handleScroll() {
        const scrolled = window.pageYOffset;
        this.hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
    }
}

const parallaxEffect = new ParallaxEffect();

// Add loading animation to images
class ImageLoader {
    constructor() {
        this.init();
    }
    
    init() {
        document.querySelectorAll('img').forEach(img => {
            img.addEventListener('load', () => {
                img.classList.add('loaded');
            });
        });
    }
}

const imageLoader = new ImageLoader();

// Initialize animations on page load
class PageInitializer {
    constructor() {
        document.addEventListener('DOMContentLoaded', this.init.bind(this));
    }
    
    init() {
        // Add initial animation classes
        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            el.classList.add('animate-on-scroll');
        });

        // Trigger initial animations
        setTimeout(() => {
            document.querySelectorAll('.animate-on-scroll').forEach(el => {
                el.classList.add('visible');
            });
        }, 100);
    }
}

const pageInitializer = new PageInitializer();
