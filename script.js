// Initialize Lucide icons
lucide.createIcons();

// Add click handler for download button
document.querySelector('.btn').addEventListener('click', function() {
    // Create a loading animation
    this.innerHTML = '<i class="loading-spinner"></i> Downloading...';
    
    // Simulate download delay
    setTimeout(() => {
        this.innerHTML = '<i data-lucide="download"></i> Download CV';
        alert('CV downloaded successfully!');
        lucide.createIcons(); // Recreate icons after changing innerHTML
    }, 1500);
});

// Dark mode toggle
const themeToggle = document.querySelector('.theme-toggle');
const lightIcon = document.querySelector('.light-icon');
const darkIcon = document.querySelector('.dark-icon');

themeToggle.addEventListener('click', () => {
    document.body.dataset.theme = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
    lightIcon.style.display = document.body.dataset.theme === 'dark' ? 'none' : 'block';
    darkIcon.style.display = document.body.dataset.theme === 'dark' ? 'block' : 'none';
    
    // Animate transition
    document.body.style.transition = 'background 0.5s ease';
    setTimeout(() => {
        document.body.style.transition = '';
    }, 500);
});

// Animate skill bars on scroll
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress-bar');
    skillBars.forEach(bar => {
        const rect = bar.getBoundingClientRect();
        if (rect.top <= window.innerHeight && rect.bottom >= 0) {
            bar.style.width = bar.parentElement.dataset.progress || '0%';
            bar.style.opacity = '1';
            bar.style.transform = 'scaleX(1)';
        }
    });
}

window.addEventListener('scroll', animateSkillBars);

// Add smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Parallax effect for floating shapes
document.addEventListener('mousemove', (e) => {
    const shapes = document.querySelectorAll('.shape');
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 2;
        const moveX = (x * speed) - (speed / 2);
        const moveY = (y * speed) - (speed / 2);
        shape.style.transform = `translate(${moveX}%, ${moveY}%) rotate(${moveX * 10}deg)`;
    });
});

// Add navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 25, 47, 0.95)';
        navbar.style.boxShadow = '0 10px 30px -10px rgba(2,12,27,0.7)';
    } else {
        navbar.style.background = 'transparent';
        navbar.style.boxShadow = 'none';
    }
});

// Add animation on scroll
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});
