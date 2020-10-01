// scroll-scrub.js

const html = document.documentElement;
const canvas = document.getElementById("scroll-scrub");
const context = canvas.getContext("2d");

const frameCount = 131;
const currentFrame = index => (
  `./images/${index.toString().padStart(4, '0')}.jpg`
)

const preloadImages = () => {
  for (let i = 1; i < frameCount; i++) {
    const img = new Image();
    img.src = currentFrame(i);
  }
};

// Set canvas dimensions
canvas.width=1920;
canvas.height=1080;
// context.canvas.width=window.innerWidth;
// context.canvas.height=window.innerHeight;
// context.canvas.height=window.innerWidth * (9 / 16);

// Create, load and draw the image
const img = new Image()
img.src = currentFrame(1); // we'll make this dynamic in the next step, for now we'll just load image 1 of our sequence
img.onload=function(){
  context.drawImage(img, 0, 0);
}

const updateImage = index => {
  img.src = currentFrame(index);
  context.drawImage(img, 0, 0);
}

window.addEventListener('scroll', () => {  
  const scrollTop = html.scrollTop;
  const maxScrollTop = html.scrollHeight - window.innerHeight;
  const scrollFraction = scrollTop / maxScrollTop;
  const frameIndex = Math.min(
    frameCount - 1,
    Math.floor(scrollFraction * frameCount)
  );

  requestAnimationFrame(() => updateImage(frameIndex + 1))
});

preloadImages();

gsap.registerPlugin(ScrollTrigger);

gsap.to('#label_01', {
  scrollTrigger: {
    trigger: '#trigger_01',
    toggleActions: 'restart pause reverse pause',
    start: 'center center',
    end: 'center',
    scrub: 0.5,
    markers: true,
  },
  x: -200,
  y: -10,
  opacity: 0,
  duration: 3,
});
