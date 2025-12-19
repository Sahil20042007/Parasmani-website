// Component Loader for Parasmani Ferro Industries
// Loads HTML components into designated root divs

document.addEventListener('DOMContentLoaded', function() {
    
    // Component mapping: root div ID -> component file path
    const components = {
        'products-root': 'components/products.html',
        'testimonials-root': 'components/testimonials.html'
    };

    // Load each component
    Object.keys(components).forEach(rootId => {
        const rootElement = document.getElementById(rootId);
        const componentPath = components[rootId];

        if (rootElement) {
            loadComponent(rootElement, componentPath);
        }
    });

    // Function to load component via fetch
    function loadComponent(element, path) {
        fetch(path)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.text();
            })
            .then(html => {
                element.innerHTML = html;
                console.log(`✅ Loaded: ${path}`);
                
                // Reinitialize animations after component loads
                reinitializeAnimations(element);
                
                // Reinitialize testimonials if loaded
                if (path.includes('testimonials')) {
                    reinitializeTestimonials();
                }
            })
            .catch(error => {
                console.error(`❌ Error loading ${path}:`, error);
                element.innerHTML = `<p style="color: red; padding: 20px;">Failed to load component: ${path}</p>`;
            });
    }

    // Reinitialize scroll animations for dynamically loaded content
    function reinitializeAnimations(container) {
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

        // Observe all fade-in elements in the loaded component
        container.querySelectorAll('.fade-in, .scroll-reveal').forEach(el => {
            scrollObserver.observe(el);
        });
    }

    // Reinitialize testimonials GSAP animations
    function reinitializeTestimonials() {
        // Wait a bit for DOM to fully render
        setTimeout(() => {
            if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
                
                // Pin the left column
                ScrollTrigger.create({
                    trigger: ".testimonial-section",
                    start: "top top",
                    end: "bottom bottom",
                    pin: ".left-col",
                    pinSpacing: false
                });

                // Sync quotes with identity cards
                const quotes = document.querySelectorAll('.quote-block');
                const identities = document.querySelectorAll('.identity-card');

                quotes.forEach((quote, i) => {
                    ScrollTrigger.create({
                        trigger: quote,
                        start: "top center",
                        end: "bottom center",
                        onEnter: () => updateActive(i),
                        onEnterBack: () => updateActive(i)
                    });
                });

                function updateActive(index) {
                    // Remove active from all
                    identities.forEach(id => {
                        id.classList.remove('active');
                        gsap.to(id, { opacity: 0, x: -20, duration: 0.3 });
                    });
                    quotes.forEach(q => q.classList.remove('active'));

                    // Activate current
                    const currentId = identities[index];
                    const currentQuote = quotes[index];

                    if (currentId && currentQuote) {
                        currentId.classList.add('active');
                        currentQuote.classList.add('active');
                        gsap.to(currentId, { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" });
                    }
                }

                console.log('✅ Testimonials animations initialized');
            }
        }, 100);
    }
});