class ingameUI2 {

    constructor()
    {
        //constructor(position, pivot, width, height, text, bgColor, strokeColor, textStyle, textColor)
        this.scene = null;
        this.time = 0;

        this.reiniciarButton = new UIButton(new Vector2(canvasHalfWidth -55, canvasHalfHeight - 5 ),
         new Vector2(50, 23), 100, 45, "REPLAY", "red", "black", "20px Monospace", "black");

        this.goToMainMenuButton = new UIButton(new Vector2(canvasHalfWidth - 10, canvasHalfHeight + 140),
         new Vector2(85, 23), 170, 45, "MAIN MENU", "red", "black", "20px Monospace", "black"); 
    }

    Start(scene)
    {
        this.scene = scene;
    }

    Update(deltaTime)
    {
        this.time += deltaTime;

        audio.greed.play();
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
        ctx.font = "30px monospace";
        ctx.textAlign = "center";
        ctx.strokeText(timeTrans, canvasHalfWidth - 150, 36);
        ctx.fillText(timeTrans, canvasHalfWidth - 150, 36);

        // Life
        const currentLife = (10 - playerLife) / 10;
        ctx.strokeStyle = "black";
        

        if (currentLife >= 0) 
        {
            ctx.fillStyle = "lightGreen";
            
            if(currentLife >=4 ) ctx.fillStyle = "yellow";
            if(currentLife >=7 ) ctx.fillStyle = "red";

            ctx.fillRect(400, 20, 200 * currentLife, 20);
        }
        ctx.strokeRect(400, 20, 200, 20);


        // Life
        const bossessito = bossLife / 40;
        ctx.strokeStyle = "black";


        if (bossessito >= 0) 
        {
            ctx.fillStyle = "red";

            ctx.fillRect(350, 550, 300 * bossessito, 30);
        }
        ctx.strokeRect(350, 550, 300, 30);

    }

    DrawEnd(ctx)
    {
        ctx.fillStyle = "black";
        
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(graphicAssets.death.image, canvasHalfWidth - (graphicAssets.death.image.width/2),
         canvasHalfHeight - (graphicAssets.death.image.width/2));

        // Reset button
        this.reiniciarButton.Draw(ctx);
        this.goToMainMenuButton.Draw(ctx);
    }


    DrawWin(ctx)
    {
        ctx.fillStyle = "black";
        
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(graphicAssets.win.image, canvasHalfWidth - (graphicAssets.death.image.width/2),
         canvasHalfHeight - (graphicAssets.death.image.width/2));

        // Reset button
        this.reiniciarButton.Draw(ctx);
        this.goToMainMenuButton.Draw(ctx);
    }

}