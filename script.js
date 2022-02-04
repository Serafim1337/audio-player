const playButton = document.querySelector(".animation");
const leftButton = document.querySelector(".left");
const rightButton = document.querySelector(".right");
const currentBackground = document.querySelector(".background");
const currentTrackImage = document.querySelector("#track-image");

//!---------------------- buttons effects

playButton.addEventListener("click", playHandler);
playButton.addEventListener("click", audioOperator);
function playHandler() {
  document.querySelector("#first").classList.toggle("pause");
  document.querySelector("#second").classList.toggle("pause");
}

leftButton.addEventListener("mousedown", buttonPressed);
leftButton.addEventListener("mouseup", buttonReleased);
leftButton.addEventListener("click", audioOperator);
rightButton.addEventListener("mousedown", buttonPressed);
rightButton.addEventListener("mouseup", buttonReleased);
rightButton.addEventListener("click", audioOperator);

function buttonPressed(event) {
  event.target.classList.add("clicked");
}
function buttonReleased() {
  event.target.classList.remove("clicked");
}

//!----------------------- timeline controller

const timeline = document.querySelector(".timeline");
const progress = document.querySelector(".progress");
timeline.addEventListener("click", timelineHandler);

function timelineHandler(event) {
  const clickCoordinateX = event.clientX;
  const timelineLeft = event.target.offsetLeft;
  const timelineRight = event.target.getBoundingClientRect().right;
  const timelineWidth = event.target.getBoundingClientRect().width;
  const progressCoordinateInside = clickCoordinateX - timelineLeft;

  let progressCoordinateX =
    event.clientX - event.target.offsetLeft - progress.offsetWidth / 2 + "px";

  progress.style.left = progressCoordinateX;

  const timeToSet = (progressCoordinateInside / timelineWidth) * audio.duration;
  audio.currentTime = timeToSet;
}

//!-------------------- pause checker

function isPaused() {
  return playButton.firstElementChild.classList.contains("pause")
    ? true
    : false;
}

//!----------------------- audio function

let audio = new Audio();
audio.src = "assets/audio/0.mp3";
audio.volume = 0.1;

let currentTrack = 0;
let playlist = {
  0: "assets/audio/0.mp3",
  1: "assets/audio/1.mp3",
};

let trackNames = {
  0: "Hollywood Undead - Riot",
  1: "Bicep - Glue",
};

const trackTiming = document.querySelector("#track-timing");
const trackName = document.querySelector("#track-name");
trackName.textContent = `${trackNames[currentTrack]}`;

//!------ changing track on the end automatically
audio.onended = function () {
  currentTrack++;
  if (playlist[currentTrack]) {
    audio.src = playlist[currentTrack];
    audio.play();
  } else {
    currentTrack = 0;
    audio.src = playlist[0];
    audio.play();
  }
  currentBackground.style.backgroundImage = `url("assets/img/${currentTrack}.jpg")`;
  currentTrackImage.src = `assets/img/${currentTrack}.jpg`;
  trackName.innerHTML = `${trackNames[currentTrack]}`;
  progress.style.left = "";
};

//!------ online progress changing
audio.ontimeupdate = function () {
  if (
    progress.getBoundingClientRect().left <=
    timeline.getBoundingClientRect().right
  ) {
    progress.style.left =
      (audio.currentTime / audio.duration) *
        timeline.getBoundingClientRect().width -
      progress.offsetWidth / 2 +
      "px";
  }
};

function audioOperator(event) {
  //! play/pause

  if (
    event.target.parentElement === playButton ||
    event.target === playButton
  ) {
    switch (isPaused()) {
      case true:
        audio.play();
        break;
      case false:
        audio.pause();
        break;
    }
  }

  switch (event.target.id) {
    //! previous track
    case "prev":
      currentTrack--;

      if (playlist[currentTrack]) {
        audio.src = playlist[currentTrack];
        if (isPaused()) {
          audio.play();
        }
      } else {
        currentTrack = Object.keys(playlist).length - 1;
        audio.src = playlist[currentTrack];

        if (isPaused()) {
          audio.play();
        }
      }

      currentBackground.style.backgroundImage = `url("assets/img/${currentTrack}.jpg")`;
      currentTrackImage.src = `assets/img/${currentTrack}.jpg`;
      trackName.innerHTML = `${trackNames[currentTrack]}`;
      progress.style.left = "";

      break;

    //! next track
    case "next":
      currentTrack++;

      if (playlist[currentTrack]) {
        audio.src = playlist[currentTrack];

        if (isPaused()) {
          audio.play();
        }
      } else {
        currentTrack = 0;
        audio.src = playlist[0];

        if (isPaused()) {
          audio.play();
        }
      }

      currentBackground.style.backgroundImage = `url("assets/img/${currentTrack}.jpg")`;
      currentTrackImage.src = `assets/img/${currentTrack}.jpg`;
      trackName.innerHTML = `${trackNames[currentTrack]}`;
      progress.style.left = "";

      break;
  }
}
