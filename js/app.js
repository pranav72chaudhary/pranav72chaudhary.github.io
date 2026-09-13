"use strict";


/*==========================
SCROLL REVEAL
==========================*/

const revealObserver = new IntersectionObserver(

    (entries) => {

        entries.forEach((entry) => {

           if (entry.isIntersecting) {

    entry.target.classList.add("show");

} 
        });

    },

    {

        threshold:0.12,
rootMargin: "0px 0px -30px 0px"

    }

);

const hiddenElements = document.querySelectorAll(
    ".fade-up, .fade-left, .fade-right"
);

hiddenElements.forEach((element) => {

    if (
        element.classList.contains("projects") ||
        element.classList.contains("skills") ||
        element.classList.contains("experience") ||
        element.classList.contains("certificates") ||
        element.classList.contains("contact")
    ) {
        return;
    }

    revealObserver.observe(element);

});

/*==========================
PROJECT FILTERS
==========================*/

const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach((button) => {

    button.addEventListener("click", () => {

        document
            .querySelector(".filter-btn.active")
            ?.classList.remove("active");

        button.classList.add("active");

        const filter = button.dataset.filter;

        projectCards.forEach((card) => {

            card.style.display =
                filter === "all" ||
                card.dataset.category.includes(filter)
                    ? "grid"
                    : "none";

        });

    });

});
/*==========================
CARD ANIMATIONS
==========================*/

const sections = document.querySelectorAll(
    ".stats, .projects-grid, .skills-grid, .timeline, .certificates-grid, .contact-container"
);

sections.forEach((section) => {

    const cards = section.querySelectorAll(
        ".stat-card, .project-card, .skill-card, .timeline-item, .certificate-card, .contact-card"
    );

    cards.forEach((card, index) => {

        card.style.transitionDelay = `${index * 0.02}s`;

        revealObserver.observe(card);

    });

});
/*==========================
ANIMATED COUNTERS
==========================*/

const counters = document.querySelectorAll(".counter");

const counterObserver = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

        if (!entry.isIntersecting) return;

        const counter = entry.target;

        const target = Number(counter.dataset.target);

        let current = 0;

        const increment = Math.max(1, Math.ceil(target / 120));

        const updateCounter = () => {

            current += increment;

            if (current >= target) {

                counter.textContent = target;

            } else {

                counter.textContent = current;

                requestAnimationFrame(updateCounter);

            }

        };

        updateCounter();

        counterObserver.unobserve(counter);

    });

});

counters.forEach((counter) => {

    counterObserver.observe(counter);

});
/*==========================
ACTIVE NAVIGATION
==========================*/

const sectionsForNav = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {

    let currentSection = "home";

    sectionsForNav.forEach((section) => {

        const scrollPosition = window.scrollY + (window.innerHeight * 0.35);

const sectionTop = section.offsetTop;
const sectionHeight = section.offsetHeight;

if (
    scrollPosition >= sectionTop &&
    scrollPosition < sectionTop + sectionHeight
) {
    currentSection = section.getAttribute("id");
}

    });

    navLinks.forEach((link) => {

        link.classList.remove("active");
        
        if(currentSection === "") return;

        if (link.getAttribute("href") === `#${currentSection}`) {

            link.classList.add("active");

        }

    });

});
/*==========================

CONTACT FORM VALIDATION

\==========================*/

const contactForm = document.getElementById("contact-form");

contactForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    const name = document.getElementById("name").value.trim();

    const email = document.getElementById("email").value.trim();

    const message = document.getElementById("message").value.trim();

    if (name === "") {

        alert("Please enter your name.");

        return;

    }

    if (email === "") {

        alert("Please enter your email.");

        return;

    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {

        alert("Please enter a valid email address.");

        return;

    }

    if (message === "") {

        alert("Please enter your message.");

        return;

    }

    const formData = new FormData(contactForm);

    try {

        const response = await fetch(
            "https://api.web3forms.com/submit",
            {
                method: "POST",
                body: formData
            }
        );

        const result = await response.json();

        if (result.success) {

            alert("Message sent successfully!");

            contactForm.reset();

        } else {

            alert(
                "Unable to send your message. Please try again."
            );

        }

    } catch (error) {

        alert(
            "Unable to send your message. Please try again."
        );

    }

});

/*==========================
DOWNLOAD CV
==========================*/

const downloadCV = document.getElementById("download-cv");

downloadCV.addEventListener("click", (event) => {

    event.preventDefault();

    const link = document.createElement("a");

    link.href = "CV/Pranav-Chaudhary-CV.pdf";

    link.download = "Pranav-Chaudhary-CV.pdf";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

});
/*==========================
BACK TO TOP BUTTON
==========================*/

const backToTopButton = document.getElementById("back-to-top");

window.addEventListener("scroll", () => {

    const shouldShow = window.scrollY > 800;

    backToTopButton.classList.toggle("visible", shouldShow);

});

backToTopButton.addEventListener("click", () => {

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

});



/*==========================
CERTIFICATE VIEWER
==========================*/

const certificateButtons = document.querySelectorAll(".view-certificate");

const certificateModal = document.getElementById("certificate-modal");

const certificateImage = document.getElementById("certificate-image");

const certificateClose = document.getElementById("certificate-close");

const certificateOverlay = document.getElementById("certificate-overlay");

const certificateMap = {

    "programming":"assets/certificates/advanced-programming.webp",

    "digital-marketing":"assets/certificates/advanced-digital-marketing.webp"

};

certificateButtons.forEach(button=>{

    button.addEventListener("click",()=>{

        const certificate = button.dataset.certificate;

        certificateImage.src = certificateMap[certificate];

        certificateModal.classList.add("active");

    });

});

const closeCertificateModal = () => {

    certificateModal.classList.remove("active");

};

certificateClose.addEventListener("click", closeCertificateModal);

certificateOverlay.addEventListener("click", closeCertificateModal);

/*==========================
DISABLE HERO IMAGE DRAG
==========================*/

const heroImage = document.querySelector(".profile-circle img");

if (heroImage) {

    heroImage.addEventListener("dragstart", (event) => {

        event.preventDefault();

    });

}
/*====================================
LEGENDARY FORGE PARTICLE ENGINE V3
====================================*/

const canvas = document.getElementById("particle-canvas");
const ctx = canvas.getContext("2d");

function resizeCanvas(){

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);

const particles=[];

/*====================================
LEGENDARY TIMELINE REFERENCES
====================================*/

const loader = document.getElementById("loader");

const energy = document.querySelector(".loader-energy");

const vortex = document.querySelector(".loader-vortex");

const emblem = document.querySelector(".pc-mark");

const identity = document.querySelector(".loader-identity");

const gateway = document.querySelector(".loader-gateway");

const timeline = {
    particles:false,
    energy:false,
    vortex:false,
    emblem:false,
    identity:false,
    gateway:false,
    exit:false,
    removed:false
};

class Particle{

    constructor(){

        this.reset();

    }

    reset(){

    this.x = Math.random() * canvas.width;

    this.y = Math.random() * canvas.height;

    this.radius = Math.random() * 1.5 + 0.5;

    this.speedX = (Math.random() - 0.5) * 0.35;

    this.speedY = (Math.random() - 0.5) * 0.35;

    this.orbitBias = 0.55 + Math.random() * 0.9;

    this.alpha = 0;

    this.targetAlpha = 0.08 + Math.random() * 0.22;

    this.delay = Math.random() * 3500;

    this.dying = false;

}

    update(time){

    if(time < this.delay){

        return;

    }

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    const dx = centerX - this.x;
    const dy = centerY - this.y;

    const distance = Math.sqrt(dx * dx + dy * dy);

    const forgeRadius = 24;

    const attraction =
    Math.min(
    0.045,
    320 / (distance + 180)
    );

    const tangentX = -dy;

const tangentY = dx;

const spiralStrength =
Math.max(
    0,
    (distance - 20) / 320
);

  this.speedX +=
dx * attraction * 0.0046 +
tangentX * spiralStrength * 0.00012 * this.orbitBias;

this.speedY +=
dy * attraction * 0.0046 +
tangentY * spiralStrength * 0.00012 * this.orbitBias;

    this.speedX *= 0.985;
    this.speedY *= 0.985;

    this.x += this.speedX;
    this.y += this.speedY;

    this.alpha += (this.targetAlpha - this.alpha) * 0.02;

    if(this.dying){

    this.alpha -= 0.06;

    this.radius *= 0.96;

    if(this.alpha <= 0){

        this.reset();

        return;

    }

}

    if(distance < forgeRadius && !this.dying){

    this.dying = true;

}

}

    draw(){

    if(this.alpha <= 0){

        return;

    }

    ctx.save();

    ctx.beginPath();

    ctx.arc(

        this.x,

        this.y,

        this.radius,

        0,

        Math.PI * 2

    );

    ctx.fillStyle =
    `rgba(255,235,170,${this.alpha})`;

    ctx.fill();

    ctx.restore();

}

}

for(let i=0;i<60;i++){

    particles.push(

        new Particle()

    );

}

function animateParticles(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const t = performance.now();
    particles.forEach(p=>{
        p.update(t);
        p.draw();
    });

    if(!timeline.removed){
        requestAnimationFrame(animateParticles);
    }
}

let openingStart = 0;

window.addEventListener("load", () => {

    openingStart = performance.now();

    requestAnimationFrame(openingLoop);

});

function openingLoop(){

    const elapsed=

performance.now()-openingStart;

    if(
        elapsed>=1800 &&

        !timeline.particles

    ){

       timeline.particles = true;

       canvas.style.opacity = "1";

        animateParticles();

    }

    if(

        elapsed>=2600 &&

        !timeline.energy

    ){

        timeline.energy=true;

        energy.style.animation=

"energyBirth 1.8s ease forwards, energyPulse 2.4s ease-in-out infinite";

    }

    if(

        elapsed>=5200 &&

        !timeline.vortex

    ){

        timeline.vortex=true;

        vortex.style.animation=

"vortexBreath 6s ease-in-out infinite";

    }

    if(

        elapsed>=7600 &&

        !timeline.emblem

    ){

        timeline.emblem=true;

        emblem.style.animation=

"emblemReveal 1.6s cubic-bezier(.22,1,.36,1) forwards";

    }

    if(

        elapsed>=10400 &&

        !timeline.identity

    ){

        timeline.identity=true;

        identity.style.animation=

"identityReveal 1.3s ease forwards";

    }

    if(

        elapsed>=13800 &&

        !timeline.gateway

    ){

        timeline.gateway=true;

        gateway.style.animation=

"gatewayReveal 1.6s ease forwards";

    }


if(
    elapsed>=15600 &&
    !timeline.exit
){
    timeline.exit=true;
    loader.classList.add("fade-out");
        setTimeout(
    ()=>{

        loader.remove();

        timeline.removed = true;

        requestAnimationFrame(()=>{

            const siteContent =
                document.getElementById("site-content");

            siteContent.style.opacity = "1";
            siteContent.style.visibility = "visible";
            siteContent.style.pointerEvents = "auto";

            const portfolio =
                document.querySelector(".portfolio");

            portfolio.style.opacity = "1";
            portfolio.style.visibility = "visible";
            portfolio.style.pointerEvents = "auto";

        });

    },
    1050
);
}

    if(

        !timeline.exit

    ){

        requestAnimationFrame(

            openingLoop

        );

    }

}

