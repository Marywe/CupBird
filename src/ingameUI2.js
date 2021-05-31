class ingameUI2 {

    constructor()
    {
        this.scene = null;
        this.time = 0;

        this.reiniciarButton = new UIButton(new Vector2(canvasHalfWidth, canvasHalfHeight - 60), new Vector2(100, 30), 200, 60, "Reiniciar", "red", "white", "30px Comic Sans MS", "white");

        this.goToMainMenuButton = new UIButton(new Vector2(canvasHalfWidth, canvasHalfHeight + 60), new Vector2(100, 30), 200, 60, "Menú Principal", "blue", "white", "30px Comic Sans MS", "yellow"); 
    }

    Start(scene)
    {
        this.scene = scene;
    }

    Update(deltaTime)
    {
        this.time += deltaTime;
    }

    UpdateEnd(deltaTime)
    {
        if (Input.IsMousePressed())
        {
            if (this.reiniciarButton.IsPointInside(Input.mouse.x, Input.mouse.y))
                this.scene.ResetButtonPressed();

            if (this.goToMainMenuButton.IsPointInside(Input.mouse.x, Input.mouse.y))
                this.scene.GoBackToMainMenuPressed();
        }
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

        // bullets in scene
        const currentLife = this.scene.player.GetNumberOfBulletsInScene() / this.scene.maxBullesCount;
        ctx.strokeStyle = "black";
        ctx.fillStyle = "lightGreen";

        if (currentLife > 0)
            ctx.fillRect(400, 20, 200 * currentLife, 20);
        ctx.strokeRect(400, 20, 200, 20);
    }

    DrawEnd(ctx)
    {
        ctx.fillStyle = "grey";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Reset button
        this.reiniciarButton.Draw(ctx);
        this.goToMainMenuButton.Draw(ctx);
    }

}