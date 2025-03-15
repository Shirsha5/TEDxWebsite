function updateBackground() {
    let screenWidth = window.innerWidth;

    if (screenWidth <= 768) {
        document.body.style.backgroundSize = "contain";
    } else {
        document.body.style.backgroundSize = "cover";
    }
}

window.addEventListener("resize", updateBackground);
window.addEventListener("load", updateBackground);

const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

//smoth scroll 
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    });
});

let text = "Threads of Identity"; // The text to be typed
let index = 0; // Start at the first letter

function typeWriter() {
    if (index < text.length) {
        document.getElementById("typewriter").innerHTML += text.charAt(index);
        index++; // Move to the next character
        setTimeout(typeWriter, 100); // Wait 100ms before typing next letter
    }
}

window.onload = function () {
    typeWriter(); // Start typing when the page loads
};
