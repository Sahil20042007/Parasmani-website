// Intro animation code
document.addEventListener("DOMContentLoaded", () => {
    // Add your intro animation here
    const introScreen = document.getElementById('intro-screen');
    
    // Simple fade out after 2 seconds
    setTimeout(() => {
        introScreen.style.opacity = '0';
        setTimeout(() => {
            introScreen.style.display = 'none';
        }, 500);
    }, 2000);
});