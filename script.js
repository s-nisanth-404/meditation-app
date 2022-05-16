const song = document.querySelector('.song');
const play = document.querySelector('.play');
const video = document.querySelector('.video-container video')

const outline = document.querySelector('.moving-outline circle');
const outlineLength = outline.getTotalLength();

const sounds = document.querySelectorAll('.sound-container button')

const timeDisplay = document.querySelector('.time-display');
const timeSelect = document.querySelectorAll(".time-container button");

let fakeDuration = 10;

sounds.forEach(sound => {
    sound.addEventListener("click", function() {
      song.src = this.getAttribute("data-sound");
      video.src = this.getAttribute("data-video");
      play.src = './svg/play.svg';
      checkPlaying(song);
    });
  });

play.addEventListener('click', () => {
    checkPlayings(song);
});

timeSelect.forEach(option => {
    option.addEventListener("click", function() {
      fakeDuration = option.getAttribute("data-time");
    });
  });

const checkPlayings = music => 
    {
        if (music.paused)
            {
                music.play();
                video.play();
                play.src = './svg/pause.svg';
            }
        else
            {
                music.pause();
                video.pause();
                play.src = './svg/play.svg';
            }
    }

outline.style.strokeDashoffset = outlineLength;
outline.style.strokeDasharray = outlineLength;
timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(
    fakeDuration % 60
)}`;
    
song.ontimeupdate = function() {
  let currentTime = song.currentTime;
  let elapsed = fakeDuration - currentTime;
  let seconds = Math.floor(elapsed % 60);
  let minutes = Math.floor(elapsed / 60);
  timeDisplay.textContent = `${minutes}:${seconds}`;
  let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
  outline.style.strokeDashoffset = progress;

  if (currentTime >= fakeDuration) {
    song.pause();
    song.currentTime = 0;
    play.src = "./svg/replay.svg";
    video.pause();
  }
};