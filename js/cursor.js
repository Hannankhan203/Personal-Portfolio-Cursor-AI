// Custom Cursor Elements
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

// Mouse Position Variables
let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;
let followerX = 0;
let followerY = 0;

// Animation Speed
const speed = 0.2;
const followerSpeed = 0.1;

// Update Cursor Position
const updateCursor = () => {
    // Calculate new positions with smooth interpolation
    cursorX += (mouseX - cursorX) * speed;
    cursorY += (mouseY - cursorY) * speed;
    followerX += (mouseX - followerX) * followerSpeed;
    followerY += (mouseY - followerY) * followerSpeed;

    // Apply transforms
    cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
    cursorFollower.style.transform = `translate(${followerX}px, ${followerY}px)`;

    // Request next frame
    requestAnimationFrame(updateCursor);
};

// Mouse Move Event
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Cursor Interactions
document.addEventListener('DOMContentLoaded', () => {
    // Start animation loop
    updateCursor();

    // Interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-category, .contact-item');

    interactiveElements.forEach(element => {
        // Mouse enter
        element.addEventListener('mouseenter', () => {
            cursor.style.transform = `translate(${mouseX}px, ${mouseY}px) scale(1.5)`;
            cursorFollower.style.transform = `translate(${mouseX}px, ${mouseY}px) scale(1.5)`;
            element.style.cursor = 'none';
        });

        // Mouse leave
        element.addEventListener('mouseleave', () => {
            cursor.style.transform = `translate(${mouseX}px, ${mouseY}px) scale(1)`;
            cursorFollower.style.transform = `translate(${mouseX}px, ${mouseY}px) scale(1)`;
        });
    });

    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
        cursorFollower.style.opacity = '0';
    });

    // Show cursor when entering window
    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
        cursorFollower.style.opacity = '1';
    });

    // Hide default cursor
    document.body.style.cursor = 'none';

    // Handle cursor during scroll
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        cursor.style.opacity = '0';
        cursorFollower.style.opacity = '0';

        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            cursor.style.opacity = '1';
            cursorFollower.style.opacity = '1';
        }, 150);
    });
});

// Handle cursor during page transitions
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        cursor.style.opacity = '0';
        cursorFollower.style.opacity = '0';
    } else {
        cursor.style.opacity = '1';
        cursorFollower.style.opacity = '1';
    }
});

// Disable cursor on touch devices
if ('ontouchstart' in window) {
    cursor.style.display = 'none';
    cursorFollower.style.display = 'none';
    document.body.style.cursor = 'auto';
} 