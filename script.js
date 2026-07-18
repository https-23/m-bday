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
    
    // Screen 2 click except back button
    document.getElementById("screen2").addEventListener("click", (e) => {
        if(!e.target.classList.contains("backBtn")) {
            showScreen("screen3");
        }
    });

    document.querySelector("#screen3 .heartNext").addEventListener("click", () => showScreen("screen4"));
    document.querySelector("#screen4 .next").addEventListener("click", () => showScreen("screen5"));
    document.querySelector("#screen5 .heartNext").addEventListener("click", () => showScreen("screen6"));
    document.querySelector("#screen6 .heartNext").addEventListener("click", () => showScreen("screen7"));
    document.querySelector("#screen7 .heartNext").addEventListener("click", () => showScreen("screen8"));

    // Back Buttons Logic
    const backButtons = document.querySelectorAll(".backBtn");
    backButtons.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation(); // Prevents triggering next page clicks by mistake
            const targetScreen = btn.getAttribute("data-back");
            showScreen(targetScreen);
        });
    });
});
