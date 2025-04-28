// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navbar = document.querySelector('.navbar');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            if (window.innerWidth <= 768) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            }
        }
    });
});

// Form Submission with Animation
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Add loading animation
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitButton.disabled = true;

        // Simulate form submission (replace with actual form submission)
        setTimeout(() => {
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.innerHTML = `
                <i class="fas fa-check-circle"></i>
                <p>Thank you for your message. We will get back to you soon!</p>
            `;
            contactForm.appendChild(successMessage);

            // Reset form
            contactForm.reset();
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;

            // Remove success message after 3 seconds
            setTimeout(() => {
                successMessage.remove();
            }, 3000);
        }, 1500);
    });
}

// Scroll to Top Button
const scrollButton = document.createElement('button');
scrollButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollButton.className = 'scroll-top';
document.body.appendChild(scrollButton);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollButton.style.display = 'block';
        setTimeout(() => {
            scrollButton.style.opacity = '1';
        }, 10);
    } else {
        scrollButton.style.opacity = '0';
        setTimeout(() => {
            scrollButton.style.display = 'none';
        }, 300);
    }
});

scrollButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.animate-on-scroll, .mission-card, .expertise-item, .feature, .stat-item, .team-feature, .contact-card').forEach(el => {
    observer.observe(el);
});

// Parallax Effect for Hero Section
const hero = document.querySelector('.hero');
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
});

// Add loading animation to images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('load', () => {
        img.classList.add('loaded');
    });
});

// Initialize animations on page load
document.addEventListener('DOMContentLoaded', () => {
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
}); 