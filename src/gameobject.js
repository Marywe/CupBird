class GameObject {

    constructor(position, rotation)
    {
        this.active = false;
        this.position = position;
        this.rotation = rotation;
        this.scene = null;
    }

    Start(scene)
    {
        this.scene = scene;
    }

    Update(deltaTime)
    {
        
    }

    Draw(ctx)
    {
        
    }
}
