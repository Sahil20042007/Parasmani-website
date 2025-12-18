document.addEventListener('DOMContentLoaded', () => {
    
    // Register GSAP Plugin (Required for Stacking Cards)
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
    }

    // ============================================================ 
    // 1. Navigation Handling
    // ============================================================ 
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // ============================================================ 
    // 2. Smooth scrolling
    // ============================================================ 
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // ============================================================ 
    // 3. Header scroll effect
    // ============================================================ 
    const header = document.querySelector('.main-header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // ============================================================ 
    // 4. Standard Animations (Fade In / Reveal)
    // ============================================================ 
    const scrollOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, scrollOptions);

    document.querySelectorAll('.fade-in, .scroll-reveal').forEach(el => {
        scrollObserver.observe(el);
    });

    // ============================================================ 
    // 5. Contact Form Handling
    // ============================================================ 
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    if (contactForm && formMessage) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('.btn-submit');
            
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;
            formMessage.style.display = 'none';
            
            setTimeout(() => {
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;
                formMessage.className = 'form-message success';
                formMessage.textContent = '✓ Thank you! Your message has been sent successfully.';
                formMessage.style.display = 'block';
                contactForm.reset();
                setTimeout(() => { formMessage.style.display = 'none'; }, 5000);
            }, 1500);
        });

        const emailInput = document.getElementById('email');
        if (emailInput) {
            emailInput.addEventListener('blur', function() {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (this.value && !emailRegex.test(this.value)) {
                    this.style.borderColor = '#ef4444';
                } else {
                    this.style.borderColor = '#e2e8f0';
                }
            });
        }
    }

    // ============================================================ 
    // 6. Basic Parallax Background (Optional fallback)
    // ============================================================ 
    const parallaxBg = document.querySelector('.parallax-background');
    const parallaxSection = document.querySelector('.products-parallax');

    // Only run this if we are NOT using the GSAP version for this section
    if (parallaxBg && parallaxSection && typeof gsap === 'undefined') {
        let ticking = false;
        function updateParallax() {
            const scrolled = window.scrollY;
            const sectionTop = parallaxSection.offsetTop;
            const scrollPosition = scrolled - sectionTop;
            if (scrollPosition > -window.innerHeight && scrollPosition < parallaxSection.offsetHeight) {
                parallaxBg.style.transform = `translateY(${scrollPosition * 0.5}px)`;
            }
            ticking = false;
        }
        window.addEventListener('scroll', () => {
            if (!ticking) { window.requestAnimationFrame(updateParallax); ticking = true; }
        });
    }

    // ============================================================ 
    // 7. NEW: GSAP Stacking Cards Logic
    // ============================================================ 
    const stackSection = document.querySelector('#products');
    const stackCards = document.querySelectorAll('.product-showcase-card');

    if (stackSection && stackCards.length > 0 && typeof gsap !== 'undefined') {
        
        // Pin the section
        ScrollTrigger.create({
            trigger: stackSection,
            start: "top top",
            end: () => `+=${stackCards.length * 100}%`, // Scroll distance based on card count
            pin: true,
            scrub: 1,
        });

        // Animate Cards
        stackCards.forEach((card, index) => {
            if (index > 0) {
                gsap.fromTo(card, 
                    { y: "120%", scale: 0.9, opacity: 0 },
                    {
                        y: "0%", scale: 1, opacity: 1, ease: "power2.out",
                        scrollTrigger: {
                            trigger: stackSection,
                            start: "top top+=" + (index * window.innerHeight),
                            end: "top top+=" + ((index + 1) * window.innerHeight),
                            scrub: 1
                        }
                    }
                );
            }
            // Fade out previous card
            if (index < stackCards.length - 1) {
                gsap.to(card, {
                    scale: 0.90, filter: "brightness(0.7)",
                    scrollTrigger: {
                        trigger: stackSection,
                        start: "top top+=" + ((index + 1) * window.innerHeight),
                        end: "top top+=" + ((index + 2) * window.innerHeight),
                        scrub: 1
                    }
                });
            }
        });
    }
});