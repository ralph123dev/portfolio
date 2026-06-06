const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});


document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
        }
    });
}, observerOptions);


document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
});


window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});


let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.background = 'rgba(15, 23, 42, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(15, 23, 42, 0.95)';
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});


document.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.05)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});


document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        const link = this.querySelector('.project-link');
        if (link && !link.classList.contains('coming-soon')) {
            link.style.transform = 'translateX(10px)';
        }
    });
    
    card.addEventListener('mouseleave', function() {
        const link = this.querySelector('.project-link');
        if (link) {
            link.style.transform = 'translateX(0)';
        }
    });
});


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});


function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}


function createParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 4 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = 'rgba(99, 102, 241, 0.3)';
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animation = `float ${Math.random() * 3 + 3}s ease-in-out infinite`;
        particle.style.animationDelay = Math.random() * 2 + 's';
        hero.appendChild(particle);
    }
}


function animateProfileLogoLoop() {
    const profileImg = document.getElementById('profile-img');
    const logoImg = document.getElementById('logo-img');
    
    if (!profileImg || !logoImg) return;
    
    let isShowingPhoto = true;
    
    function switchToLogo() {
        profileImg.classList.add('fade-out');
        setTimeout(() => {
            profileImg.style.display = 'none';
            logoImg.style.display = 'block';
            logoImg.classList.remove('fade-out');
            logoImg.classList.add('fade-in');
            isShowingPhoto = false;
            
            setTimeout(switchToPhoto, 5000);
        }, 1500);
    }
    
    function switchToPhoto() {
        logoImg.classList.add('fade-out');
        setTimeout(() => {
            logoImg.style.display = 'none';
            profileImg.style.display = 'block';
            profileImg.classList.remove('fade-out');
            profileImg.classList.add('fade-in');
            isShowingPhoto = true;
            
            setTimeout(switchToLogo, 5000);
        }, 1500);
    }
    
    
    setTimeout(switchToLogo, 5000);
}


const proMenuLink = document.getElementById('pro-menu-link');
const proPopup = document.getElementById('pro-popup');
const proPopupClose = document.querySelector('.pro-popup-close');
const contactTypeSelect = document.getElementById('contact-type');
const contactInfoGroup = document.getElementById('contact-info-group');
const contactInfoInput = document.getElementById('contact-info');
const contactInfoLabel = document.getElementById('contact-info-label');
const proForm = document.getElementById('pro-form');
const successAnimation = document.getElementById('success-animation');


if (proMenuLink) {
    proMenuLink.addEventListener('click', (e) => {
        e.preventDefault();
        proPopup.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
}


if (proPopupClose) {
    proPopupClose.addEventListener('click', () => {
        proPopup.classList.remove('active');
        document.body.style.overflow = '';
    });
}


if (proPopup) {
    proPopup.addEventListener('click', (e) => {
        if (e.target === proPopup) {
            proPopup.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}


if (contactTypeSelect) {
    contactTypeSelect.addEventListener('change', (e) => {
        const contactType = e.target.value;
        if (contactType) {
            contactInfoGroup.style.display = 'block';
            contactInfoInput.required = true;
            
            switch(contactType) {
                case 'whatsapp':
                case 'telegram':
                    contactInfoLabel.textContent = 'Numéro de téléphone *';
                    contactInfoInput.type = 'tel';
                    contactInfoInput.placeholder = 'Ex: +237 620 391 950';
                    break;
                case 'facebook':
                case 'instagram':
                    contactInfoLabel.textContent = 'Lien du profil *';
                    contactInfoInput.type = 'url';
                    contactInfoInput.placeholder = 'Ex: https://facebook.com/votre-profil';
                    break;
            }
        } else {
            contactInfoGroup.style.display = 'none';
            contactInfoInput.required = false;
        }
    });
}


function createConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const confetti = [];
    const colors = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#3b82f6'];
    
    class ConfettiParticle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = -10;
            this.size = Math.random() * 8 + 4;
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.speedX = (Math.random() - 0.5) * 4;
            this.speedY = Math.random() * 3 + 2;
            this.rotation = Math.random() * 360;
            this.rotationSpeed = (Math.random() - 0.5) * 10;
            this.gravity = 0.1;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.speedY += this.gravity;
            this.rotation += this.rotationSpeed;
        }
        
        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation * Math.PI / 180);
            ctx.fillStyle = this.color;
            ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
            ctx.restore();
        }
    }
    

    for (let i = 0; i < 150; i++) {
        confetti.push(new ConfettiParticle());
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        confetti.forEach((particle, index) => {
            particle.update();
            particle.draw();
            
            if (particle.y > canvas.height) {
                confetti.splice(index, 1);
            }
        });
        
        if (confetti.length > 0) {
            requestAnimationFrame(animate);
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }
    
    animate();
}


if (proForm) {
    proForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(proForm);
        const submitButton = proForm.querySelector('.btn-submit');
        const originalText = submitButton.textContent;
        
       
        submitButton.disabled = true;
        submitButton.textContent = 'Envoi en cours...';
        
        try {
            const response = await fetch('https://formspree.io/f/mpzgqwpy', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            console.log('Formspree response status:', response.status);
            console.log('Formspree response ok:', response.ok);
            
            if (response.ok) {
                const result = await response.json();
                console.log('Formspree response data:', result);
                
                // Fermer la popup
                proPopup.classList.remove('active');
                
                // Afficher l'animation de succès
                successAnimation.classList.add('active');
                createConfetti();
                
                // Réinitialiser le formulaire
                proForm.reset();
                contactInfoGroup.style.display = 'none';
                
                // Fermer l'animation après 4 secondes
                setTimeout(() => {
                    successAnimation.classList.remove('active');
                    document.body.style.overflow = '';
                }, 4000);
            } else {
                const errorData = await response.json();
                console.error('Formspree error:', errorData);
                throw new Error('Erreur lors de l\'envoi');
            }
        } catch (error) {
            alert('Une erreur est survenue. Veuillez réessayer.');
            console.error('Submission error:', error);
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = originalText;
        }
    });
}


document.addEventListener('DOMContentLoaded', () => {
    
    animateProfileLogoLoop();
    
   
    setTimeout(() => {
        document.querySelectorAll('.animate-on-scroll').forEach((el, index) => {
            setTimeout(() => {
                el.style.transitionDelay = `${index * 0.1}s`;
            }, 100);
        });
    }, 500);
});


window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease-in';
        document.body.style.opacity = '1';
    }, 100);
});


const cursor = document.createElement('div');
cursor.className = 'custom-cursor';
cursor.style.cssText = `
    width: 20px;
    height: 20px;
    border: 2px solid #6366f1;
    border-radius: 50%;
    position: fixed;
    pointer-events: none;
    z-index: 9999;
    transition: transform 0.1s ease;
    display: none;
`;
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX - 10 + 'px';
    cursor.style.top = e.clientY - 10 + 'px';
});

document.querySelectorAll('a, button, .btn').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.display = 'block';
        cursor.style.transform = 'scale(1.5)';
    });
    el.addEventListener('mouseleave', () => {
        cursor.style.display = 'none';
        cursor.style.transform = 'scale(1)';
    });
});

