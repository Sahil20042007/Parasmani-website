// industries.js

document.addEventListener("DOMContentLoaded", () => {
    const blades = document.querySelectorAll('.blade-item');

    // Function to handle activation
    function activateBlade(selectedBlade) {
        // 1. Deactivate all blades first
        blades.forEach(blade => {
            blade.classList.remove('active');
        });

        // 2. Activate the selected one
        selectedBlade.classList.add('active');
    }
    
    // Add click listeners for touch devices and general interaction
    blades.forEach(blade => {
        blade.addEventListener('click', function() {
           // Only run this click behavior if window width is below desktop size
           // OR if you want clicks to work on desktop too. Let's enable it always for consistency.
           activateBlade(this);
        });

        // Optional: For Desktop mouse users, make hover immediately active
        // and remove active from others.
        blade.addEventListener('mouseenter', function() {
             // On desktop, we let CSS hover handle the expansion visual,
             // but we update the 'active' class for consistency.
             activateBlade(this);
        });
    });

    // Optional: Reset to the first one if mouse leaves the whole container
    const container = document.querySelector('.blade-container');
    container.addEventListener('mouseleave', () => {
        // Uncomment below if you want it to snap back to the first item when mouse leaves
        // activateBlade(blades[0]); 
    });

});