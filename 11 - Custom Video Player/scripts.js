/* Get our Elements */

const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const ranges = player.querySelectorAll('.player__slider');
const skipButtons = player.querySelectorAll('[data-skip]');
const fullScreen = player.querySelector('.full-screen');


/* Build out function */

let isRangeUpdate = false;
let isScrubbing = false;

function togglePlay(){
    const method = video.paused ? 'play' : 'pause';
    video[method]();
}

function updateButton(){
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
}

function skip() {
    video.currentTime += parseFloat(this.dataset.skip)
}

function handleRangeUpdate()
{   if(!isRangeUpdate) return;
    video[this.name] = this.value;
}

function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e)
{
    if(!isScrubbing) return;
   const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
   video.currentTime = scrubTime;
   

}

function fullScreenView()
{
    player.fullScreen = true;
    console.log('what');
}

/* Hook up the event listeners */
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);


skipButtons.forEach(button => button.addEventListener('click', skip))

ranges.forEach(range => range.addEventListener('mousedown', () =>
    isRangeUpdate = true));
ranges.forEach(range => range.addEventListener('mouseout', () =>
    isRangeUpdate = false));
ranges.forEach(range => range.addEventListener('mouseup', () =>
    isRangeUpdate = false));

ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', scrub);
progress.addEventListener('mousedown', () => isScrubbing = true);
progress.addEventListener('mouseup', () => isScrubbing = false);

fullScreen.addEventListener('click', fullScreenView);