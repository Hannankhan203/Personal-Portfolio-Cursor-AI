// Three.js Scene Setup
let scene, camera, renderer, particles;

// Animation Properties
const particleCount = 100;
const particleSize = 0.05;
const maxRange = 1;
const minRange = maxRange * -1;
const mousePosition = new THREE.Vector2();

// Initialize Three.js Scene
const init = () => {
    // Scene
    scene = new THREE.Scene();

    // Camera
    const fov = 75;
    const aspect = window.innerWidth / window.innerHeight;
    const near = 0.1;
    const far = 1000;
    camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 2;

    // Renderer
    renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    // Add to DOM
    const container = document.getElementById('three-background');
    container.appendChild(renderer.domElement);

    // Create Particles
    createParticles();

    // Event Listeners
    window.addEventListener('resize', onWindowResize);
    window.addEventListener('mousemove', onMouseMove);

    // Start Animation
    animate();
};

// Create Particle System
const createParticles = () => {
    const geometry = new THREE.BufferGeometry();
    const positions = [];
    const velocities = [];
    const colors = [];

    for (let i = 0; i < particleCount; i++) {
        // Position
        positions.push(
            Math.random() * (maxRange - minRange) + minRange,
            Math.random() * (maxRange - minRange) + minRange,
            Math.random() * (maxRange - minRange) + minRange
        );

        // Velocity
        velocities.push(
            (Math.random() - 0.5) * 0.002,
            (Math.random() - 0.5) * 0.002,
            (Math.random() - 0.5) * 0.002
        );

        // Color
        const color = new THREE.Color();
        color.setHSL(Math.random(), 0.7, 0.7);
        colors.push(color.r, color.g, color.b);
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

    // Material
    const material = new THREE.PointsMaterial({
        size: particleSize,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });

    // Create Particle System
    particles = new THREE.Points(geometry, material);
    scene.add(particles);
};

// Animation Loop
const animate = () => {
    requestAnimationFrame(animate);

    // Update Particles
    const positions = particles.geometry.attributes.position.array;

    for (let i = 0; i < positions.length; i += 3) {
        // Update position
        positions[i] += (Math.random() - 0.5) * 0.001;
        positions[i + 1] += (Math.random() - 0.5) * 0.001;
        positions[i + 2] += (Math.random() - 0.5) * 0.001;

        // Check boundaries
        if (positions[i] > maxRange || positions[i] < minRange) positions[i] *= -1;
        if (positions[i + 1] > maxRange || positions[i + 1] < minRange) positions[i + 1] *= -1;
        if (positions[i + 2] > maxRange || positions[i + 2] < minRange) positions[i + 2] *= -1;

        // Mouse interaction
        const distance = Math.sqrt(
            Math.pow(positions[i] - mousePosition.x, 2) +
            Math.pow(positions[i + 1] - mousePosition.y, 2)
        );

        if (distance < 0.1) {
            positions[i] += (mousePosition.x - positions[i]) * 0.01;
            positions[i + 1] += (mousePosition.y - positions[i + 1]) * 0.01;
        }
    }

    particles.geometry.attributes.position.needsUpdate = true;

    // Rotate particle system
    particles.rotation.x += 0.0001;
    particles.rotation.y += 0.0002;

    renderer.render(scene, camera);
};

// Window Resize Handler
const onWindowResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
};

// Mouse Move Handler
const onMouseMove = (event) => {
    mousePosition.x = (event.clientX / window.innerWidth) * 2 - 1;
    mousePosition.y = -(event.clientY / window.innerHeight) * 2 + 1;
};

// Initialize on DOM Load
document.addEventListener('DOMContentLoaded', init); 