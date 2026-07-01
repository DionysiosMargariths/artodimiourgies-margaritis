const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");
const navItems = document.querySelectorAll(".nav-links a");

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

document.addEventListener("click", (event) => {
    const clickedInsideMenu = navLinks.contains(event.target);
    const clickedMenuButton = menuToggle.contains(event.target);

    if(!clickedInsideMenu && !clickedMenuButton){
        navLinks.classList.remove("active");
    }
});

navItems.forEach((item) => {
    item.addEventListener("click", () => {
        navLinks.classList.remove("active");
    });
});

const revealElements = document.querySelectorAll(".reveal, .reveal-left, .reveal-right");

function revealOnScroll(){
    revealElements.forEach((element) => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const revealPoint = 120;

        if(elementTop < windowHeight - revealPoint){
            element.classList.add("active");
        }
    });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

const hero = document.querySelector(".hero");
const heroContent = document.querySelector(".hero-content");

window.addEventListener("scroll", () => {
    const scrollPosition = window.scrollY;

    hero.style.backgroundPositionY = `${scrollPosition * 0.4}px`;
    heroContent.style.transform = `translateY(${-200 + scrollPosition * 0.15}px)`;
});

const productModal = document.getElementById("product-modal");
const modalClose = document.getElementById("modal-close");
const modalTitle = document.getElementById("modal-title");
const modalList = document.getElementById("modal-list");

const productData = {
    bread: {
        title: "Η Συλλογή Ψωμιών",
        items: [
            "Λαδόψωμο",
            "Προζυμένιο",
            "Φόρμα",
            "Σουσαμένιο",
            "Χωριάτικο",
            "Εστιατορίου",
            "Ολικής",
            "Πολύσπορο",
            "Καλαμποκίσιο", 
            "Ημίλευκο",
            "Καρβέλι",
            "Πρόσφορο"
        ]
    },

    pies: {
        title: "Πίτες & Σφολιάτες",
        items: [
            "Ζαμπόν-Κασέρι",
            "Λουκανικόπιτα",
            "Πίτσα",
            "Πεϊνιρλί", 
            "Γραβιέρα",
            "Τυρόπιτα",
            "Πατατόπιτα",
            "Μεσογειακό",
            "Σπανακόπιτα",
            "Κρέμα",
            "Κιμάς"
        ]
    },

    koulouria: {
        title: "Κουλούρια",
        items: [
            "Κουλούρι Θεσσαλονίκης",
            "Βουτήματα",
            "Κριτσίνια"
        ]
    },

    croissants: {
        title: "Κρουασάν",
        items: [
            "Κρουασάν Βουτύρου",
            "Κρουασάν Σοκολάτας",
            "Mini Κρουασάν"
        ]
    }
};

document.querySelectorAll("[data-modal]").forEach((box) => {
    box.addEventListener("click", () => {
        const modalType = box.getAttribute("data-modal");
        const data = productData[modalType];

        modalTitle.textContent = data.title;
        modalList.innerHTML = "";

        data.items.forEach((item) => {
            const li = document.createElement("li");
            li.innerHTML = `<span class="gold-bullet">✦</span> ${item}`;
            modalList.appendChild(li);
        });

        productModal.classList.add("active");
        document.body.classList.add("no-scroll");
    });
});

function closeModal(){
    productModal.classList.remove("active");
    document.body.classList.remove("no-scroll");
}

modalClose.addEventListener("click", closeModal);

productModal.addEventListener("click", (event) => {
    if(event.target === productModal){
        closeModal();
    }
});

document.addEventListener("keydown", (event) => {
    if(event.key === "Escape"){
        closeModal();
    }
});

// ===========================
// GALLERY LIGHTBOX
// ===========================

const galleryItems = document.querySelectorAll(".gallery-item img");

const galleryModal = document.getElementById("galleryModal");
const galleryImage = document.getElementById("galleryImage");

const galleryClose = document.getElementById("galleryClose");
const galleryPrev = document.getElementById("galleryPrev");
const galleryNext = document.getElementById("galleryNext");
const galleryCounter = document.getElementById("galleryCounter");

let currentImage = 0;

// Άνοιγμα φωτογραφίας
galleryItems.forEach((img, index) => {

    img.addEventListener("click", () => {

        currentImage = index;

        galleryImage.src = img.src;
        updateGalleryCounter();

        galleryModal.classList.add("active");

        document.body.classList.add("no-scroll");

    });

});

// Κλείσιμο
function closeGallery(){

    galleryModal.classList.remove("active");

    document.body.classList.remove("no-scroll");

}

galleryClose.addEventListener("click", closeGallery);

// Κλικ έξω από τη φωτογραφία
galleryModal.addEventListener("click", (e)=>{

    if(e.target === galleryModal){

        closeGallery();

    }

});

// Επόμενη φωτογραφία
function nextImage(){

    currentImage++;

    if(currentImage >= galleryItems.length){

        currentImage = 0;

    }

    galleryImage.src = galleryItems[currentImage].src;
    updateGalleryCounter();

}

// Προηγούμενη φωτογραφία
function prevImage(){

    currentImage--;

    if(currentImage < 0){

        currentImage = galleryItems.length - 1;

    }

    galleryImage.src = galleryItems[currentImage].src;
    updateGalleryCounter();

}

galleryNext.addEventListener("click", nextImage);

galleryPrev.addEventListener("click", prevImage);

// Πλήκτρα πληκτρολογίου
document.addEventListener("keydown",(e)=>{

    if(!galleryModal.classList.contains("active")) return;

    if(e.key==="Escape"){

        closeGallery();

    }

    if(e.key==="ArrowRight"){

        nextImage();

    }

    if(e.key==="ArrowLeft"){

        prevImage();

    }

});

function updateGalleryCounter(){
    galleryCounter.textContent = `${currentImage + 1} / ${galleryItems.length}`;
}