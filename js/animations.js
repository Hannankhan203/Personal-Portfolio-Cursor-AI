// Register GSAP Plugins
gsap.registerPlugin(ScrollTrigger);

// Initial Page Load Animation
const initLoadAnimation = () => {
    const tl = gsap.timeline({
        defaults: {
            ease: 'power3.out',
            duration: 0.8
        }
    });

    tl.from('.nav', {
        y: -100,
        opacity: 0,
        duration: 1
    })
    .from('.hero-content h1', {
        opacity: 0,
        y: 50,
        duration: 1
    }, '-=0.3')
    .from('.hero-subtitle', {
        opacity: 0,
        y: 30
    }, '-=0.5')
    .fromTo('.cta-buttons .btn', 
        {
            opacity: 0,
            y: 20
        },
        {
            opacity: 1,
            y: 0,
            stagger: 0.2,
            clearProps: "all"
        }, '-=0.5');
};

// Scroll Animations
const initScrollAnimations = () => {
    // About Section Animation
    const aboutTl = gsap.timeline({
        scrollTrigger: {
            trigger: '.about',
            start: 'top center+=100',
            toggleActions: 'play none none reverse'
        }
    });

    aboutTl.from('.about-image', {
        opacity: 0,
        scale: 0.8,
        duration: 1,
        ease: 'power3.out'
    })
    .from('.about-text', {
        opacity: 0,
        x: 50,
        duration: 1
    }, '-=0.5');

    // Projects Section Animation
    const projectsTl = gsap.timeline({
        scrollTrigger: {
            trigger: '.projects',
            start: 'top center+=100',
            toggleActions: 'play none none reverse'
        }
    });

    projectsTl.from('.project-filters', {
        opacity: 0,
        y: 30,
        duration: 0.8
    })
    .from('.project-card', {
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: {
            amount: 0.6,
            grid: 'auto',
            from: 'start'
        }
    });

    // Skills Section Animation
    gsap.from('.skill-category', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
            trigger: '.skills',
            start: 'top center+=100',
            toggleActions: 'play none none reverse'
        }
    });

    // Contact Section Animation
    gsap.from('.contact-item', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
            trigger: '.contact',
            start: 'top center+=100',
            toggleActions: 'play none none reverse'
        }
    });
};

// Hover Animations
const initHoverAnimations = () => {
    // Project Cards
    document.querySelectorAll('.project-card').forEach(card => {
        const image = card.querySelector('.project-image img');
        const content = card.querySelector('.project-content');
        
        card.addEventListener('mouseenter', () => {
            gsap.to(image, {
                scale: 1.1,
                duration: 0.4,
                ease: 'power2.out'
            });
            
            gsap.to(content, {
                y: -5,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(image, {
                scale: 1,
                duration: 0.4,
                ease: 'power2.out'
            });
            
            gsap.to(content, {
                y: 0,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });

    // Skill Categories
    document.querySelectorAll('.skill-category').forEach(category => {
        category.addEventListener('mouseenter', () => {
            gsap.to(category, {
                y: -8,
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        category.addEventListener('mouseleave', () => {
            gsap.to(category, {
                y: 0,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });

    // Contact Items
    document.querySelectorAll('.contact-item').forEach(item => {
        item.addEventListener('mouseenter', () => {
            gsap.to(item, {
                y: -5,
                scale: 1.02,
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        item.addEventListener('mouseleave', () => {
            gsap.to(item, {
                y: 0,
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });
};

// Section Headings Animation
const initSectionHeadings = () => {
    gsap.utils.toArray('section h2').forEach(heading => {
        gsap.from(heading, {
            opacity: 0,
            y: 30,
            duration: 1,
            scrollTrigger: {
                trigger: heading,
                start: 'top center+=200',
                toggleActions: 'play none none reverse'
            }
        });

        gsap.from(heading.querySelector('::after'), {
            width: 0,
            duration: 1,
            scrollTrigger: {
                trigger: heading,
                start: 'top center+=200',
                toggleActions: 'play none none reverse'
            }
        });
    });
};

// Mobile Navigation Animation
const initMobileNav = () => {
    const mobileToggle = document.querySelector('.mobile-nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            if (navLinks.classList.contains('active')) {
                gsap.to(navLinks, {
                    y: 0,
                    opacity: 1,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            } else {
                gsap.to(navLinks, {
                    y: -20,
                    opacity: 0,
                    duration: 0.3,
                    ease: 'power2.in'
                });
            }
        });
    }
};

// Initialize All Animations
document.addEventListener('DOMContentLoaded', () => {
    initLoadAnimation();
    initScrollAnimations();
    initHoverAnimations();
    initSectionHeadings();
    initMobileNav();
}); 