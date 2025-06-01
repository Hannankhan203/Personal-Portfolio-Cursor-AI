// DOM Elements
const body = document.body;
const projectFilters = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');
const themeToggle = document.getElementById('theme-toggle');

// Theme Toggle
const toggleTheme = () => {
    body.classList.toggle('dark-mode');
    localStorage.setItem('theme', body.classList.contains('dark-mode') ? 'dark' : 'light');
};

// Initialize Theme
const initTheme = () => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        themeToggle.checked = true;
    }
};

// Project Filtering
const filterProjects = (filter) => {
    projectCards.forEach(card => {
        const categories = card.dataset.category.split(',');
        const shouldShow = filter === 'all' || categories.includes(filter);
        
        if (shouldShow) {
            gsap.to(card, {
                opacity: 1,
                scale: 1,
                duration: 0.5,
                ease: 'power2.out'
            });
        } else {
            gsap.to(card, {
                opacity: 0.3,
                scale: 0.95,
                duration: 0.5,
                ease: 'power2.out'
            });
        }
    });
};

// Smooth Scroll
const smoothScroll = (target) => {
    const element = document.querySelector(target);
    const headerOffset = 80;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
    });
};

// Keyboard Navigation
const handleKeyboardNav = (e) => {
    if (e.key === 'Tab') {
        body.classList.add('keyboard-nav');
    }
};

const handleMouseNav = () => {
    body.classList.remove('keyboard-nav');
};

// Scroll Progress
const createScrollProgress = () => {
    const progress = document.createElement('div');
    progress.className = 'scroll-progress';
    document.body.appendChild(progress);

    gsap.to(progress, {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
            trigger: document.documentElement,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.3
        }
    });
};

// Active Section Tracking
const updateActiveSection = () => {
    const scrollPosition = window.scrollY;

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionBottom = sectionTop + section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const correspondingLink = document.querySelector(`a[href="#${sectionId}"]`);

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (correspondingLink) {
                correspondingLink.classList.add('active');
            }
        }
    });
};

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    createScrollProgress();

    // Theme Toggle
    themeToggle.addEventListener('change', toggleTheme);

    // Project Filters
    projectFilters.forEach(filter => {
        filter.addEventListener('click', () => {
            projectFilters.forEach(f => f.classList.remove('active'));
            filter.classList.add('active');
            filterProjects(filter.dataset.filter);
        });
    });

    // Smooth Scroll
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = link.getAttribute('href');
            smoothScroll(target);
        });
    });

    // Keyboard Navigation
    document.addEventListener('keydown', handleKeyboardNav);
    document.addEventListener('mousedown', handleMouseNav);

    // Scroll Events
    window.addEventListener('scroll', updateActiveSection);
});

// Export for other modules
window.portfolioUtils = {
    filterProjects,
    smoothScroll,
    toggleTheme
}; 