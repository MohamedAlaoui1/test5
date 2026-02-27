/* ═══════════════════════════════════════════════════════════════
   DJ MOHAMED ALAOUI - Website JavaScript
   Moroccan Electronic Music Artist
   ═══════════════════════════════════════════════════════════════ */

// ─────────────────────────────────────────────────────────────────
// DOM Elements
// ─────────────────────────────────────────────────────────────────
const navbar = document.querySelector('.navbar');
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section');
const contactForm = document.getElementById('contactForm');

// ─────────────────────────────────────────────────────────────────
// Navbar Scroll Effect
// ─────────────────────────────────────────────────────────────────
function handleNavbarScroll() {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

window.addEventListener('scroll', handleNavbarScroll);

// ─────────────────────────────────────────────────────────────────
// Mobile Navigation Toggle
// ─────────────────────────────────────────────────────────────────
function toggleMobileNav() {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
}

navToggle.addEventListener('click', toggleMobileNav);

// Close mobile nav when clicking a link
navItems.forEach(item => {
    item.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            toggleMobileNav();
        }
    });
});

// ─────────────────────────────────────────────────────────────────
// Active Navigation Link on Scroll
// ─────────────────────────────────────────────────────────────────
function updateActiveNavLink() {
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${currentSection}`) {
            item.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// ─────────────────────────────────────────────────────────────────
// Smooth Scroll for Navigation Links
// ─────────────────────────────────────────────────────────────────
navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = item.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ─────────────────────────────────────────────────────────────────
// Contact Form Handling
// ─────────────────────────────────────────────────────────────────
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Simulate form submission
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = `
            <span>Sending...</span>
            <svg class="spinner" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10" stroke-dasharray="60" stroke-dashoffset="20"/>
            </svg>
        `;
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            // Show success state
            submitBtn.innerHTML = `
                <span>Message Sent!</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
            `;
            submitBtn.style.background = 'linear-gradient(135deg, #1B6B6B 0%, #2D8B8B 100%)';
            
            // Reset form
            contactForm.reset();
            
            // Reset button after delay
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
            }, 3000);
        }, 1500);
    });
}

// ─────────────────────────────────────────────────────────────────
// Scroll Reveal Animation
// ─────────────────────────────────────────────────────────────────
function revealOnScroll() {
    const reveals = document.querySelectorAll('.section-header, .about-grid, .album-card, .event-card, .gallery-item, .contact-grid');
    
    reveals.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.classList.add('revealed');
        }
    });
}

// Add CSS for reveal animation
const style = document.createElement('style');
style.textContent = `
    .section-header,
    .about-grid,
    .album-card,
    .event-card,
    .gallery-item,
    .contact-grid {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .section-header.revealed,
    .about-grid.revealed,
    .album-card.revealed,
    .event-card.revealed,
    .gallery-item.revealed,
    .contact-grid.revealed {
        opacity: 1;
        transform: translateY(0);
    }
    
    .album-card:nth-child(2) { transition-delay: 0.1s; }
    .album-card:nth-child(3) { transition-delay: 0.2s; }
    .album-card:nth-child(4) { transition-delay: 0.3s; }
    
    .event-card:nth-child(2) { transition-delay: 0.1s; }
    .event-card:nth-child(3) { transition-delay: 0.2s; }
    .event-card:nth-child(4) { transition-delay: 0.3s; }
    .event-card:nth-child(5) { transition-delay: 0.4s; }
    
    .gallery-item:nth-child(2) { transition-delay: 0.1s; }
    .gallery-item:nth-child(3) { transition-delay: 0.15s; }
    .gallery-item:nth-child(4) { transition-delay: 0.2s; }
    .gallery-item:nth-child(5) { transition-delay: 0.25s; }
    .gallery-item:nth-child(6) { transition-delay: 0.3s; }
    
    .spinner {
        animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// ─────────────────────────────────────────────────────────────────
// Vinyl Interaction (Pause on Hover)
// ─────────────────────────────────────────────────────────────────
const vinyl = document.querySelector('.vinyl');

if (vinyl) {
    vinyl.addEventListener('mouseenter', () => {
        vinyl.style.animationPlayState = 'paused';
    });
    
    vinyl.addEventListener('mouseleave', () => {
        vinyl.style.animationPlayState = 'running';
    });
}

// ─────────────────────────────────────────────────────────────────
// Play Button Interaction (Visual Feedback)
// ─────────────────────────────────────────────────────────────────
const playButtons = document.querySelectorAll('.play-btn');

playButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Visual feedback
        btn.style.transform = 'scale(0.9)';
        setTimeout(() => {
            btn.style.transform = 'scale(1)';
        }, 150);
        
        // Get album name for potential audio integration
        const albumCard = btn.closest('.album-card');
        const albumTitle = albumCard.querySelector('.album-title')?.textContent;
        
        console.log(`Playing: ${albumTitle}`);
        // Here you would integrate with an audio player or streaming service
    });
});

// ─────────────────────────────────────────────────────────────────
// Parallax Effect for Background Orbs
// ─────────────────────────────────────────────────────────────────
function parallaxOrbs() {
    const orbs = document.querySelectorAll('.orb');
    const scrollY = window.scrollY;
    
    orbs.forEach((orb, index) => {
        const speed = (index + 1) * 0.05;
        orb.style.transform = `translateY(${scrollY * speed}px)`;
    });
}

window.addEventListener('scroll', parallaxOrbs);

// ─────────────────────────────────────────────────────────────────
// Keyboard Navigation
// ─────────────────────────────────────────────────────────────────
document.addEventListener('keydown', (e) => {
    // Close mobile nav with Escape key
    if (e.key === 'Escape' && navLinks.classList.contains('active')) {
        toggleMobileNav();
    }
});

// ─────────────────────────────────────────────────────────────────
// Initialize
// ─────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    // Initial checks
    handleNavbarScroll();
    updateActiveNavLink();
    revealOnScroll();
    
    console.log('🎧 DJ Mohamed Alaoui Website Loaded');
    console.log('🇲🇦 Bringing Moroccan soul to dancefloors worldwide');
});