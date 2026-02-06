// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mainMenu = document.getElementById('mainMenu');

mobileMenuBtn.addEventListener('click', () => {
    mainMenu.classList.toggle('active');
    mobileMenuBtn.innerHTML = mainMenu.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if(targetElement) {
            // Close mobile menu if open
            mainMenu.classList.remove('active');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Slider functionality
const sliders = {
    events: {
        currentIndex: 0,
        slides: document.querySelectorAll('[data-slider="events"]')
    },
    news: {
        currentIndex: 0,
        slides: document.querySelectorAll('[data-slider="news"]')
    }
};

function showSlide(sliderName, index) {
    const slider = sliders[sliderName];
    
    // Hide all slides
    slider.slides.forEach(slide => {
        slide.classList.remove('active');
    });
    
    // Ensure index is within bounds
    if (index >= slider.slides.length) {
        index = 0;
    }
    if (index < 0) {
        index = slider.slides.length - 1;
    }
    
    // Show the current slide
    slider.slides[index].classList.add('active');
    slider.currentIndex = index;
}

// Initialize sliders
Object.keys(sliders).forEach(sliderName => {
    if (sliders[sliderName].slides.length > 0) {
        showSlide(sliderName, 0);
    }
});

// Slider controls
document.querySelectorAll('.slider-btn').forEach(button => {
    button.addEventListener('click', function() {
        const sliderName = this.getAttribute('data-slider');
        const isNext = this.classList.contains('next-btn');
        const currentIndex = sliders[sliderName].currentIndex;
        
        showSlide(sliderName, isNext ? currentIndex + 1 : currentIndex - 1);
    });
});

// Form validation
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        
        // Validate name
        const nameInput = document.getElementById('name');
        const nameError = document.getElementById('nameError');
        if (!nameInput.value.trim()) {
            nameError.style.display = 'block';
            isValid = false;
        } else {
            nameError.style.display = 'none';
        }
        
        // Validate email
        const emailInput = document.getElementById('email');
        const emailError = document.getElementById('emailError');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailInput.value.trim() || !emailRegex.test(emailInput.value)) {
            emailError.style.display = 'block';
            isValid = false;
        } else {
            emailError.style.display = 'none';
        }
        
        // Validate message
        const messageInput = document.getElementById('message');
        const messageError = document.getElementById('messageError');
        if (!messageInput.value.trim()) {
            messageError.style.display = 'block';
            isValid = false;
        } else {
            messageError.style.display = 'none';
        }
        
        if (isValid) {
            // Show success message
            const successMessage = document.getElementById('successMessage');
            successMessage.style.display = 'block';
            
            // Reset form
            contactForm.reset();
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 5000);
        }
    });
}

// Auto-advance sliders
setInterval(() => {
    Object.keys(sliders).forEach(sliderName => {
        if (sliders[sliderName].slides.length > 0) {
            const currentIndex = sliders[sliderName].currentIndex;
            showSlide(sliderName, currentIndex + 1);
        }
    });
}, 5000);


// Add EmailJS initialization (get your User ID from dashboard)
emailjs.init("YOUR_USER_ID");

// Modify your form submission
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // EmailJS template parameters
    const templateParams = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };
    
    // Send email
    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            // Show success message
            document.getElementById('successMessage').style.display = 'block';
            contactForm.reset();
        }, function(error) {
            console.log('FAILED...', error);
            alert('Message failed to send. Please try again.');
        });
});