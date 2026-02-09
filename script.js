// Performance optimizations
document.addEventListener('DOMContentLoaded', () => {
    // Hamburger Menu Logic
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');

            // Animating hamburger bars
            const bars = document.querySelectorAll('.bar');
            if (hamburger.classList.contains('active')) {
                bars[0].style.transform = 'translateY(8px) rotate(45deg)';
                bars[1].style.opacity = '0';
                bars[2].style.transform = 'translateY(-8px) rotate(-45deg)';
            } else {
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            }
        });

        // Close menu when link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                const bars = document.querySelectorAll('.bar');
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            });
        });
    }

    // Lazy load scroll animations using Intersection Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-up');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    // Elements to animate (excluding hero for faster initial load)
    const animateElements = document.querySelectorAll('.project-card, .about-content, .profile-card, .contact-card');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });

    // Optimize 3D model loading
    const modelViewer = document.querySelector('model-viewer');
    if (modelViewer) {
        // Show loading state
        modelViewer.addEventListener('progress', (event) => {
            const progress = event.detail.totalProgress;
            if (progress < 1) {
                console.log(`Loading 3D model: ${Math.round(progress * 100)}%`);
            }
        });

        // Model loaded successfully
        modelViewer.addEventListener('load', () => {
            console.log('3D model loaded successfully');
            modelViewer.classList.add('loaded');
        });

        // Handle errors
        modelViewer.addEventListener('error', (event) => {
            console.error('Error loading 3D model:', event);
        });
    }
});

// Preload critical images on idle
if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
        // Preload any critical images here if needed
    });
}
