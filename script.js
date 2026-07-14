// Multi-language Romantic Content Data
const loveQuotes = [
    { lang: 'English', text: '“In your smile, I see something more beautiful than the stars.”' },
    { lang: 'Tamil', text: '“உலகில் எத்தனையோ அழகான விஷயங்கள் இருக்கலாம், ஆனால் எனக்கு உன்னை விட அழகானது எதுவுமில்லை ஜமுனா.”' },
    { lang: 'Thanglish', text: '“En life-la vandha romba azhagana varam nee mattum dhan Jamuna. Un kooda irukura ovvoru sec-um special.”' },
    { lang: 'English', text: '“My heart beat belongs to you, and it beats for you every single day.”' },
    { lang: 'Tamil', text: '“என் இதயத்தின் ஒவ்வொரு துடிப்பும் உனக்காக மட்டுமே ஒலிக்கிறது!”' },
    { lang: 'Thanglish', text: '“Kanna mooduna un mugam dhan nyabagam varudhu. Naan unna avlo uyira love panren di.”' },
    { lang: 'English', text: '“You are the peace to my chaotic mind and the love of my life.”' },
    { lang: 'Tamil', text: '“உன் கரம் கோர்த்து நடக்கும் தூரம் மரணம் வரை தொடர வேண்டும்.”' }
];

// Authentication System Controller
function checkCredentials() {
    const user = document.getElementById('username').value.trim();
    const pass = document.getElementById('password').value;
    const errorElement = document.getElementById('error');

    if (user === 'jamuna' && pass === 'myheart@516') {
        errorElement.style.display = 'none';
        
        // Transition animation execution
        document.getElementById('login-card').classList.add('hidden');
        setTimeout(() => {
            document.getElementById('login-card').style.display = 'none';
            const dashboard = document.getElementById('dashboard-card');
            dashboard.classList.remove('hidden');
            loadQuotes();
        }, 400);
    } else {
        errorElement.style.display = 'block';
    }
}

function logout() {
    location.reload(); 
}

function loadQuotes() {
    const box = document.getElementById('quotes-box');
    box.innerHTML = '';
    loveQuotes.forEach(q => {
        box.innerHTML += `
            <div class="quote-card">
                <span class="lang-badge">${q.lang}</span>
                <div class="quote-text">${q.text}</div>
            </div>
        `;
    });
}

// --- ANTI-GRAVITY FLOATING SIMULATION ENGINE ---
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Particle {
    constructor() {
        this.reset(true);
    }

    reset(initPhase = false) {
        this.x = Math.random() * canvas.width;
        // If starting up, scatter particles across screen; otherwise start from bottom edge
        this.y = initPhase ? Math.random() * canvas.height : canvas.height + Math.random() * 40;
        this.size = Math.random() * 12 + 6;
        this.speedY = -(Math.random() * 1.2 + 0.4); // Negative Y value creates upwards movement
        this.speedX = Math.sin(Math.random() * 2) * 0.4;
        this.opacity = Math.random() * 0.5 + 0.3;
        this.type = Math.random() > 0.45 ? 'heart' : 'sparkle';
    }

    update() {
        this.y += this.speedY;
        this.x += this.speedX;
        
        // Recycle boundary check
        if (this.y < -20) {
            this.reset(false);
        }
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;

        if (this.type === 'heart') {
            ctx.fillStyle = '#FF6B6B';
            ctx.beginPath();
            ctx.moveTo(this.x, this.y + this.size / 4);
            ctx.quadraticCurveTo(this.x, this.y, this.x + this.size / 2, this.y);
            ctx.quadraticCurveTo(this.x + this.size, this.y, this.x + this.size, this.y + this.size / 3);
            ctx.quadraticCurveTo(this.x + this.size, this.y + (this.size * 2) / 3, this.x + this.size / 2, this.y + this.size);
            ctx.quadraticCurveTo(this.x, this.y + (this.size * 2) / 3, this.x, this.y + this.size / 3);
            ctx.quadraticCurveTo(this.x, this.y, this.x, this.y + this.size / 4);
            ctx.closePath();
            ctx.fill();
        } else {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size / 3, 0, Math.PI * 2);
            ctx.fillStyle = '#FF8E53';
            ctx.fill();
        }
        ctx.restore();
    }
}

function initParticles() {
    particles = [];
    for (let i = 0; i < 50; i++) {
        particles.push(new Particle());
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animate);
}

// Start runtime components
initParticles();
animate();