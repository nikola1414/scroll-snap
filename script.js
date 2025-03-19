let isScrolling = false;
let touchStartY = 0; 

function snapToSection(direction) {
    if (isScrolling) return;

    const sections = document.querySelectorAll(".section");
    let threshold = window.innerWidth <= 768 ? 0.8 : 0.80; 
    let targetSection = null;

    sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const visibilityThreshold = window.innerHeight * threshold;

        if (direction === "down" && rect.top > 0 && rect.top < visibilityThreshold) {
            targetSection = section;
        }
        if (direction === "up" && rect.bottom > window.innerHeight * (1 - threshold) && rect.bottom < window.innerHeight) {
            targetSection = section;
        }
    });

    if (targetSection) {
        isScrolling = true;
        targetSection.scrollIntoView({ behavior: "smooth" });

        setTimeout(() => {
            isScrolling = false;
        }, 600); 
    }
}

document.addEventListener("wheel", (event) => {
    if (event.deltaY > 0) {
        snapToSection("down");
    } else {
        snapToSection("up");
    }
});

document.addEventListener("touchstart", (event) => {
    touchStartY = event.touches[0].clientY;
});

document.addEventListener("touchend", (event) => {
    let touchEndY = event.changedTouches[0].clientY;
    let swipeDistance = touchStartY - touchEndY;

    if (Math.abs(swipeDistance) > 25) { 
        if (swipeDistance > 0) {
            snapToSection("down"); 
        } else {
            snapToSection("up"); 
        }
    }
});
