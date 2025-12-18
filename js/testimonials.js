document.addEventListener("DOMContentLoaded", (event) => {
    
    // Check if GSAP is loaded
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // ============================================================ 
        // 1. PINNING THE LEFT SIDE
        // ============================================================ 
        // We pin the .left-col while the .right-col scrolls
        ScrollTrigger.create({
            trigger: ".testimonial-section",
            start: "top top",
            end: "bottom bottom",
            pin: ".left-col",
            pinSpacing: false, // Critical for the split-screen layout
            // markers: true, // Uncomment this line to debug animation start/end points
        });

        // ============================================================ 
        // 2. SYNCING QUOTES WITH IDENTITIES
        // ============================================================ 
        const quotes = document.querySelectorAll('.quote-block');
        const identities = document.querySelectorAll('.identity-card');

        quotes.forEach((quote, i) => {
            ScrollTrigger.create({
                trigger: quote,
                start: "top center", // When the top of the quote hits the center of screen
                end: "bottom center",
                onEnter: () => updateActive(i),
                onEnterBack: () => updateActive(i)
            });
        });

        function updateActive(index) {
            // A. Reset all states
            identities.forEach(id => {
                id.classList.remove('active');
                // Animate out (fade away to left)
                gsap.to(id, { opacity: 0, x: -20, duration: 0.3 });
            });
            quotes.forEach(q => q.classList.remove('active'));

            // B. Activate current
            const currentId = identities[index];
            const currentQuote = quotes[index];

            if (currentId && currentQuote) {
                currentId.classList.add('active');
                currentQuote.classList.add('active');

                // Animate in (fade in from left)
                gsap.to(currentId, { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" });
            }
        }
    } else {
        console.error("GSAP or ScrollTrigger not loaded. Please check your CDN links in HTML.");
    }
});