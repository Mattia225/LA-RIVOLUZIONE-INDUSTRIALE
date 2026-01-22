const thumb = document.querySelector('.video-thumb');
const video = thumb.nextElementSibling;

// 1️⃣ Click sulla copertina → parte il video e copertina sparisce
thumb.addEventListener('click', () => {
    thumb.style.display = 'none';
    video.play();
});

// 2️⃣ Se il video parte per qualsiasi motivo (play manuale o tasto controls) → copertina sparisce
video.addEventListener('play', () => {
    thumb.style.display = 'none';
});
