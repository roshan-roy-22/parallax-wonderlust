let first = document.getElementById("first");
let last = document.getElementById("last");
let text = document.getElementById("text");

window.addEventListener('scroll', function () {
  var value = window.scrollY;
  first.style.top = value * 0.7 + 'px';
  last.style.bottom = value * 0.5 + 'px';
  text.style.top = value * 1 + 'px';
});


const parallaxGallery = document.querySelector('.parallax-container');
const handleOnDown = e => {
  parallaxGallery.dataset.mouseDownAt = e.clientX;
}
const handleOnUp = e => {
  parallaxGallery.dataset.prevPercentage = parallaxGallery.dataset.percentage;
  parallaxGallery.dataset.mouseDownAt = "0";
}
const handleOnMove = e => {
  if (parallaxGallery.dataset.mouseDownAt === '0') return;
     const mouseDelta = parseFloat(parallaxGallery.dataset.mouseDownAt) - e.clientX,
    maxDelta = Math.min(window.innerWidth / 2, 340);
    const percentage = (mouseDelta / maxDelta) * -100,
    nextPercentage = Math.max(Math.min(parseFloat(parallaxGallery.dataset.prevPercentage) + percentage, 0), -100);

    parallaxGallery.dataset.percentage = nextPercentage;

  parallaxGallery.style.transform = `translate(${nextPercentage}%, -50%)`;

  for (let image of parallaxGallery.getElementsByClassName('image')) {
    image.style.objectPosition = `${nextPercentage + 100}% 50%`;
  }
}

window.onmousedown = handleOnDown;
window.onmousemove = handleOnMove;
window.onmouseup = handleOnUp;

window.ontouchstart = e => handleOnDown(e.touches[0]);
window.ontouchmove = e => handleOnMove(e.touches[0]);
window.ontouchend = e => handleOnUp(e.touches[0]);
