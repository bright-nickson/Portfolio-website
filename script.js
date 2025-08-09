// Scroll Fade-Up Animation
const faders = document.querySelectorAll('.fade-up');
const appearOptions = {
    threshold: 0.2,
    rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
    });
}, appearOptions);

faders.forEach(fade => {
    appearOnScroll.observe(fade);
});

// Upload & Display Media
document.getElementById("upload-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const fileInput = document.getElementById("file-input");
    const mediaContainer = document.getElementById("media-container");

    if (fileInput.files.length === 0) {
        alert("Please select a file to upload!");
        return;
    }

    mediaContainer.innerHTML = "";

    Array.from(fileInput.files).forEach(file => {
        const fileURL = URL.createObjectURL(file);

        if (file.type.startsWith("image/")) {
            const img = document.createElement("img");
            img.src = fileURL;
            mediaContainer.appendChild(img);
        } else if (file.type.startsWith("video/")) {
            const video = document.createElement("video");
            video.src = fileURL;
            video.controls = true;
            mediaContainer.appendChild(video);
        }
    });

    fileInput.value = "";
});
