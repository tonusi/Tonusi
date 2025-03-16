// LOADING SCREEN HIDDING
const container = document.querySelector('.loading-screen');
const animatedDiv = document.querySelector('.logo');

animatedDiv.addEventListener('animationend', () => {
    container.style.display = 'none';
});

window.onload = () => {
    setTimeout(() => {
        document.querySelector('.main-content').classList.add('visible');
    }, 1000);
};


const images = [
    'images/1.jpg',
    'images/2.jpg',
    'images/3.jpg',
    'images/4.jpg'
];

let currentIndex = 1;

// Add full-screen div to the page
const fullscreen = document.createElement('div');
fullscreen.className = 'fullscreen';
document.body.appendChild(fullscreen);

function updateCarousel() {
    const leftIndex = (currentIndex === 0) ? images.length - 1 : currentIndex - 1;
    const rightIndex = (currentIndex === images.length - 1) ? 0 : currentIndex + 1;

    document.querySelector('.carousel-item.left').style.backgroundImage = `url(${images[leftIndex]})`;
    document.querySelector('.carousel-item.center').style.backgroundImage = `url(${images[currentIndex]})`;
    document.querySelector('.carousel-item.right').style.backgroundImage = `url(${images[rightIndex]})`;
}

let startY = 0;
let threshold = 50; // Minimum swipe distance to trigger the action
let minMove = 10;   // Minimum move to consider it as a swipe
let isSwiping = false; // Prevent multiple swipes at once

document.querySelector('.carousel').addEventListener('touchstart', (e) => {
  startY = e.touches[0].clientY;
  isSwiping = false; // Reset flag when starting touch
});

document.querySelector('.carousel').addEventListener('touchmove', (e) => {
  const moveY = e.touches[0].clientY - startY;

  // Check if the user moved enough to consider it a swipe
  if (Math.abs(moveY) > minMove) {
    isSwiping = true;
  }

  // If the swipe distance exceeds the threshold, perform the action
  if (isSwiping) {
    if (moveY > threshold) {
      // Swipe down
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      updateCarousel();
      startY = e.touches[0].clientY;
      isSwiping = false; // Reset flag after action
    }

    if (moveY < -threshold) {
      // Swipe up
      currentIndex = (currentIndex + 1) % images.length;
      updateCarousel();
      startY = e.touches[0].clientY;
      isSwiping = false; // Reset flag after action
    }
  }
});

// For Swipe on Mobile in Fullscreen
fullscreen.addEventListener('touchstart', (e) => {
    fullscreenStartX = e.touches[0].clientX;
});

fullscreen.addEventListener('touchmove', (e) => {
    const moveX = e.touches[0].clientX - fullscreenStartX;

    if (moveX > 50) {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateCarousel();
        fullscreen.style.backgroundImage = `url(${images[currentIndex]})`;
        fullscreenStartX = e.touches[0].clientX;
    }

    if (moveX < -50) {
        currentIndex = (currentIndex + 1) % images.length;
        updateCarousel();
        fullscreen.style.backgroundImage = `url(${images[currentIndex]})`;
        fullscreenStartX = e.touches[0].clientX;
    }
});

// Show Full Screen on Click
document.querySelectorAll('.carousel-item').forEach(item => {
    item.addEventListener('click', () => {
        fullscreen.style.backgroundImage = item.style.backgroundImage;
        fullscreen.classList.add('active');
    });
});


// Close Full Screen on Click
fullscreen.addEventListener('click', () => {
    fullscreen.classList.remove('active');
});

updateCarousel();
