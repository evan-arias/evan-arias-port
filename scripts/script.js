// Projects data
const projects = [
    {
        title: "Guessing Game (Python)",
        description: "A number guessing game with difficulty levels and engaging text art to welcome players.",
        link: "https://onlinegdb.com/pnHnYod1k",
        image: "./assets/Guess Game Art.jpg"
    },
    {
        title: "Blackjack (Python)",
        description: "A text-based Blackjack game where players compete against the dealer, enhanced with stylish text art for the interface.",
        link: "https://onlinegdb.com/VFvgxM93o",
        image: "./assets/BlackJack Art.jpg"
    },
    {
        title: "Caesar Cipher (Python)",
        description: "A fun tool to encrypt and decrypt messages using the Caesar cipher technique, featuring decorative text art.",
        link: "https://onlinegdb.com/JPk8rywHL",
        image: "./assets/Caesar Cipher Art.jpg"
    },
    {
        title: "Hangman (Python)",
        description: "A text-based Hangman game with ASCII art to depict the progress of the game visually.",
        link: "https://onlinegdb.com/5GtQLUC0H",
        image: "./assets/Hangman Art.jpg"
    },
    {
        title: "Rock Paper Scissors (Python)",
        description: "A simple implementation of the classic game where players compete against the computer, enhanced with creative text art.",
        link: "https://onlinegdb.com/J4F1HI9BL",
        image: "./assets/Rock Paper Scissors.jpg"
    },
    {
        title: "Treasure Island (Python)",
        description: "An interactive adventure game with decisions that lead to different outcomes, featuring immersive text art.",
        link: "https://onlinegdb.com/0t4dzNcPz",
        image: "./assets/Treasure Island Art.jpg"
    }
];

// Navigation functionality
function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.page-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Show the selected section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    // Update navbar active state
    updateNavbarActiveState(sectionId);
    
    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Update navbar active state
function updateNavbarActiveState(activeSection) {
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        const href = link.getAttribute('onclick');
        if (href && href.includes(activeSection)) {
            link.style.color = 'var(--accent-color)';
        } else {
            link.style.color = 'var(--text-primary)';
        }
    });
}

// Populate projects
function loadProjects() {
    const projectsList = document.getElementById('projects-list');
    if (!projectsList) return;
    
    projectsList.innerHTML = '';
    
    projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.classList.add('project-card');
        
        projectCard.innerHTML = `
            <div class="project-image">
                <img src="${project.image}" alt="${project.title} Word Art" loading="lazy">
            </div>
            <div class="project-content">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <a href="${project.link}" target="_blank" rel="noopener noreferrer" class="view-code-button">
                    <i class="fas fa-code"></i> View Code
                </a>
            </div>
        `;
        
        projectsList.appendChild(projectCard);
    });
}

// Initialize EmailJS when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS with your public key
    emailjs.init("A5pEJmgj6WYJf9gqx");
    
    // Load projects when page loads
    loadProjects();
    
    // Initialize typing effect
    initTypingEffect();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize contact form
    initContactForm();
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Typing effect for tagline
function initTypingEffect() {
    const typingText = document.getElementById('typing-text');
    if (!typingText) return;
    
    const originalText = typingText.textContent;
    typingText.textContent = '';
    
    let i = 0;
    function typeWriter() {
        if (i < originalText.length) {
            typingText.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    }
    
    // Start typing effect after a delay
    setTimeout(typeWriter, 1000);
}

// Intersection Observer for scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe elements with fade-in class
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
}

// Parallax effect for floating shapes
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const shapes = document.querySelectorAll('.shape');
    
    shapes.forEach((shape, index) => {
        const speed = 0.5 + (index * 0.1);
        shape.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
    });
});

// Enhanced hover effects for project cards
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects after projects are loaded
    setTimeout(() => {
        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
    }, 500);
});

// Contact form functionality
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Validation
        if (!name || !email || !message) {
            showNotification('Please fill out all fields.', 'error');
            return;
        }
        
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }
        
        // Send email using EmailJS (you'll need to set this up)
        sendEmail(name, email, message);
    });
}

// Email sending functionality using EmailJS
function sendEmail(name, email, message) {
    // Show loading state
    const submitButton = document.querySelector('.submit-button');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    // EmailJS configuration with your actual IDs
    emailjs.send('service_d20ghur', 'template_yne0hk7', {
        name: name,
        email: email,
        message: message
    })
    .then(function(response) {
        showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
        document.getElementById('contact-form').reset();
    })
    .catch(function(error) {
        showNotification('Sorry, there was an error sending your message. Please try again or contact me directly.', 'error');
        console.error('EmailJS error:', error);
    })
    .finally(function() {
        // Reset button state
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    });
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    
    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? 'var(--accent-color)' : '#ff4444'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
        max-width: 400px;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOutRight 0.3s ease-out forwards';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Add notification animations to CSS dynamically
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .notification-close:hover {
        opacity: 0.7;
    }
`;
document.head.appendChild(notificationStyles);

// Random floating animation for shapes
function animateShapes() {
    document.querySelectorAll('.shape').forEach(shape => {
        const randomX = Math.random() * 100;
        const randomY = Math.random() * 100;
        const randomScale = 0.8 + Math.random() * 0.4;
        
        shape.style.transition = 'all 8s ease-in-out';
        shape.style.left = randomX + '%';
        shape.style.top = randomY + '%';
        shape.style.transform = `scale(${randomScale})`;
    });
}

// Animate shapes every 10 seconds
setInterval(animateShapes, 10000);

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    // Navigate with arrow keys (optional feature)
    const sections = ['home', 'about', 'projects', 'contact'];
    const currentSection = document.querySelector('.page-section.active').id;
    const currentIndex = sections.indexOf(currentSection);
    
    if (e.key === 'ArrowRight' && currentIndex < sections.length - 1) {
        showSection(sections[currentIndex + 1]);
    } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
        showSection(sections[currentIndex - 1]);
    }
});

// Add smooth page transitions
function addPageTransitions() {
    const style = document.createElement('style');
    style.textContent = `
        .page-section {
            transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
        }
        
        .page-section:not(.active) {
            opacity: 0;
            transform: translateY(20px);
        }
        
        .page-section.active {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
}

// Initialize page transitions
addPageTransitions();