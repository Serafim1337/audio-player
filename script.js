const playButton = document.querySelector(".animation");
const leftButton = document.querySelector(".left");
const rightButton = document.querySelector(".right");

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

//!-------------------- pause checker

function isPaused() {
  return playButton.firstElementChild.classList.contains("pause")
    ? true
    : false;
}

//!----------------------- audio function

function audioOperator(event) {
  if (event.target.parentElement === playButton) {
    console.log("targeted");
  }

  switch (event.target.id) {
    case "prev":
      console.log("prev");
      break;
    case "next":
      console.log("next");
      break;
  }
}
