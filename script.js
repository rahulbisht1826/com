// Sequential loading with comprehensive skeleton loaders
let modelLoaded = false;
let contentRevealed = false;

document.addEventListener('DOMContentLoaded', () => {
    const modelViewer = document.querySelector('model-viewer');
    const mainContent = document.querySelector('main');
    const header = document.querySelector('.navbar');

    // Add loading classes to show skeletons
    if (header) {
        header.classList.add('loading');
    }

    // Hide all content except the 3D model initially and add skeleton classes
    if (mainContent) {
        // Hide everything except hero section initially
        const sections = mainContent.querySelectorAll('section:not(#home)');
        sections.forEach(section => {
            section.style.opacity = '0';
            section.style.visibility = 'hidden';
            section.classList.add('loading');
        });

        // Hide hero content (text) initially and show skeleton
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.opacity = '0';
            heroContent.style.visibility = 'hidden';
            heroContent.classList.add('loading');
            heroContent.style.position = 'relative';
        }

        // Add skeleton to project cards
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach(card => {
            card.classList.add('skeleton');
        });

        // Add skeleton to profile card
        const profileCard = document.querySelector('.profile-card');
        if (profileCard) {
            profileCard.classList.add('skeleton');
        }
    }

    // 3D Model Loading Events
    if (modelViewer) {
        // Track loading progress
        modelViewer.addEventListener('progress', (event) => {
            const progress = event.detail.totalProgress;
            console.log(`Loading 3D model: ${Math.round(progress * 100)}%`);
        });

        // Model loaded successfully
        modelViewer.addEventListener('load', () => {
            console.log('3D model loaded successfully');
            modelLoaded = true;
            modelViewer.classList.add('loaded');

            // Wait a brief moment to appreciate the model, then reveal content
            setTimeout(() => {
                revealContent();
            }, 300);
        });

        // Handle errors - still reveal content even if model fails
        modelViewer.addEventListener('error', (event) => {
            console.error('Error loading 3D model:', event);
            modelLoaded = true;
            revealContent();
        });
    } else {
        // If no model viewer, reveal content immediately
        revealContent();
    }

    // Function to reveal all content after 3D model loads
    function revealContent() {
        if (contentRevealed) return;
        contentRevealed = true;

        // Remove loading class from header
        if (header) {
            header.classList.remove('loading');
            header.style.transition = 'opacity 0.6s ease';
            header.style.opacity = '1';
        }

        // Reveal hero content and remove skeleton
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            setTimeout(() => {
                heroContent.classList.remove('loading');
                heroContent.style.transition = 'opacity 0.8s ease, visibility 0.8s ease';
                heroContent.style.opacity = '1';
                heroContent.style.visibility = 'visible';
            }, 150);
        }

        // Reveal other sections with stagger and remove skeletons
        const sections = document.querySelectorAll('section:not(#home)');
        sections.forEach((section, index) => {
            setTimeout(() => {
                section.classList.remove('loading');
                section.style.transition = 'opacity 0.8s ease, visibility 0.8s ease';
                section.style.opacity = '1';
                section.style.visibility = 'visible';
            }, 300 + (index * 100));
        });

        // Remove skeleton from project cards with stagger
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.remove('skeleton');
            }, 500 + (index * 80));
        });

        // Remove skeleton from profile card
        const profileCard = document.querySelector('.profile-card');
        if (profileCard) {
            setTimeout(() => {
                profileCard.classList.remove('skeleton');
            }, 700);
        }
    }

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
            if (entry.isIntersecting && modelLoaded) {
                entry.target.classList.add('fade-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Elements to animate (only after model loads)
    setTimeout(() => {
        const animateElements = document.querySelectorAll('.about-content, .contact-card');
        animateElements.forEach(el => {
            el.style.opacity = '0';
            el.classList.add('animate-on-scroll');
            observer.observe(el);
        });
    }, 1200);
});
