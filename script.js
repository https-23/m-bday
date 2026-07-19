document.addEventListener("DOMContentLoaded", () => {
    // 1. सारे स्क्रीन्स को सिलेक्ट करो
    const screens = document.querySelectorAll(".screen");
    
    // स्क्रीन बदलने का फंक्शन
    function showScreen(screenId) {
        screens.forEach(screen => {
            screen.classList.remove("active");
        });
        const targetScreen = document.getElementById(screenId);
        if (targetScreen) {
            targetScreen.classList.add("active");
        }
    }

    // ===================================
    // Starting Page Buttons (Screen 1)
    // ===================================
    const yesBtn = document.getElementById("yesBtn");
    const noBtn = document.getElementById("noBtn");
    const tryAgainBtn = document.getElementById("tryAgain");

        if (yesBtn) {
        yesBtn.addEventListener("click", () => {
            // म्यूजिक प्ले करने का कोड
            const bgMusic = document.getElementById("bg-music");
            if (bgMusic) {
                bgMusic.volume = 0.5; // आवाज़ 50% रखी है ताकि कानों में ना चुभे
                bgMusic.play().catch(error => console.log("Music play error:", error));
            }
            // स्क्रीन 2 पर जाने का कोड
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
            // बैक बटन पर क्लिक हो तो आगे ना बढ़े
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
    // Screen 4 (Envelope Animation Logic)
    // ===================================
    const envelopeWrapper = document.getElementById("envelope-wrapper");
    const envelopeNextBtn = document.getElementById("envelopeNextBtn");
    const clickHint = document.querySelector(".click-hint");
    
    if (envelopeWrapper) {
        envelopeWrapper.addEventListener("click", () => {
            // लिफाफा खोलने की क्लास ऐड करें
            envelopeWrapper.classList.add("open");
            if (clickHint) clickHint.style.display = "none"; // हिंट छुपा दें
            
            // 1 सेकंड बाद Next बटन दिखाएं
            if (envelopeNextBtn) {
                setTimeout(() => {
                    envelopeNextBtn.style.display = "inline-block";
                }, 1000);
            }
        });
    }

    // Envelope Next button
    if (envelopeNextBtn) {
        envelopeNextBtn.addEventListener("click", () => showScreen("screen5"));
    }

    // ===================================
    // Back Buttons Logic
    // ===================================
    const backButtons = document.querySelectorAll(".backBtn");
    backButtons.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation(); // क्लिक को पीछे वाले एलिमेंट तक जाने से रोको
            const targetScreen = btn.getAttribute("data-back");
            if (targetScreen) {
                showScreen(targetScreen);
            }
        });
    });
        // ===================================
    // Floating Hearts / Flowers Effect
    // ===================================
    function createFallingItem() {
        const container = document.getElementById("floating-hearts");
        if (!container) return;

        const item = document.createElement("div");
        item.classList.add("falling-item");

        // क्या गिरेगा? (फूल, दिल, सितारे)
        const shapes = ["🌸", "💖", "✨", "🌸", "🤍"];
        item.innerHTML = shapes[Math.floor(Math.random() * shapes.length)];

        // स्क्रीन पर रैंडम जगह से गिरेंगे
        item.style.left = Math.random() * 100 + "vw";
        item.style.animationDuration = Math.random() * 3 + 3 + "s"; // 3 से 6 सेकंड की स्पीड
        item.style.fontSize = Math.random() * 10 + 15 + "px"; // साइज़ छोटा-बड़ा होगा

        container.appendChild(item);

        // स्क्रीन से बाहर जाने के बाद डिलीट हो जाएंगे ताकि वेबसाइट हैंग ना हो
        setTimeout(() => {
            item.remove();
        }, 6000);
    }

    // हर 400 मिलीसेकंड में एक नया फूल/दिल गिरेगा
    setInterval(createFallingItem, 400);

});
// ===================================
// Step 3: Typewriter Effect for Last Message
// ===================================
function typeWriterEffect(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = ""; // मैसेज खाली कर दें
    function typing() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(typing, speed);
        }
    }
    typing();
}

// स्क्रीन 8 पर पहुँचते ही इफेक्ट चलेगा
const screen8 = document.getElementById("screen8");
const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (screen8.classList.contains("active")) {
            const messageElement = screen8.querySelector("p");
            const originalText = messageElement.innerText;
            typeWriterEffect(messageElement, originalText, 30); // 30ms की स्पीड
            observer.disconnect(); // ताकि हर बार टाइप न हो
        }
    });
});

observer.observe(screen8, { attributes: true, attributeFilter: ['class'] });
canvas.width
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

miniCards.forEach(card => {
    card.addEventListener('click', () => {
        const id = card.getAttribute('data-id');
        modalContent.innerHTML = messages[id];
        modal.classList.add('show');
        
        // 300ms वेट करके सिल्वर लेयर बनाओ (ताकि एनीमेशन स्मूथ हो)
        setTimeout(initPopupScratchCard, 300);
    });
});

closeModal.addEventListener('click', () => {
    modal.classList.remove('show');
});

function initPopupScratchCard() {
    const ctx = canvas.getContext('2d');
    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    // सिल्वर कलर
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
        ctx.arc(x, y, 25, 0, Math.PI * 2); // ब्रश का साइज़
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
