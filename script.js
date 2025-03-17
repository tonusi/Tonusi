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

let startX = 0;
let threshold = 50; // Minimum swipe distance to trigger action
let isMoving = false; // Prevents new swipe until transition is complete

const carousel = document.querySelector('.carousel');

carousel.addEventListener('touchstart', (e) => {
  if (isMoving) return; // Block swipe if transition is in progress
  startX = e.touches[0].clientX;
});

carousel.addEventListener('touchend', () => {
  isMoving = false; // Allow new swipes after touch ends
});

carousel.addEventListener('touchmove', (e) => {
  if (isMoving) return; // Prevent swiping if already transitioning

  const moveX = e.touches[0].clientX - startX;
  if (Math.abs(moveX) < threshold) return; // Ignore small movements

  // Detect swipe direction
  if (moveX > 0) {
    // Swipe Right
    currentIndex = (currentIndex - 1 + images.length) % images.length;
  } else {
    // Swipe Left
    currentIndex = (currentIndex + 1) % images.length;
  }

  updateCarousel();
  startX = e.touches[0].clientX;
  isMoving = true; // Block additional swipes until touchend
});

// Fullscreen Swipe Handling
fullscreen.addEventListener('touchstart', (e) => {
  if (isMoving) return;
  startX = e.touches[0].clientX;
});

fullscreen.addEventListener('touchend', () => {
  isMoving = false; // Allow new swipes after touch ends
});

fullscreen.addEventListener('touchmove', (e) => {
  if (isMoving) return;

  const moveX = e.touches[0].clientX - startX;
  if (Math.abs(moveX) < threshold) return;

  if (moveX > 0) {
    // Swipe Right
    currentIndex = (currentIndex - 1 + images.length) % images.length;
  } else {
    // Swipe Left
    currentIndex = (currentIndex + 1) % images.length;
  }

  updateCarousel();
  fullscreen.style.backgroundImage = `url(${images[currentIndex]})`;
  isMoving = true;
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
