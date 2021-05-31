class ingameUI {

    constructor()
    {
        this.player = null;
        this.time = 0;
    }

    Start(player)
    {
        this.player = player;
    }

    Update(deltaTime)
    {
        this.time += deltaTime;
    }

    Draw(ctx)
    {
        // current time
        let timeTrans = this.time.toFixed(1);
        ctx.strokeStyle = "black";
        ctx.fillStyle = "red";
        ctx.font = "30px Comic Sans MS";
        ctx.textAlign = "center";
        ctx.strokeText(timeTrans, canvasHalfWidth, 36);
        ctx.fillText(timeTrans, canvasHalfWidth, 36);

        // player life bar
        const currentLife = this.player.GetActualProportionalLife();
        ctx.strokeStyle = "black";
        ctx.fillStyle = "lightGreen";
        if (currentLife < 0.1)
            ctx.fillStyle = "red";
        else if (currentLife < 0.5)
            ctx.fillStyle = "orange";

        if (currentLife > 0)
            ctx.fillRect(400, 20, 200 * currentLife, 20);
        ctx.strokeRect(400, 20, 200, 20);
    }

}