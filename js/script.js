const thumb = document.querySelector('.video-thumb');
const video = thumb.nextElementSibling;




// 2️⃣ Se il video parte per qualsiasi motivo (play manuale o tasto controls) → copertina sparisce
video.addEventListener('play', () => {
    thumb.style.display = 'none';
});