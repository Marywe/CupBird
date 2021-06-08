
var canvas = null;
var ctx = null;

var currentFramesCounter = 0;
var lastFramesCounter = 0;
var targetDT = 1/30;
var acumDelta = 0;
var time = 0;
var lastTimeUpdate = 0;
var deltaTime = 0;

var canvasHalfWidth = 0;
var canvasHalfHeight = 0;

var pause = false;

const EngineState = {
    MainMenu: 0,
    Game: 1,
    Credits: 2,
    GameOver: 3
}

var currentState = EngineState.MainMenu;

var currentScene = null;

// graphic assets references
var graphicAssets = {

    youdied: {
        path: "assets/youdied.png",
        image: null
    },
    background1: {
        path: "assets/background1.jpg",
        image: null
    },
    clouds: {
        path: "assets/clouds.png",
        image: null
    },
    trees: {
        path: "assets/trees.png",
        image: null
    },
    helicopter: {
        path: "assets/helicopter.png",
        image: null
    },
    pokeball: {
        path: "assets/pokeball.png",
        image: null
    },
    lilfly: {
        path: "assets/lilfly.png",
        image: null
    }

};

// audio assets references
var audio = {}

function LoadImages(assets, onloaded)
{
    let imagesToLoad = 0;
    
    const onload = () => --imagesToLoad === 0 && onloaded();

    // iterate through the object of assets and load every image
    for (let asset in assets)
    {
        if (assets.hasOwnProperty(asset))
        {
            imagesToLoad++; // one more image to load

            // create the new image and set its path and onload event
            const img = assets[asset].image = new Image;
            img.src = assets[asset].path;
            img.onload = onload;
        }
     }
    return assets;
}

window.onload = BodyLoaded;


function BodyLoaded () {
    canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext("2d");

    canvasHalfWidth = canvas.width / 2;
    canvasHalfHeight = canvas.height / 2;

    // Initialize the keyboard & mouse events
    SetupKeyboardEvents();
    SetupMouseEvents();

    LoadImages(graphicAssets, function() {
        // load audio
        audio.laser = document.getElementById("laserSound");

        // prepare the Main Menu
        InitMainMenu();
    })
}

function InitMainMenu() {
    const menuStartButton = document.getElementById("startButton");
    const menuCreditsButton = document.getElementById("creditsButton");
    const menu = document.getElementById("menu");

    //HideMenuAndStart();
    menuStartButton.onclick  = function() {
        HideMenuAndStart();
    };

    menuCreditsButton.onclick = function() {
        // hide the buttons
        menuStartButton.style.display = "none";
        menuCreditsButton.style.display = "none";

        // start the credits animation
        const creditsCont = document.querySelector("#credits > div");
        creditsCont.classList.add("creditsAnimation");

        currentState = EngineState.Credits;

        creditsCont.addEventListener("animationend", function() {
            // animation end, show the buttons
            menuStartButton.style.display = "block";
            menuCreditsButton.style.display = "block";

            // reset animation
            creditsCont.classList.remove("creditsAnimation");

            currentState = EngineState.MainMenu;
        }, false);
    }
}

function HideMenuAndStart()
{
    menu.style.left = "-" + menu.clientWidth + "px";

    Start();
}

function Start()
{
    // Start the game
    // prepare the first scene
    currentScene = new GameScene();
    currentScene.Start();

    currentState = EngineState.Game;

    // first loop call
    time = Date.now();
    Loop();
}

function Loop()
{
    window.requestAnimationFrame(Loop);

    let now = Date.now();

    deltaTime = (now - time) / 1000;
    // si el tiempo es mayor a 1 seg: se descarta
    if (deltaTime > 1)
        deltaTime = 0;

    time = now;

    lastTimeUpdate = now;

    currentFramesCounter++;
    acumDelta += deltaTime;

    if (acumDelta >= 1)
    {
        lastFramesCounter = currentFramesCounter;
        currentFramesCounter = 0;
        acumDelta = acumDelta - 1;
    }
    
    if (lastPress == KEY_PAUSE || lastPress == KEY_ESCAPE)
    {
        pause = !pause;
        lastPress = -1;
    }

    Update(deltaTime);

    Input.PostUpdate();

    Draw(ctx);
}

function Update(deltaTime)
{
    // update the current scene
    currentScene.Update(deltaTime);
}

function Draw(ctx)
{
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // draw the currens scene
    currentScene.Draw(ctx);

    // draw FPS data
    ctx.fillStyle = "black";
    ctx.font = "12px Comic Sans MS";
    ctx.textAlign = "left";
    ctx.fillText("frames=" + currentFramesCounter, 10, 20);
    ctx.fillText("deltaTime=" + deltaTime, 10, 36);
    ctx.fillText("current FPS=" + (1 / deltaTime).toFixed(2), 10, 52);
    ctx.fillText("last second FPS=" + lastFramesCounter, 10, 68);
}

function InitScene()
{
    currentScene = new Scene1();
    currentScene.Start();
}

function ShowMainMenuAgain()
{
    menu.style.left = "0px";
}
