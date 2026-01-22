const thumb = document.querySelector('.video-thumb');
const video = thumb.nextElementSibling;

thumb.addEventListener('click', () => {
    thumb.style.display = 'none';
    video.play();
