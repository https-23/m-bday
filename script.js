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
        yesBtn.addEventListener("click", () => showScreen("screen2"));
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
});
