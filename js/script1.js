document.addEventListener("DOMContentLoaded", () => {
    const wrapper = document.querySelector('.img-quinta6');
    const thumb = wrapper.querySelector('.video-thumb');
    const video = wrapper.querySelector('video');
    const playPause = wrapper.querySelector('.play-pause');
    const progress = wrapper.querySelector('.progress');
    const progressBar = wrapper.querySelector('.progress-bar');
    const volume = wrapper.querySelector('.volume');
    const fullscreen = wrapper.querySelector('.fullscreen');
    const controls = wrapper.querySelector('.custom-controls');

    let hideTimeout;

    // Funzione per mostrare i controls temporaneamente
    const showControls = () => {
        controls.style.opacity = '1';
        clearTimeout(hideTimeout);
        hideTimeout = setTimeout(() => {
            controls.style.opacity = '0';
        }, 2000); // nasconde dopo 2 secondi di inattività
    };

    // --- Click sulla copertina ---
    thumb.addEventListener('click', () => {
        thumb.style.display = 'none'; // sparisce la copertina
        video.play();
        playPause.textContent = '⏸';
        showControls();
    });

    // --- Play/Pause Button ---
    playPause.addEventListener('click', () => {
        // Togli copertina se visibile
        if (thumb.style.display !== 'none') {
            thumb.style.display = 'none';
        }

        if(video.paused){
            video.play();
            playPause.textContent = '⏸';
        } else {
            video.pause();
            playPause.textContent = '▶';
        }
        showControls();
    });

    // --- Barra progresso ---
    video.addEventListener('timeupdate', () => {
        const percent = (video.currentTime / video.duration) * 100;
        progress.style.width = percent + '%';
    });

    progressBar.addEventListener('click', (e) => {
        const rect = progressBar.getBoundingClientRect();
        const pos = e.clientX - rect.left;
        const percent = pos / rect.width;
        video.currentTime = percent * video.duration;
        showControls();
    });

    // --- Volume ---
    volume.addEventListener('input', () => {
        video.volume = volume.value;
        showControls();
    });

    // --- Fullscreen ---
    fullscreen.addEventListener('click', () => {
        if (!document.fullscreenElement) {
            // Entra in fullscreen sul wrapper
            wrapper.requestFullscreen().then(() => {
                // Video riempie tutto in fullscreen
                video.style.width = '100%';
                video.style.height = '100%';
                video.style.objectFit = 'contain';
            });
        } else {
            // Esci dal fullscreen
            document.exitFullscreen().then(() => {
                // Torna alle dimensioni originali
                video.style.width = '889px';
                video.style.height = '460px';
                video.style.objectFit = 'cover';
            });
        }
    });

    // --- Mostra controls al movimento del mouse ---
    wrapper.addEventListener('mousemove', showControls);

    // Nascondi controls se mouse fermo
    showControls();
});
