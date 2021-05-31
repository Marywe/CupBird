
class Scene1 extends Scene {

    constructor()
    {
        super();

        // reference to the player
        this.player = null;
        this.playerInitialPosition = new Vector2(300, 300);

        // reference to the box2d world
        this.world = null;

        // reference to the ingame UI
        this.ui = new ingameUI();

        // background
        this.background = new Background();

        // you died image
        this.diedSprite = new Sprite(graphicAssets.youdied.image, new Vector2((graphicAssets.youdied.image.width - canvas.width) / 2, 0));
        this.diedSpriteOpacity = 0;
        this.diedSpriteOpacitySpeed = 1 / 3;
    }

    Start()
    {
        super.Start();

        // init the box2d world
        this.world = CreateWorld(ctx, new b2Vec2(0, -10));

        // init the player
        this.player = new Player(this.playerInitialPosition, 0);
        this.player.Start(this);
        this.player.active = true;

        this.AddGameObject(this.player);

        // init the ui
        this.ui.Start(this.player);

        // create the box2d world objects
        // floor
        CreateEdge(this.world, 3, 0.1, -4, 0, 4, 0, {type : b2Body.b2_staticBody});
        // left wall
        CreateEdge(this.world, 0, 2, 0, -4, 0, 4, {type : b2Body.b2_staticBody});
        // right wall
        CreateEdge(this.world, 6.4, 2, 0, -4, 0, 4, {type : b2Body.b2_staticBody});
    }

    Update(deltaTime)
    {
        switch (this.currentState)
        {
            case SceneState.Loading:
                break;

            case SceneState.Ingame:
                // update physics
                // Step(timestep , velocity  iterations, position iterations)
                this.world.Step(deltaTime, 8, 3);
                this.world.ClearForces();

                if (Input.IsKeyUp(KEY_PAUSE) || Input.IsKeyUp(KEY_ESCAPE))
                {
                    // ingame -> pause the game
                    pause = true;
                    this.currentState = SceneState.PauseIngame;
                }

                super.Update(deltaTime);

                this.background.Update(deltaTime);

                this.ui.Update(deltaTime);

                // set the players position to the mouse
                //this.player.position.x = Input.mouse.x;
                //this.player.position.y = Input.mouse.y;
                break;

            case SceneState.PauseIngame:
                if (Input.IsKeyUp(KEY_PAUSE) || Input.IsKeyUp(KEY_ESCAPE))
                {
                    // game paused -> unpause
                    pause = false;
                    this.currentState = SceneState.Ingame;
                }

                this.ui.Update(deltaTime);
                break;

            case SceneState.GameOver:
                this.diedSpriteOpacity += this.diedSpriteOpacitySpeed * deltaTime;
                break;
        }
    }

    Draw(ctx)
    {
        switch (this.currentState)
        {
            case SceneState.Loading:
                break;

            case SceneState.Ingame:
                this.background.Draw(ctx);

                DrawWorldDebug(ctx);

                super.Draw(ctx);

                this.ui.Draw(ctx);

                // lens of truth
                ctx.fillStyle = "black";
                ctx.globalCompositeOperation = "hue";
                ctx.beginPath();
                ctx.arc(Input.mouse.x, Input.mouse.y, 100, 0, PI2, true);
                //ctx.arc(this.player.position.x, this.player.position.y, 100, 0, PI2, true);
                ctx.fill();
                ctx.globalCompositeOperation = "source-over";
                break;

            case SceneState.PauseIngame:
                this.background.Draw(ctx);

                super.Draw(ctx);

                this.ui.Draw(ctx);

                ctx.font = "120px sans-serif";
                ctx.textAlign = 'center';
                ctx.fillText('PAUSE', 240, 400);
                ctx.textAlign = 'left';
                break;

            case SceneState.GameOver:
                super.Draw(ctx);

                this.background.Draw(ctx);

                this.ui.Draw(ctx);

                ctx.fillStyle = "rgba(0, 0, 0," + this.diedSpriteOpacity + ")";
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.globalAlpha = this.diedSpriteOpacity;
                this.diedSprite.Draw(ctx);
                ctx.globalAlpha = 1;
                break;
        }
    }

    PlayerHasDie()
    {
        this.currentState = SceneState.GameOver;
    }
}
