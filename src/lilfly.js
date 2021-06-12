class LilFly extends GameObject {

    constructor(position, rotation)
    {
        super(position, rotation);

        this.sprite = new Sprite(graphicAssets.lilfly.image, new Vector2(graphicAssets.lilfly.image.width / 2, graphicAssets.lilfly.image.height / 2));

        // physic body
        this.body = null;

        this.shootCadency = 0.4;
        this.shootCadencyAux = this.shootCadency;
        this.bulletSpawnPoint = new Vector2(0, 0);
        this.bullets = [];
        this.startPos = new b2Vec2(0, 0)
        this.startSin = 0;        
        this.vel = -1.3;
        this.life = 4;
    }

    Start(scene)
    {
        super.Start(scene);

        this.body = CreateBox(world,this.position.x / scale , this.position.y / scale, 0.2, 0.15, {fixedRotation: true, restitution: 0.5, linearDamping: 8}, this);
        this.body.SetUserData('fly');
    }

    Update(deltaTime)
    {
        super.Update(deltaTime);

        this.shootCadencyAux += deltaTime;

        // update the position
        this.startSin +=deltaTime;
        let movementVector = new b2Vec2(this.vel, Math.sin(this.startSin * 2.5));

        this.body.ApplyForce(movementVector, new b2Vec2(0, 0));

        let bodyPosition = this.body.GetPosition();
        this.position.x = bodyPosition.x * scale;
        this.position.y = Math.abs((bodyPosition.y * scale) - ctx.canvas.height);

        if(this.position.x < 100) this.vel = 1.3;
        if (this.position.x > 900) this.vel = -1.3;
        

        if(this.life <= 0)          this.Die();
    }

    Draw(ctx)
    {
        // remove the image filtering
        ctx.imageSmoothingEnabled = false;

        ctx.save();
        
            ctx.translate(this.position.x, this.position.y);
            ctx.scale(0.2, 0.2);
        
        ctx.rotate(this.rotation);

        this.sprite.Draw(ctx);

        ctx.restore();

        ctx.imageSmoothingEnabled = true;
    }

    Die()
    {
        
        this.active = false;
        world.DestroyBody(this.body);
    }


}
