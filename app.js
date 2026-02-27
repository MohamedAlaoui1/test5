/**
 * DJ Mohamed Alaoui - Website JavaScript
 * Moroccan Beats & Global Sounds
 */

// ═══════════════════════════════════════════
// DOM Elements
// ═══════════════════════════════════════════
const navbar = document.querySelector('.navbar');
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const playButtons = document.querySelectorAll('.play-btn');
const audioPlayer = document.getElementById('audioPlayer');
const playPauseBtn = document.getElementById('playPauseBtn');
const closePlayerBtn = document.getElementById('closePlayer');
const trackNameEl = document.getElementById('trackName');
const progressEl = document.getElementById('progress');
const currentTimeEl = document.getElementById('currentTime');
const bookingForm = document.getElementById('bookingForm');

// ═══════════════════════════════════════════
// Track Data (simulated)
// ═══════════════════════════════════════════
const tracks = {
    'desert-dreams': { name: 'Desert Dreams EP', duration: '32:15' },
    'medina-nights': { name: 'Medina Nights', duration: '6:42' },
    'atlas-rising': { name: 'Atlas Rising', duration: '7:18' },
    'gnawa-spirit': { name: 'Gnawa Spirit', duration: '8:05' }
};

let currentTrack = null;
let isPlaying = false;
let progressInterval = null;
let currentProgress = 0;

// ═══════════════════════════════════════════
// Navigation
// ═══════════════════════════════════════════

// Scroll effect for navbar
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Update active nav link based on scroll position
    updateActiveNavLink();
});

// Mobile menu toggle
navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Update active nav link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 200;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ═══════════════════════════════════════════
// Audio Player (Simulated)
// ═══════════════════════════════════════════

playButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const trackId = btn.dataset.track;
        playTrack(trackId);
    });
});

function playTrack(trackId) {
    const track = tracks[trackId];
    if (!track) return;
    
    // If same track, toggle play/pause
    if (currentTrack === trackId) {
        togglePlayPause();
        return;
    }
    
    // New track
    currentTrack = trackId;
    trackNameEl.textContent = track.name;
    currentProgress = 0;
    progressEl.style.width = '0%';
    currentTimeEl.textContent = '0:00';
    
    // Show player
    audioPlayer.classList.add('active');
    
    // Start playing
    isPlaying = true;
    playPauseBtn.textContent = '⏸';
    startProgressSimulation();
}

function togglePlayPause() {
    isPlaying = !isPlaying;
    playPauseBtn.textContent = isPlaying ? '⏸' : '▶';
    
    if (isPlaying) {
        startProgressSimulation();
    } else {
        stopProgressSimulation();
    }
}

playPauseBtn.addEventListener('click', togglePlayPause);

closePlayerBtn.addEventListener('click', () => {
    audioPlayer.classList.remove('active');
    stopProgressSimulation();
    currentTrack = null;
    isPlaying = false;
    playPauseBtn.textContent = '▶';
});

function startProgressSimulation() {
    stopProgressSimulation();
    progressInterval = setInterval(() => {
        currentProgress += 0.5;
        if (currentProgress >= 100) {
            currentProgress = 0;
        }
        progressEl.style.width = `${currentProgress}%`;
        
        // Update time display
        const totalSeconds = Math.floor((currentProgress / 100) * 400); // Simulated 6:40 track
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        currentTimeEl.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }, 100);
}

function stopProgressSimulation() {
    if (progressInterval) {
        clearInterval(progressInterval);
        progressInterval = null;
    }
}

// ═══════════════════════════════════════════
// Contact Form
// ═══════════════════════════════════════════

bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(bookingForm);
    const data = Object.fromEntries(formData);
    
    // Simulate form submission
    const submitBtn = bookingForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<span>Sending...</span>';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        // Show success message
        submitBtn.innerHTML = '<span>Message Sent! ✓</span>';
        submitBtn.style.background = '#1abc9c';
        
        // Reset form
        bookingForm.reset();
        
        // Reset button after delay
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.style.background = '';
            submitBtn.disabled = false;
        }, 3000);
    }, 1500);
});

// ═══════════════════════════════════════════
// Scroll Animations
// ═══════════════════════════════════════════

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Add animation class to elements
document.querySelectorAll('.music-card, .event-card, .gallery-item, .stat').forEach(el => {
    el.classList.add('animate-on-scroll');
    observer.observe(el);
});

// ═══════════════════════════════════════════
// Gallery Lightbox (Simple)
// ═══════════════════════════════════════════

const galleryItems = document.querySelectorAll('.gallery-item');

galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        const img = item.querySelector('img');
        const overlay = item.querySelector('.gallery-overlay span');
        
        // Create lightbox
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <img src="${img.src}" alt="${img.alt}">
                <p>${overlay ? overlay.textContent : ''}</p>
                <button class="lightbox-close">×</button>
            </div>
        `;
        
        // Add styles
        lightbox.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.95);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 2000;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        const content = lightbox.querySelector('.lightbox-content');
        content.style.cssText = `
            text-align: center;
            max-width: 90%;
            max-height: 90%;
        `;
        
        const lightboxImg = lightbox.querySelector('img');
        lightboxImg.style.cssText = `
            max-width: 100%;
            max-height: 80vh;
            object-fit: contain;
            border-radius: 8px;
        `;
        
        const caption = lightbox.querySelector('p');
        caption.style.cssText = `
            color: #d4af37;
            margin-top: 16px;
            font-size: 1.2rem;
        `;
        
        const closeBtn = lightbox.querySelector('.lightbox-close');
        closeBtn.style.cssText = `
            position: absolute;
            top: 20px;
            right: 30px;
            background: none;
            border: none;
            color: white;
            font-size: 3rem;
            cursor: pointer;
            transition: color 0.2s ease;
        `;
        
        document.body.appendChild(lightbox);
        document.body.style.overflow = 'hidden';
        
        // Fade in
        requestAnimationFrame(() => {
            lightbox.style.opacity = '1';
        });
        
        // Close handlers
        const closeLightbox = () => {
            lightbox.style.opacity = '0';
            setTimeout(() => {
                lightbox.remove();
                document.body.style.overflow = '';
            }, 300);
        };
        
        closeBtn.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
        
        document.addEventListener('keydown', function escHandler(e) {
            if (e.key === 'Escape') {
                closeLightbox();
                document.removeEventListener('keydown', escHandler);
            }
        });
    });
});

// ═══════════════════════════════════════════
// Moroccan Pattern Animation
// ═══════════════════════════════════════════

// Subtle parallax effect on pattern overlay
window.addEventListener('scroll', () => {
    const pattern = document.querySelector('.pattern-overlay');
    if (pattern) {
        const scrolled = window.pageYOffset;
        pattern.style.transform = `translateY(${scrolled * 0.1}px)`;
    }
});

// ═══════════════════════════════════════════
// Initialize
// ═══════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {
    // Add loaded class for initial animations
    document.body.classList.add('loaded');
    
    // Initialize first nav link as active
    updateActiveNavLink();
    
    console.log('🎵 DJ Mohamed Alaoui Website Loaded');
    console.log('🇲🇦 Moroccan Beats & Global Sounds');
});