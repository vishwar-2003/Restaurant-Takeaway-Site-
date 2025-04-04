// <!-- AOS --> 
AOS.init({
    duration: 1800,
    once: true
})
// <!-- //AOS --> 

// Header

const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const links = document.querySelectorAll(".nav-links li");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("open");
    navLinks.classList.toggle("open");
    links.forEach(link => {
        link.classList.toggle("fade");
    });

    // Toggle body overflow hidden
    document.body.classList.toggle("no-scroll");
});

// Create a new style element
const style = document.createElement('style');
document.head.appendChild(style);

// Get a reference to the style sheet
const sheet = style.sheet;

// Loop through 1 to 13 and add the CSS rules
for (let i = 1; i <= 13; i++) {
    const delay = 0.2 * i;
    sheet.insertRule(`.nav-links li:nth-child(${i}) { transition: all 0.5s ease ${delay}s; }`, sheet.cssRules.length);
}

// desktop - Function to add the 'fade' class to li elements
function addFadeClass() {
    if (window.innerWidth >= 992) {
        const navLinks = document.querySelectorAll('.nav-links li');
        navLinks.forEach(li => {
            li.classList.add('fade');
        });
    } else {
        const navLinks = document.querySelectorAll('.nav-links li.fade');
        navLinks.forEach(li => {
            li.classList.remove('fade');
        });
    }
}

// Run on initial load
addFadeClass();

// Add event listener to run function on window resize
window.addEventListener('resize', addFadeClass);


// //Header