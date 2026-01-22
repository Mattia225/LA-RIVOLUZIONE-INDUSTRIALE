const playerWrapper = document.querySelector('.img-quinta6');
const thumb = playerWrapper.querySelector('.video-thumb');
const video = playerWrapper.querySelector('video');
const playPauseBtn = playerWrapper.querySelector('.play-pause');
const fullscreenBtn = playerWrapper.querySelector('.fullscreen');
const controls = playerWrapper.querySelector('.custom-controls');

let hideControlsTimeout;
let isFullscreen = false;

// Mostra/nascondi controlli al movimento del mouse
function showControls() {
    controls.style.opacity = 1;
    clearTimeout(hideControlsTimeout);
    hideControlsTimeout = setTimeout(() => {
        controls.style.opacity = 0;
    }, 2000);
}

// Aggiorna la barra progresso
const progressBar = controls.querySelector('.progress-bar');
const progress = progressBar.querySelector('.progress');

function updateProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progress.style.width = percent + '%';
}

video.addEventListener('timeupdate', updateProgress);

// Play/Pause e nascondi copertina (mai ricompare)
playPauseBtn.addEventListener('click', () => {
    if (video.paused) {
        video.play();
        playPauseBtn.textContent = '⏸';
        thumb.style.display = 'none';
    } else {
        video.pause();
        playPauseBtn.textContent = '▶';
    }
});

// Fine video
video.addEventListener('ended', () => {
    playPauseBtn.textContent = '▶';
});

// Mostra controlli al movimento del mouse
playerWrapper.addEventListener('mousemove', showControls);

// Barra progresso click/drag
progressBar.addEventListener('click', (e) => {
    const rect = progressBar.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    video.currentTime = percent * video.duration;
    thumb.style.display = 'none';
});

progressBar.addEventListener('mousedown', () => {
    thumb.style.display = 'none';
});

// Fullscreen toggle
fullscreenBtn.addEventListener('click', () => {
    if (!isFullscreen) {
        playerWrapper.classList.add('fullscreen');
        isFullscreen = true;
    } else {
        playerWrapper.classList.remove('fullscreen');
        isFullscreen = false;
    }
});

// Menu risoluzione
const resolutionMenu = document.createElement('div');
resolutionMenu.classList.add('resolution-menu');
playerWrapper.appendChild(resolutionMenu);

// Esempio di pulsanti risoluzione (puoi aggiungere tutte quelle che vuoi)
['144p','240p','360p','480p','720p','1080p'].forEach(res => {
    const btn = document.createElement('button');
    btn.textContent = res;
    btn.addEventListener('click', () => {
        console.log('Cambia risoluzione a', res);
        // qui puoi mettere la logica di cambiare src video se hai più file
    });
    resolutionMenu.appendChild(btn);
});

// Apri/chiudi menu risoluzione
const settingsBtn = document.createElement('button');
settingsBtn.textContent = '⚙';
settingsBtn.classList.add('settings-btn');
controls.appendChild(settingsBtn);

settingsBtn.addEventListener('click', () => {
    resolutionMenu.style.display = resolutionMenu.style.display === 'block' ? 'none' : 'block';
});

// Nascondi menu se clic fuori
document.addEventListener('click', (e) => {
    if (!resolutionMenu.contains(e.target) && e.target !== settingsBtn) {
        resolutionMenu.style.display = 'none';
    }
});
