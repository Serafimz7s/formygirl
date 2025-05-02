class Bubble {
    constructor(container) {
        this.element = document.createElement('div');
        this.element.className = 'bubble';
        container.appendChild(this.element);
        
        this.size = Math.random() * 150 + 50;
        this.x = Math.random() * window.innerWidth;
        this.y = Math.random() * window.innerHeight;
        this.velocityX = (Math.random() - 0.5) * 0.3;
        this.velocityY = (Math.random() - 0.5) * 0.3;
        
        this.element.style.width = `${this.size}px`;
        this.element.style.height = `${this.size}px`;
    }

    update(bubbles) {
        this.x += this.velocityX;
        this.y += this.velocityY;
        
        // Repulsão entre bolhas
        bubbles.forEach(bubble => {
            if(bubble !== this) {
                const dx = bubble.x - this.x;
                const dy = bubble.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const minDistance = (this.size/2 + bubble.size/2) * 1.2;

                if(distance < minDistance) {
                    const angle = Math.atan2(dy, dx);
                    const force = (minDistance - distance) * 0.005;
                    
                    this.velocityX -= Math.cos(angle) * force;
                    this.velocityY -= Math.sin(angle) * force;
                }
            }
        });

        // Limites da tela
        if(this.x <= 0 || this.x >= window.innerWidth - this.size) this.velocityX *= -1;
        if(this.y <= 0 || this.y >= window.innerHeight - this.size) this.velocityY *= -1;

        this.element.style.transform = `translate(${this.x}px, ${this.y}px)`;
    }
}

// Initialize bubbles
const bubblesContainer = document.querySelector('.bubbles-container');
const bubbles = Array.from({ length: 10 }, () => new Bubble(bubblesContainer));

function animate() {
    bubbles.forEach(bubble => bubble.update(bubbles));
    requestAnimationFrame(animate);
}
animate();

// Image navigation
const images = ['hawkinha.png', 'hawkinha1.png', 'hawkinha2.png', 'hawkinha3.png', 'hawkinha4.png', 'hawkinha5.png'];
let currentImage = 0;

function changeImage(direction) {
    const imgContainer = document.querySelector('.img-container');
    const currentImg = document.querySelector('.profile-img.active');
    
    currentImage = (currentImage + direction + images.length) % images.length;
    
    const newImg = document.createElement('img');
    newImg.src = images[currentImage];
    newImg.className = 'profile-img';
    
    imgContainer.appendChild(newImg);
    setTimeout(() => {
        newImg.classList.add('active');
        currentImg.classList.remove('active');
    }, 10);
    
    setTimeout(() => currentImg.remove(), 500);
}

// Smooth parallax effect
window.addEventListener('mousemove', (e) => {
    if(window.innerWidth > 768) { // Only on desktop
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;
        bubblesContainer.style.transform = `translate(${x}px, ${y}px)`;
    }
});

// Add line-index for poem animation
document.querySelectorAll('.poema-line').forEach((line, index) => {
    line.style.setProperty('--line-index', index);
});

// Mobile detection and adjustments
function isMobile() {
    return window.innerWidth <= 768;
}

if(isMobile()) {
    document.body.classList.add('mobile');
    // Adjust bubble container size
    bubblesContainer.style.height = '150vh';
    
    // Disable some animations for performance
    const style = document.createElement('style');
    style.textContent = `
        .poema-line {
            animation: none !important;
            opacity: 0.9 !important;
        }
    `;
    document.head.appendChild(style);
}