document.addEventListener("DOMContentLoaded", () => {
    
    // Check if GSAP is loaded
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        
        const productsSection = document.querySelector('.products-section');
        const cards = document.querySelectorAll('.product-card');

        if (productsSection && cards.length > 0) {
            
            // 1. PIN THE SECTION
            // This keeps the container fixed while we scroll through cards
            ScrollTrigger.create({
                trigger: productsSection,
                start: "top top", 
                // The duration of the pin is based on how many cards we have
                end: () => `+=${cards.length * 100}%`, 
                pin: true,
                scrub: 1, // Smoothness of the scrub
                anticipatePin: 1
            });

            // 2. ANIMATE EACH CARD
            cards.forEach((card, index) => {
                if (index > 0) { // Skip the first card (it starts visible)
                    
                    gsap.fromTo(card, 
                        {
                            y: "120%", // Start from below the view
                            opacity: 0,
                            scale: 0.9
                        },
                        {
                            y: "0%", // Move to center
                            opacity: 1,
                            scale: 1,
                            ease: "none", // Linear ease is better for scrubbing
                            scrollTrigger: {
                                trigger: productsSection,
                                // Calculate exactly when this card should appear based on scroll position
                                start: () => "top top+=" + (index * window.innerHeight),
                                end: () => "top top+=" + ((index + 1) * window.innerHeight),
                                scrub: 1
                            }
                        }
                    );
                }

                // 3. (Optional) FADE BACK THE PREVIOUS CARD
                // This creates the "Stacking" depth effect
                if (index < cards.length - 1) {
                    gsap.to(card, {
                        scale: 0.95,
                        filter: "brightness(0.5)", // Darken it as it goes back
                        scrollTrigger: {
                            trigger: productsSection,
                            start: () => "top top+=" + ((index + 1) * window.innerHeight),
                            end: () => "top top+=" + ((index + 2) * window.innerHeight),
                            scrub: 1
                        }
                    });
                }
            });
        }
    } else {
        console.warn("GSAP is not loaded. Product animations will not work.");
    }
});