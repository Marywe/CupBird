
var canvas = null;
var ctx = null;

var pause = false;

var bgGradient = null;

var currentFramesCounter = 0;
var lastFramesCounter = 0;
var targetDT = 1/30;
var acumDelta = 0;
var time = 0;
var lastTimeUpdate = 0;
var deltaTime = 0;

var laser = null;

var ball = {
    radious: 10,
    position: {
        x: 0,
        y: 0
    },
    dir: {
        x: 0,
        y: 0
    },
    movementSegment: {
        p1: {x: 0, y: 0},
        p2: {x: 0, y: 0}
    },
    speed: 300,

    start: function () {
        this.position.x = Math.random() * canvas.width;
        this.position.y = Math.random() * canvas.height / 2;

        this.dir.x = (Math.random() * 2) - 1;
        this.dir.y = (Math.random() * 2) - 1;
        NormalizeVector(this.dir);
    },

    update: function (deltaTime) {
        this.position.x += this.dir.x * this.speed * deltaTime;
        this.position.y += this.dir.y * this.speed * deltaTime;

        this.movementSegment.p1.x = this.position.x + this.radious * this.dir.x;
        this.movementSegment.p1.y = this.position.y + this.radious * this.dir.y;

        this.movementSegment.p2.x = this.movementSegment.p1.x + this.radious * this.dir.x;
        this.movementSegment.p2.y = this.movementSegment.p1.y + this.radious * this.dir.y;
    },

    draw: function (ctx) {
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radious, 0, PI2, false);
        ctx.fill();

        ctx.strokeStyle = "red";
        ctx.beginPath();
        ctx.moveTo(this.movementSegment.p1.x, this.movementSegment.p1.y);
        ctx.lineTo(this.movementSegment.p2.x, this.movementSegment.p2.y);
        ctx.stroke();
    }
}

var bricks = [];

function Brick(position, width, height, color) {
    this.position = position;
    this.width = width;
    this.height = height;
    this.color = color;
}

Brick.prototype.Draw = function (ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
}

window.onload = function() {
    canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext("2d");

    SetupKeyboardEvents();
    SetupMouseEvents();

    // prepare the bg gradient
    bgGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    bgGradient.addColorStop(1, "rgb(112, 162, 218)");
    bgGradient.addColorStop(0.9494949494949495, "rgb(0, 122, 255)");
    bgGradient.addColorStop(0.4292929292929293, "rgb(38, 71, 108)");
    bgGradient.addColorStop(0.16161616161616163, "rgb(0, 0, 0)");
    bgGradient.addColorStop(0, "rgb(1, 1, 1)");

    // load audio
    laser = document.getElementById("sound_laser");

    // start the player
    player.start();

    ball.start();

    // init the bricks
    let brickWidth = canvas.width / 5;
    for (let i = 0; i < 5; i++)
    {
        for (let j = 0; j < 10; j++)
        {
            let brick = new Brick({x: i * brickWidth, y: j*20},
                brickWidth, 20, getRandomColor());

            bricks.push(brick);
        }
    }
    
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

    if (pause)
    {
        ctx.font = "120px sans-serif";
        ctx.textAlign = 'center';
        ctx.fillText('PAUSE', 240, 400);
        ctx.textAlign = 'left';
        return;
    }

    Update(deltaTime);
    Input.PostUpdate();

    Draw(ctx);
}

function Update(deltaTime)
{
    // Update
    player.update(deltaTime);

    ball.update(deltaTime);

    // check collisions
    // left wall
    if (ball.position.x < ball.radious)
        ball.dir.x = -ball.dir.x;
    // right wall
    if (ball.position.x > canvas.width - ball.radious)
        ball.dir.x = -ball.dir.x;
    // top wall
    if (ball.position.y < ball.radious)
        ball.dir.y = -ball.dir.y;
    // down floor
    if (ball.position.y > canvas.height - ball.radious)
        ball.dir.y = -ball.dir.y;

    // player-ball collisions
    if (ball.position.y > player.y - player.halfHeight - ball.radious)
    {
        if (ball.position.x > player.x - player.halfWidth &&
            ball.position.x < player.x + player.halfWidth)
            ball.dir.y = -ball.dir.y;
    }
}

function Draw(ctx)
{
    // Draw
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // background gradient
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // draw the bricks
    bricks.forEach(brick => {
        brick.Draw(ctx);
    });

    // draw the player
    player.draw(ctx);

    ball.draw(ctx);

    // draw FPS data
    ctx.fillStyle = "white";
    ctx.font = "12px Comic Sans MS"
    ctx.fillText("frames=" + currentFramesCounter, 10, 20);
    ctx.fillText("deltaTime=" + deltaTime, 10, 36);
    ctx.fillText("current FPS=" + (1 / deltaTime).toFixed(2), 10, 52);
    ctx.fillText("last second FPS=" + lastFramesCounter, 10, 68);
}
