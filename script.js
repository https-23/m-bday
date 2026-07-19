document.addEventListener("DOMContentLoaded", () => {
    const screens = document.querySelectorAll(".screen");
    
    // स्क्रीन बदलने का फंक्शन (इसमें लिफ़ाफ़े का Auto-Reset लगाया है)
    function showScreen(screenId) {
        screens.forEach(screen => {
            screen.classList.remove("active");
        });
        const targetScreen = document.getElementById(screenId);
        if (targetScreen) {
            targetScreen.classList.add("active");
        }

        // लिफ़ाफ़ा (Envelope) हमेशा बंद रहे, उसके लिए रिसेट
        if (screenId === "screen4") {
            const envelopeWrapper = document.getElementById("envelope-wrapper");
            const envelopeNextBtn = document.getElementById("envelopeNextBtn");
            const clickHint = document.querySelector(".click-hint");
            
            if (envelopeWrapper) envelopeWrapper.classList.remove("open");
            if (envelopeNextBtn) envelopeNextBtn.style.display = "none";
            if (clickHint) clickHint.style.display = "block";
        }
    }

    // ===================================
    // Starting Page Buttons & Music
    // ===================================
    const yesBtn = document.getElementById("yesBtn");
    const noBtn = document.getElementById("noBtn");
    const tryAgainBtn = document.getElementById("tryAgain");

    if (yesBtn) {
        yesBtn.addEventListener("click", () => {
            const bgMusic = document.getElementById("bg-music");
            if (bgMusic) {
                bgMusic.volume = 0.5;
                bgMusic.play().catch(error => console.log("Music play error:", error));
            }
            showScreen("screen2");
        });
    }
    if (noBtn) {
        noBtn.addEventListener("click", () => showScreen("angry"));
    }
    if (tryAgainBtn) {
        tryAgainBtn.addEventListener("click", () => showScreen("screen1"));
    }
    
    // ===================================
    // Screen 2 Transition
    // ===================================
    const screen2 = document.getElementById("screen2");
    if (screen2) {
        screen2.addEventListener("click", (e) => {
            if(!e.target.classList.contains("backBtn")) {
                showScreen("screen3");
            }
        });
    }

    // ===================================
    // Next Buttons (Heart Icons)
    // ===================================
    const s3Next = document.querySelector("#screen3 .heartNext");
    if (s3Next) s3Next.addEventListener("click", () => showScreen("screen4"));

    const s5Next = document.querySelector("#screen5 .heartNext");
    if (s5Next) s5Next.addEventListener("click", () => showScreen("screen6"));

    const s6Next = document.querySelector("#screen6 .heartNext");
    if (s6Next) s6Next.addEventListener("click", () => showScreen("screen7"));

    const s7Next = document.querySelector("#screen7 .heartNext");
    if (s7Next) s7Next.addEventListener("click", () => showScreen("screen8"));

    // ===================================
    // Screen 4 (Envelope Animation)
    // ===================================
    const envelopeWrapper = document.getElementById("envelope-wrapper");
    const envelopeNextBtn = document.getElementById("envelopeNextBtn");
    const clickHint = document.querySelector(".click-hint");
    
    if (envelopeWrapper) {
        envelopeWrapper.addEventListener("click", () => {
            envelopeWrapper.classList.add("open");
            if (clickHint) clickHint.style.display = "none"; 
            
            if (envelopeNextBtn) {
                setTimeout(() => {
                    envelopeNextBtn.style.display = "inline-block";
                }, 1000);
            }
        });
    }

    if (envelopeNextBtn) {
        envelopeNextBtn.addEventListener("click", () => showScreen("screen5"));
    }

    // ===================================
    // Back Buttons Logic
    // ===================================
    const backButtons = document.querySelectorAll(".backBtn");
    backButtons.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation(); 
            const targetScreen = btn.getAttribute("data-back");
            if (targetScreen) {
                showScreen(targetScreen);
            }
        });
    });

    // ===================================
    // Step 1: Floating Hearts / Flowers
    // ===================================
    function createFallingItem() {
        const container = document.getElementById("floating-hearts");
        if (!container) return;

        const item = document.createElement("div");
        item.classList.add("falling-item");
        const shapes = ["🌸", "💖", "✨", "🌸", "🤍"];
        item.innerHTML = shapes[Math.floor(Math.random() * shapes.length)];
        item.style.left = Math.random() * 100 + "vw";
        item.style.animationDuration = Math.random() * 3 + 3 + "s";
        item.style.fontSize = Math.random() * 10 + 15 + "px";

        container.appendChild(item);
        setTimeout(() => {
            item.remove();
        }, 6000);
    }
    setInterval(createFallingItem, 400);

    // ===================================
    // Step 3: Typewriter Effect
    // ===================================
    function typeWriterEffect(element, text, speed = 50) {
        let i = 0;
        element.innerHTML = ""; 
        function typing() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(typing, speed);
            }
        }
        typing();
    }

    const screen8 = document.getElementById("screen8");
    if (screen8) {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (screen8.classList.contains("active") && !screen8.dataset.typed) {
                    const messageElement = screen8.querySelector("p");
                    if (messageElement) {
                        const originalText = messageElement.innerText;
                        typeWriterEffect(messageElement, originalText, 30); 
                        screen8.dataset.typed = "true"; 
                    }
                }
            });
        });
        observer.observe(screen8, { attributes: true, attributeFilter: ['class'] });
    }

    // ===================================
    // Step 4: 3D Pop-up Scratch Logic
    // ===================================
    const messages = {
        1: `<strong style="font-size: 1.4rem; color: #c0392b;">🎂 Happy Birthday!</strong><br><br><span style="font-size: 1.1rem; color: #5d4037;">Wishing you a year full of happiness, good health, and countless reasons to smile. Have an amazing birthday!</span>`,
        2: `<strong style="font-size: 1.4rem; color: #c0392b;">💛 A Small Apology</strong><br><br><span style="font-size: 1.1rem; color: #5d4037;">If I ever made you uncomfortable or hurt you in any way, I'm truly sorry. That was never my intention.</span>`,
        3: `<strong style="font-size: 1.4rem; color: #c0392b;">💌 Just One Thing</strong><br><br><span style="font-size: 1.1rem; color: #5d4037;">You don't have to reply. I just hope you read this. That's enough for me.</span>`,
        4: `<strong style="font-size: 1.4rem; color: #c0392b;">🌸 Take Care</strong><br><br><span style="font-size: 1.1rem; color: #5d4037;">No matter what, I genuinely wish the best for you. Stay happy, stay safe, and enjoy your special day.</span>`
    };

    const miniCards = document.querySelectorAll('.mini-card');
    const modal = document.getElementById('scratch-modal');
    const modalContent = document.getElementById('modal-message-content');
    const closeModal = document.getElementById('close-modal');
    const canvas = document.getElementById('popup-scratch-pad');

    if (miniCards.length > 0 && modal && modalContent && closeModal && canvas) {
        miniCards.forEach(card => {
            card.addEventListener('click', () => {
                const id = card.getAttribute('data-id');
                modalContent.innerHTML = messages[id];
                modal.classList.add('show');
                
                setTimeout(initPopupScratchCard, 300);
            });
        });

        closeModal.addEventListener('click', () => {
            modal.classList.remove('show');
        });
    }

    function initPopupScratchCard() {
        const ctx = canvas.getContext('2d');
        const rect = canvas.parentElement.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;

        ctx.fillStyle = '#b3b3b3';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.font = "bold 24px Arial";
        ctx.fillStyle = "#ffffff";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("Scratch Me! ✨", canvas.width / 2, canvas.height / 2);

        let isDrawing = false;

        function scratch(e) {
            if (!isDrawing) return;
            e.preventDefault();
            const canvasRect = canvas.getBoundingClientRect();
            let x, y;
            
            if (e.touches && e.touches.length > 0) {
                x = e.touches[0].clientX - canvasRect.left;
                y = e.touches[0].clientY - canvasRect.top;
            } else {
                x = e.clientX - canvasRect.left;
                y = e.clientY - canvasRect.top;
            }

            ctx.globalCompositeOperation = 'destination-out';
            ctx.beginPath();
            ctx.arc(x, y, 25, 0, Math.PI * 2); 
            ctx.fill();
        }

        canvas.addEventListener('mousedown', () => isDrawing = true);
        canvas.addEventListener('mouseup', () => isDrawing = false);
        canvas.addEventListener('mousemove', scratch);
        
        canvas.addEventListener('touchstart', (e) => {
            isDrawing = true;
            scratch(e);
        }, {passive: false});
        canvas.addEventListener('touchend', () => isDrawing = false);
        canvas.addEventListener('touchmove', scratch, {passive: false});
    }

});
                
