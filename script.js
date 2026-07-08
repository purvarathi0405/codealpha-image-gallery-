const galleryImages = document.querySelectorAll(".gallery .image");
const filterButtons = document.querySelectorAll(".filter-buttons button");

const lightbox = document.querySelector(".lightbox");
const lightboxImg = document.querySelector(".lightbox-img");
const closeBtn = document.querySelector(".close");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

let currentImages = [...galleryImages];
let currentIndex = 0;

filterButtons.forEach(button => {
    button.addEventListener("click", () => {

        filterButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        const filter = button.dataset.filter;

        currentImages = [];

        galleryImages.forEach(image => {

            if (filter === "all" || image.classList.contains(filter)) {
                image.style.display = "block";
                currentImages.push(image);
            } else {
                image.style.display = "none";
            }

        });

    });
});

galleryImages.forEach(image => {

    image.addEventListener("click", () => {

        currentIndex = currentImages.indexOf(image);

        lightbox.classList.add("active");
        lightboxImg.src = image.querySelector("img").src;

    });

});

closeBtn.addEventListener("click", () => {
    lightbox.classList.remove("active");
});

nextBtn.addEventListener("click", () => {

    currentIndex++;

    if (currentIndex >= currentImages.length) {
        currentIndex = 0;
    }

    lightboxImg.src =
        currentImages[currentIndex].querySelector("img").src;

});

prevBtn.addEventListener("click", () => {

    currentIndex--;

    if (currentIndex < 0) {
        currentIndex = currentImages.length - 1;
    }

    lightboxImg.src =
        currentImages[currentIndex].querySelector("img").src;

});


lightbox.addEventListener("click", (e) => {

    if (e.target === lightbox) {
        lightbox.classList.remove("active");
    }

});

document.addEventListener("keydown", (e) => {

    if (!lightbox.classList.contains("active")) return;

    if (e.key === "ArrowRight") {
        nextBtn.click();
    }

    if (e.key === "ArrowLeft") {
        prevBtn.click();
    }

    if (e.key === "Escape") {
        lightbox.classList.remove("active");
    }

});