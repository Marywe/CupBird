var playerLife = 0;
var invulnerability = false;

class GameScene extends Scene {

    constructor()
    {
        super();

        // reference to the player
        this.player = null;
        this.playerInitialPosition = new Vector2(300, 300);

        // reference to the box2d world
        this.world = null;

        // reference to the ingame UI
        this.ui = new ingameUI2();

        // background
        this.background = new Background();

    }

    Start()
    {
        super.Start();

        // init the box2d world
        this.world = CreateWorld(ctx, new b2Vec2(0, 0));
       

        // init the player
        this.player = new Player(this.playerInitialPosition, 0);
        this.player.Start(this);
        this.player.active = true;

        this.AddGameObject(this.player);

       
        this.keep = new Keeper(new Vector2(100,200), 0);
        this.keep.Start(this);
        this.keep.active = true;

        this.AddGameObject(this.keep);


        this.boss = new Boss(new Vector2(750,340), 0);
        this.boss.Start(this);
        this.boss.active = true;

        this.AddGameObject(this.boss);

        // init the ui
        this.ui.Start(this);

        // create the box2d world objects
        // floor
        CreateEdge(this.world, 3, 0, -4, 0,10, 0, {type : b2Body.b2_staticBody});
        // left wall
        CreateEdge(this.world, 0, 2, 0, -4, 0, 4, {type : b2Body.b2_staticBody});
        // right wall
        CreateEdge(this.world, 10, 2, 0, -4, 0, 4, {type : b2Body.b2_staticBody});
        // cellar

        CreateEdge(this.world, 5,6, -4, 0, 10, 0, {type : b2Body.b2_staticBody});

        this.invulTime = 2.5;
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

                 // check scene ended condition
                if (playerLife >= this.player.maxLife)
                {
                   
                    this.currentState = SceneState.GameOver;
      
                    
                }

                if (Input.IsKeyUp(KEY_PAUSE) || Input.IsKeyUp(KEY_ESCAPE))
                {
                    // ingame -> pause the game
                    pause = true;
                    this.currentState = SceneState.PauseIngame;
                }

                super.Update(deltaTime);

                this.background.Update(deltaTime);
                this.ui.Update(deltaTime);

                //Timer para invulnerabilidad
                if(invulnerability){
                    this.invulTime -=deltaTime;

                    if(this.invulTime <= 0){
                        invulnerability = false;
                        this.invulTime = 2.5;
                    }
                        
                }
              
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
                this.ui.UpdateEnd(deltaTime);
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
                break;

            case SceneState.PauseIngame:
                this.background.Draw(ctx);

                super.Draw(ctx);

                this.ui.Draw(ctx);

                ctx.font = "120px sans-serif";
                ctx.textAlign = 'center';
                ctx.fillText('PAUSE', 240, 400);
                ctx.textAlign = 'center';
                break;

            case SceneState.GameOver:
                super.Draw(ctx);

                this.background.Draw(ctx);

                this.ui.DrawEnd(ctx);
                break;
        }
    }

    ResetButtonPressed () 
    {
        InitScene();
    }

    GoBackToMainMenuPressed () 
    {
        ShowMainMenuAgain();
    }

    Spawn(){
        
    }
}
