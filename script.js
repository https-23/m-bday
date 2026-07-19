document.addEventListener("DOMContentLoaded", () => {
    const screens = document.querySelectorAll(".screen");
    
    function showScreen(screenId) {
        screens.forEach(screen => {
            screen.classList.remove("active");
        });
        document.getElementById(screenId).classList.add("active");
    }

    // Next Page Buttons
    document.getElementById("yesBtn").addEventListener("click", () => showScreen("screen2"));
    document.getElementById("noBtn").addEventListener("click", () => showScreen("angry"));
    document.getElementById("tryAgain").addEventListener("click", () => showScreen("screen1"));
    
    // Screen 2
    document.getElementById("screen2").addEventListener("click", (e) => {
        if(!e.target.classList.contains("backBtn")) {
            showScreen("screen3");
        }
    });

    document.querySelector("#screen3 .heartNext").addEventListener("click", () => showScreen("screen4"));
    
    // ===================================
    // Screen 4 (Envelope Animation Logic)
    // ===================================
    const envelopeWrapper = document.getElementById("envelope-wrapper");
    const envelopeNextBtn = document.getElementById("envelopeNextBtn");
    
    if (envelopeWrapper) {
        envelopeWrapper.addEventListener("click", () => {
            // लिफाफा खोलने की क्लास ऐड करें
            envelopeWrapper.classList.add("open");
            document.querySelector(".click-hint").style.display = "none"; // हिंट छुपा दें
            
            // 1 सेकंड बाद Next बटन दिखाएं
            setTimeout(() => {
                envelopeNextBtn.style.display = "inline-block";
            }, 1000);
        });
    }

    // Envelope Next button
    if (envelopeNextBtn) {
        envelopeNextBtn.addEventListener("click", () => showScreen("screen5"));
    }

    // Remaining Screens
    document.querySelector("#screen5 .heartNext").addEventListener("click", () => showScreen("screen6"));
    document.querySelector("#screen6 .heartNext").addEventListener("click", () => showScreen("screen7"));
    document.querySelector("#screen7 .heartNext").addEventListener("click", () => showScreen("screen8"));

    // Back Buttons Logic
    const backButtons = document.querySelectorAll(".backBtn");
    backButtons.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            const targetScreen = btn.getAttribute("data-back");
            showScreen(targetScreen);
        });
    });
});
