
window.onload = function() {
    
    const menuStartButton = document.getElementById("startButton");
    const menuCreditsButton = document.getElementById("creditsButton");
    const menu = document.getElementById("menu");

    menuStartButton.onclick  = function() {
        menu.style.left = "-" + menu.clientWidth + "px";
    };

    menuCreditsButton.onclick = function() {
        // hide the buttons
        menuStartButton.style.display = "none";
        menuCreditsButton.style.display = "none";

        // start the credits animation
        const creditsCont = document.querySelector("#credits > div");
        //creditsCont.style.animationPlayState = "running";
        creditsCont.classList.add("creditsAnimation");

        creditsCont.addEventListener("animationend", function() {
            // animation end, show the buttons
            menuStartButton.style.display = "block";
            menuCreditsButton.style.display = "block";

            // reset animation
            creditsCont.classList.remove("creditsAnimation");
        }, false);
    }
}