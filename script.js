// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const mobileOverlay = document.getElementById('mobileOverlay');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

// Toggle mobile menu
mobileMenuToggle.addEventListener('click', () => {
    mobileMenuToggle.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    mobileOverlay.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu when clicking overlay
mobileOverlay.addEventListener('click', () => {
    mobileMenuToggle.classList.remove('active');
    mobileMenu.classList.remove('active');
    mobileOverlay.classList.remove('active');
    document.body.style.overflow = '';
});

// Close mobile menu when clicking on links
mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
        mobileOverlay.classList.remove('active');
        document.body.style.overflow = '';
    });
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

// Plan cards click handler
const planCards = document.querySelectorAll('.plan-card');

planCards.forEach(card => {
    card.addEventListener('click', () => {
        const planType = card.getAttribute('data-plan');
        const planPages = {
            'general': 'general-plans.html',
            'child': 'children-plans.html',
            'hni': 'hni.html',
            'retirement': 'retirement-plans.html'
        };
        
        if (planPages[planType]) {
            window.location.href = planPages[planType];
        } else {
            console.log(`Navigating to ${planType} plan page`);
        }
    });
});



// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe sections for animations
const sections = document.querySelectorAll('.plans-section, .contact-section');
sections.forEach(section => {
    observer.observe(section);
});

// Location link handler - Replace this URL with actual Google Maps location
document.getElementById('locationLink').addEventListener('click', (e) => {
    e.preventDefault();
    // Replace this with your actual Google Maps URL
    const mapsUrl = 'https://maps.app.goo.gl/ss59558pqVyDMP798';
    window.open(mapsUrl, '_blank');
    console.log('Location link clicked - update with actual Google Maps URL');
});

// Add hover effect sound (optional - commented out by default)
/*
planCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        // Add subtle scale animation
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});
*/

// Parallax effect for hero section - removed
/*
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-image');
    
    if (heroImage && scrolled < window.innerHeight) {
        heroImage.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});
*/

// Button ripple effect
const buttons = document.querySelectorAll('.btn');

buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple CSS dynamically
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Console message
console.log('LIC Website loaded successfully');
console.log('Remember to:');
console.log('1. Replace placeholder images with actual images');
console.log('2. Update Google Maps location URL');
console.log('3. Add contact information (address, phone, email)');
console.log('4. Link plan cards to their respective pages');

if (planType === 'general') {
  window.location.href = 'general-plans.html';
}
