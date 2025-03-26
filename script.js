let isScrolling = false;
let touchStartY = 0;

window.addEventListener("wheel", function(e) {
    const sections = [...document.querySelectorAll(".section")];
    const currentSection = getCurrentSection(sections);

    if (e.deltaY > 0) {
        if (currentSection) {
            snapToSection("down");
        }
    } else if (e.deltaY < 0) {
        if (currentSection !== sections[0]) {
            snapToSection("up");
        }
    }
});

document.querySelectorAll(".nav-item").forEach(item => {
    item.addEventListener("click", function() {
        if (isScrolling) return;

        const targetSectionId = this.dataset.target;
        snapToSectionById(targetSectionId);
    });
});

function getCurrentSection(sections) {
    for (let section of sections) {
        const rect = section.getBoundingClientRect();
        if (rect.top >= 0 && rect.top < window.innerHeight) {
            return section;
        }
    }
    return sections[0]; 
}

function snapToSection(direction) {
    if (isScrolling) return;

    const sections = document.querySelectorAll(".section");
    let threshold = 0.8; 
    let targetSection = null;

    sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const visibilityThreshold = window.innerHeight * threshold;
        if (direction === "down" && rect.top >= 0 && rect.top  < visibilityThreshold) {
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
            updateActiveSection();
        }, 600); 
    }
}

function snapToSectionById(sectionId) {
    if (isScrolling) return;

    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        isScrolling = true;
        targetSection.scrollIntoView({ behavior: "smooth" });

        setTimeout(() => {
            isScrolling = false;
            updateActiveSection();
        }, 600);
    }
}

function updateActiveSection() {
    const sections = document.querySelectorAll(".section");
    sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        const isActive = rect.top >= -window.innerHeight / 3 && rect.top < window.innerHeight / 3;

        const navItem = document.querySelector(`.nav-item[data-target="${section.id}"]`);
        if (isActive) {
            navItem.classList.add("active");
        } else {
            navItem.classList.remove("active");
        }
    });
}
