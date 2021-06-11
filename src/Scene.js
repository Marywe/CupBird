
var SceneState = {
    Loading: 0,
    Ingame: 1,
    PauseIngame: 2,
    GameOver: 3
}

class Scene {

    constructor()
    {
        this.gameObjects = new Array();
        this.currentState = SceneState.Loading;
    }

    Start()
    {
        this.currentState = SceneState.Ingame;
        SetupPhysics();         
    }

    Update(deltaTime)
    {
        if (this.currentState == SceneState.Ingame)
        {
            this.gameObjects.forEach(gameObject => {
                if(gameObject.alive){
                    if (gameObject.active)
                        gameObject.Update(deltaTime);
                   
                    
                }
            });
        }
    }

    Draw(ctx)
    {
        this.gameObjects.forEach(gameObject => {
            if (gameObject.active && gameObject.alive)
                gameObject.Draw(ctx);
        });
    }

    AddGameObject(gameObject)
    {
        this.gameObjects.push(gameObject);
        
    }

}