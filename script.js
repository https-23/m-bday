document.addEventListener("DOMContentLoaded", () => {
    // सारे स्क्रीन्स को सेलेक्ट करो
    const screens = document.querySelectorAll(".screen");
    
    // स्क्रीन बदलने का फंक्शन
    function showScreen(screenId) {
        screens.forEach(screen => {
            screen.classList.remove("active");
        });
        document.getElementById(screenId).classList.add("active");
    }

    // Screen 1: YES बटन दबाने पर
    document.getElementById("yesBtn").addEventListener("click", () => {
        showScreen("screen2");
    });

    // Screen 1: NO बटन दबाने पर (गुस्से वाला पेंगुइन)
    document.getElementById("noBtn").addEventListener("click", () => {
        showScreen("angry");
    });

    // Angry Screen: TRY AGAIN बटन
    document.getElementById("tryAgain").addEventListener("click", () => {
        showScreen("screen1");
    });

    // Screen 2: स्क्रीन पर कहीं भी टैप करने पर Screen 3 (Cake) आए
    document.getElementById("screen2").addEventListener("click", () => {
        showScreen("screen3");
    });

    // Screen 3 (Cake) से Screen 4 (Envelope)
    document.querySelector("#screen3 .heartNext").addEventListener("click", () => {
        showScreen("screen4");
    });

    // Screen 4 (Envelope) से Screen 5 (Coupons)
    document.querySelector("#screen4 .next").addEventListener("click", () => {
        showScreen("screen5");
    });

    // Screen 5 (Coupons) से Screen 6 (Flowers)
    document.querySelector("#screen5 .heartNext").addEventListener("click", () => {
        showScreen("screen6");
    });

    // Screen 6 (Flowers) से Screen 7 (No Photos)
    document.querySelector("#screen6 .heartNext").addEventListener("click", () => {
        showScreen("screen7");
    });

    // Screen 7 (No Photos) से आखरी Screen 8 (Final Wish)
    document.querySelector("#screen7 .heartNext").addEventListener("click", () => {
        showScreen("screen8");
    });
});

