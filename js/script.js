const playerWrapper = document.querySelector('.img-quinta6');
const thumb = playerWrapper.querySelector('.video-thumb');
const video = playerWrapper.querySelector('video');
const playPauseBtn = playerWrapper.querySelector('.play-pause');
const fullscreenBtn = playerWrapper.querySelector('.fullscreen');
const controls = playerWrapper.querySelector('.custom-controls');

let hideControlsTimeout;

// Mostra/nascondi controlli al movimento del mouse
function showControls() {
    controls.style.opacity = 1;
    clearTimeout(hideControlsTimeout);
    hideControlsTimeout = setTimeout(() => {
        controls.style.opacity = 0;
    }, 2000);
}

// Play/Pause e nascondi copertina
playPauseBtn.addEventListener('click', () => {
    thumb.style.display = 'none';
    if (video.paused) {
        video.play();
        playPauseBtn.textContent = '⏸';
    } else {
        video.pause();
        playPauseBtn.textContent = '▶';
    }
});

// Aggiorna lo stato del video quando finisce
video.addEventListener('ended', () => {
    video.pause();
    playPauseBtn.textContent = '▶';
});

// Mostra controlli quando si muove il mouse
playerWrapper.addEventListener('mousemove', showControls);

// Fullscreen toggle
let isFullscreen = false;
fullscreenBtn.addEventListener('click', () => {
    if (!isFullscreen) {
        video.style.position = 'fixed';
        video.style.top = 0;
        video.style.left = 0;
        video.style.width = '100vw';
        video.style.height = '100vh';
        video.style.zIndex = 1000;
        isFullscreen = true;
    } else {
        video.style.position = 'static';
        video.style.width = '889px';
        video.style.height = '460px';
        video.style.zIndex = 1;
        isFullscreen = false;
    }
});

// Optional: selezione risoluzione dal menu
const resolutionMenu = document.createElement('div');
resolutionMenu.style.position = 'absolute';
resolutionMenu.style.right = '50px';
resolutionMenu.style.bottom = '50px';
resolutionMenu.style.background = 'rgba(0,0,0,0.7)';
resolutionMenu.style.padding = '5px 10px';
resolutionMenu.style.borderRadius = '8px';
resolutionMenu.style.display = 'none';
resolutionMenu.style.c
