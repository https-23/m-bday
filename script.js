document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. CORE STATE MANAGEMENT ---
    const screens = document.querySelectorAll(".screen");
    let typeWriterTriggered = false;
    
    function showScreen(screenId) {
        screens.forEach(screen => screen.classList.remove("active"));
        const targetScreen = document.getElementById(screenId);
        if (targetScreen) {
            targetScreen.classList.add("active");
        }

        // Auto-Reset Envelope when navigating back/forth
        if (screenId === "screen4") {
            const envelopeWrapper = document.getElementById("envelope-wrapper");
            const envelopeNextBtn = document.getElementById("envelopeNextBtn");
            const clickHint = document.querySelector(".click-hint");
            
            if (envelopeWrapper) envelopeWrapper.classList.remove("open");
            if (envelopeNextBtn) envelopeNextBtn.style.display = "none";
            if (clickHint) clickHint.style.display = "block";
        }

        // Trigger Typewriter on Screen 8 only once
        if (screenId === "screen8" && !typeWriterTriggered) {
            triggerTypewriter();
            typeWriterTriggered = true;
        }
    }

    // --- 2. EVENT LISTENERS (NAVIGATION) ---
    document.getElementById("yesBtn")?.addEventListener("click", () => {
        const bgMusic = document.getElementById("bg-music");
        if (bgMusic) {
            bgMusic.volume = 0.5;
            bgMusic.play().catch(e => console.log("Audio permission pending until user interaction."));
        }
        showScreen("screen2");
    });
    
    document.getElementById("noBtn")?.addEventListener("click", () => showScreen("angry"));
    document.getElementById("tryAgain")?.addEventListener("click", () => showScreen("screen1"));

    // Screen 2 Anywhere Click (Except Back Button)
    document.getElementById("screen2")?.addEventListener("click", (e) => {
        if(!e.target.classList.contains("backBtn")) showScreen("screen3");
    });

    // Next Buttons Mapping
    const nextMap = {
        "#screen3 .heartNext": "screen4",
        "#screen5 .heartNext": "screen6",
        "#screen6 .heartNext": "screen7",
        "#screen7 .heartNext": "screen8"
    };

    Object.keys(nextMap).forEach(selector => {
        document.querySelector(selector)?.addEventListener("click", () => showScreen(nextMap[selector]));
    });

    // Back Buttons
    document.querySelectorAll(".backBtn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            showScreen(btn.getAttribute("data-back"));
        });
    });

    // --- 3. ENVELOPE LOGIC ---
    const envelopeWrapper = document.getElementById("envelope-wrapper");
    if (envelopeWrapper) {
        envelopeWrapper.addEventListener("click", () => {
            envelopeWrapper.classList.add("open");
            const clickHint = document.querySelector(".click-hint");
            if (clickHint) clickHint.style.display = "none"; 
            
            setTimeout(() => {
                const btn = document.getElementById("envelopeNextBtn");
                if(btn) btn.style.display = "inline-block";
            }, 1000);
        });
    }
    document.getElementById("envelopeNextBtn")?.addEventListener("click", () => showScreen("screen5"));


    // --- 4. HIGH PERFORMANCE PARTICLE SYSTEM (Canvas) ---
    const pCanvas = document.getElementById("particle-canvas");
    const pCtx = pCanvas.getContext("2d");
    let particles = [];
    const emojis = ["🌸", "💖", "✨", "🌸", "🤍"];

    function resizeCanvas() {
        pCanvas.width = window.innerWidth;
        pCanvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Particle {
        constructor() {
            this.reset();
            this.y = Math.random() * pCanvas.height; // Spread out initially
        }
        reset() {
            this.x = Math.random() * pCanvas.width;
            this.y = -50;
            this.size = Math.random() * 15 + 15; // 15px to 30px
            this.speed = Math.random() * 2 + 1.5;
            this.emoji = emojis[Math.floor(Math.random() * emojis.length)];
            this.rotation = Math.random() * 360;
            this.rotationSpeed = (Math.random() - 0.5) * 2;
        }
        update() {
            this.y += this.speed;
            this.rotation += this.rotationSpeed;
            if (this.y > pCanvas.height + 50) this.reset();
        }
        draw() {
            pCtx.save();
            pCtx.translate(this.x, this.y);
            pCtx.rotate(this.rotation * Math.PI / 180);
            pCtx.font = `${this.size}px Arial`;
            pCtx.textAlign = "center";
            pCtx.textBaseline = "middle";
            pCtx.globalAlpha = 0.6; // Slightly transparent
            pCtx.fillText(this.emoji, 0, 0);
            pCtx.restore();
        }
    }

    // Initialize 30 particles
    for (let i = 0; i < 30; i++) particles.push(new Particle());

    function animateParticles() {
        pCtx.clearRect(0, 0, pCanvas.width, pCanvas.height);
        particles.forEach(p => { p.update(); p.draw(); });
        requestAnimationFrame(animateParticles);
    }
    animateParticles(); // Start engine


    // --- 5. TYPEWRITER EFFECT ---
    function triggerTypewriter() {
        const pElement = document.getElementById("final-message");
        if (!pElement) return;
        const text = pElement.innerHTML.replace(/<br>/g, '\n'); // Maintain breaks
        pElement.innerHTML = "";
        let i = 0;
        
        function typing() {
            if (i < text.length) {
                let char = text.charAt(i);
                if (char === '\n') {
                    pElement.innerHTML += "<br>";
                } else {
                    pElement.innerHTML += char;
                }
                i++;
                setTimeout(typing, 35); // Speed
            }
        }
        typing();
    }


    // --- 6. SCRATCH CARD SYSTEM ---
    const messages = {
        1: `<strong style="font-size: 1.4rem; color: var(--primary-color);">🎂 Happy Birthday!</strong><br><br><span style="font-size: 1.1rem; color: var(--text-color);">Wishing you a year full of happiness, good health, and countless reasons to smile. Have an amazing birthday!</span>`,
        2: `<strong style="font-size: 1.4rem; color: var(--primary-color);">💛 A Small Apology</strong><br><br><span style="font-size: 1.1rem; color: var(--text-color);">If I ever made you uncomfortable or hurt you in any way, I'm truly sorry. That was never my intention.</span>`,
        3: `<strong style="font-size: 1.4rem; color: var(--primary-color);">💌 Just One Thing</strong><br><br><span style="font-size: 1.1rem; color: var(--text-color);">You don't have to reply. I just hope you read this. That's enough for me.</span>`,
        4: `<strong style="font-size: 1.4rem; color: var(--primary-color);">🌸 Take Care</strong><br><br><span style="font-size: 1.1rem; color: var(--text-color);">No matter what, I genuinely wish the best for you. Stay happy, stay safe, and enjoy your special day.</span>`
    };

    const modal = document.getElementById('scratch-modal');
    const modalContent = document.getElementById('modal-message-content');
    const scratchCanvas = document.getElementById('popup-scratch-pad');
    
    document.querySelectorAll('.mini-card').forEach(card => {
        card.addEventListener('click', () => {
            modalContent.innerHTML = messages[card.getAttribute('data-id')];
            modal.classList.add('show');
            setTimeout(initPopupScratchCard, 300); // Wait for modal animation
        });
    });

    document.getElementById('close-modal')?.addEventListener('click', () => modal.classList.remove('show'));

    function initPopupScratchCard() {
        const ctx = scratchCanvas.getContext('2d');
        const rect = scratchCanvas.parentElement.getBoundingClientRect();
        
        // Exact pixel mapping for sharpness
        scratchCanvas.width = rect.width;
        scratchCanvas.height = rect.height;

        ctx.fillStyle = '#b3b3b3';
        ctx.fillRect(0, 0, scratchCanvas.width, scratchCanvas.height);

        ctx.font = "bold 24px 'Fredoka', sans-serif";
        ctx.fillStyle = "#ffffff";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("Scratch Me! ✨", scratchCanvas.width / 2, scratchCanvas.height / 2);

        let isDrawing = false;

        function scratch(e) {
            if (!isDrawing) return;
            e.preventDefault();
            const canvasRect = scratchCanvas.getBoundingClientRect();
            let x = (e.touches ? e.touches[0].clientX : e.clientX) - canvasRect.left;
            let y = (e.touches ? e.touches[0].clientY : e.clientY) - canvasRect.top;

            ctx.globalCompositeOperation = 'destination-out';
            ctx.beginPath();
            ctx.arc(x, y, 25, 0, Math.PI * 2); 
            ctx.fill();
        }

        scratchCanvas.addEventListener('mousedown', () => isDrawing = true);
        scratchCanvas.addEventListener('mouseup', () => isDrawing = false);
        scratchCanvas.addEventListener('mousemove', scratch);
        
        scratchCanvas.addEventListener('touchstart', (e) => { isDrawing = true; scratch(e); }, {passive: false});
        scratchCanvas.addEventListener('touchend', () => isDrawing = false);
        scratchCanvas.addEventListener('touchmove', scratch, {passive: false});
    }
});
