const playButton = document.querySelector(".animation");
const leftButton = document.querySelector(".left");
const rightButton = document.querySelector(".right");

playButton.addEventListener("click", playHandler);
function playHandler() {
  document.querySelector("#first").classList.toggle("pause");
  document.querySelector("#second").classList.toggle("pause");
}

leftButton.addEventListener("mousedown", buttonPressed);
leftButton.addEventListener("mouseup", buttonReleased);
rightButton.addEventListener("mousedown", buttonPressed);
rightButton.addEventListener("mouseup", buttonReleased);

function buttonPressed(event) {
  event.target.classList.add("clicked");
}
function buttonReleased() {
  event.target.classList.remove("clicked");
}
