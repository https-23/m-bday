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
