// Carousel Configuration
const totalImages = 15;
let currentSlide = 0;
let autoPlayInterval;

// Generate placeholder images
const images = [
  {
    id: 1,
    url: "plans/plan1.jpeg",
    thumbnail: "plans/plan1.jpeg",
    alt: "General Plan 1"
  },
  {
    id: 2,
    url: "plans/plan2.jpeg",
    thumbnail: "plans/plan2.jpeg",
    alt: "General Plan 2"
  },
  {
    id: 3,
    url: "plans/plan3.jpeg",
    thumbnail: "plans/plan3.jpeg",
    alt: "General Plan 3"
  },
  {
    id: 4,
    url: "plans/plan4.jpeg",
    thumbnail: "plans/plan4.jpeg",
    alt: "General Plan 4"
  },
  {
    id: 5,
    url: "plans/plan5.jpeg",
    thumbnail: "plans/plan5.jpeg",
    alt: "General Plan 5"
  },
  {
    id: 6,
    url: "plans/plan6.jpeg",
    thumbnail: "plans/plan6.jpeg",
    alt: "General Plan 6"
  },
  {
    id: 7,
    url: "plans/plan7.jpeg",
    thumbnail: "plans/plan7.jpeg",
    alt: "General Plan 7"
  },
  {
    id: 8,
    url: "plans/plan8.jpeg",
    thumbnail: "plans/plan8.jpeg",
    alt: "General Plan 8"
  },
  {
    id: 9,
    url: "plans/plan9.jpeg",
    thumbnail: "plans/plan9.jpeg",
    alt: "General Plan 9"
  },
  {
    id: 10,
    url: "plans/plan10.jpeg",
    thumbnail: "plans/plan10.jpeg",
    alt: "General Plan 10"
  }
];



// Initialize carousel
function initCarousel() {
    generateThumbnails();
    generateDots();
    updateCarousel();
    startAutoPlay();
}

// Generate thumbnail images
function generateThumbnails() {
    const thumbnailScroll = document.getElementById('thumbnailScroll');
    
    images.forEach((image, index) => {
        const thumbnail = document.createElement('div');
        thumbnail.className = `thumbnail ${index === 0 ? 'active' : ''}`;
        thumbnail.onclick = () => goToSlide(index);
        
        const img = document.createElement('img');
        img.src = image.thumbnail;
        img.alt = image.alt;
        
        thumbnail.appendChild(img);
        thumbnailScroll.appendChild(thumbnail);
    });
}

// Generate dot indicators
function generateDots() {
    const dotIndicators = document.getElementById('dotIndicators');
    
    images.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = `dot ${index === 0 ? 'active' : ''}`;
        dot.onclick = () => goToSlide(index);
        dotIndicators.appendChild(dot);
    });
}

// Update carousel display
function updateCarousel() {
    const mainImage = document.getElementById('mainImage');
    const currentSlideEl = document.getElementById('currentSlide');
    const thumbnails = document.querySelectorAll('.thumbnail');
    const dots = document.querySelectorAll('.dot');
    
    // Update main image
    mainImage.src = images[currentSlide].url;
    mainImage.alt = images[currentSlide].alt;
    
    // Update counter
    currentSlideEl.textContent = currentSlide + 1;
    
    // Update active thumbnail
    thumbnails.forEach((thumb, index) => {
        thumb.classList.toggle('active', index === currentSlide);
    });
    
    // Update active dot
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
    
    // Scroll thumbnail into view
    const activeThumbnail = thumbnails[currentSlide];
    if (activeThumbnail) {
        activeThumbnail.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            
        });
    }
}

// Navigate to specific slide
function goToSlide(index) {
    currentSlide = index;
    updateCarousel();
    resetAutoPlay();
}

// Navigate to next slide
function nextSlide() {
    currentSlide = (currentSlide + 1) % totalImages;
    updateCarousel();
    resetAutoPlay();
}

// Navigate to previous slide
function previousSlide() {
    currentSlide = (currentSlide - 1 + totalImages) % totalImages;
    updateCarousel();
    resetAutoPlay();
}

// Auto-play functionality
function startAutoPlay() {
    autoPlayInterval = setInterval(() => {
        currentSlide = (currentSlide + 1) % totalImages;
        updateCarousel();
    }, 200000); // Change slide every 3 seconds
}

function resetAutoPlay() {
    clearInterval(autoPlayInterval);
    startAutoPlay();
}

// Event Listeners
document.getElementById('nextBtn').addEventListener('click', nextSlide);
document.getElementById('prevBtn').addEventListener('click', previousSlide);

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        previousSlide();
    } else if (e.key === 'ArrowRight') {
        nextSlide();
    }
});
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxClose = document.getElementById("lightboxClose");
const mainImage = document.getElementById("mainImage");

// Open lightbox on image click
mainImage.addEventListener("click", () => {
  lightboxImage.src = images[currentSlide].url;
  lightbox.classList.add("active");
  clearInterval(autoPlayInterval); // stop carousel
});

// Close lightbox
function closeLightbox() {
  lightbox.classList.remove("active");
  startAutoPlay(); // resume carousel
}

lightboxClose.addEventListener("click", closeLightbox);

// Close when clicking outside image
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});


// Pause auto-play on hover
const carouselMain = document.querySelector('.carousel-main');
carouselMain.addEventListener('mouseenter', () => {
    clearInterval(autoPlayInterval);
});

carouselMain.addEventListener('mouseleave', () => {
    startAutoPlay();
});

// Location link handler
document.getElementById('locationLink').addEventListener('click', (e) => {
    e.preventDefault();
    const mapsUrl = 'https://maps.google.com';
    window.open(mapsUrl, '_blank');
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});


// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// Initialize carousel when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCarousel);
} else {
    initCarousel();
}

console.log('General Plans carousel loaded successfully');
console.log('Replace placeholder images with actual plan images');

gsap.registerPlugin(ScrollTrigger);

const lenis = new Lenis({
  smooth: true,
  duration: 1,
  easing: (t) => 1 - Math.pow(1 - t, 3), // smooth ease
  smoothTouch: false
});

function raf(time) {
  lenis.raf(time);
  ScrollTrigger.update();
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Sync ScrollTrigger with Lenis
ScrollTrigger.scrollerProxy(document.body, {
  scrollTop(value) {
    return arguments.length
      ? lenis.scrollTo(value, { immediate: true })
      : lenis.scroll.instance.scroll.y;
  },
  getBoundingClientRect() {
    return {
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: window.innerHeight
    };
  }
});

ScrollTrigger.addEventListener("refresh", () => lenis.update());
ScrollTrigger.refresh();
