class Fly extends GameObject {

    constructor(position, rotation)
    {
        super(position, rotation);

        
        this.animation = new SSAnimation(
            graphicAssets.fly.image,
            32, // frameWidth
            32, // frameHeight
            [2],
            1/12 // frameCount
        );
        
        this.animation.PlayAnimationLoop(0);

        // physic body
        this.body = null;

        this.shootCadency = 0.4;
        this.shootCadencyAux = this.shootCadency;
        this.bulletSpawnPoint = new Vector2(0, 0);
        this.bullets = [];
        this.startPos = new b2Vec2(0, 0)
        this.startSin = 0;

        this.vel = 1;
        this.life = 4;
    }

    Start(scene)
    {
        super.Start(scene);
      
        this.body = CreateBox(world,this.position.x / scale , this.position.y / scale, 0.27, 0.2, 
            {fixedRotation: true, restitution: 0.5, linearDamping: 8}, this);
        this.body.SetUserData('fly');

    }

    Update(deltaTime)
    {
        super.Update(deltaTime);
        this.animation.Update(deltaTime);
        this.animation.PlayAnimationLoop(0);
        this.shootCadencyAux += deltaTime;

        // update the position
        this.startSin +=deltaTime;
        
        let movementVector = new b2Vec2(-1.3 * this.vel, (Math.random() * (1 - -1) + -1) + this.vel*Math.sin(this.startSin * 2.5));

        this.body.ApplyForce(movementVector, new b2Vec2(0, 0));
        
        let bodyPosition = this.body.GetPosition();
        this.position.x = bodyPosition.x * scale;
        this.position.y = Math.abs((bodyPosition.y * scale) - ctx.canvas.height);

        
        if(this.position.x < 100) this.vel = -1;
        if (this.position.X > 900) this.vel = 1;
        
        if(this.life <= 0)          this.Die();

    }

    Draw(ctx)
    {
        // remove the image filtering
        ctx.imageSmoothingEnabled = false;

        ctx.save();

        
            ctx.translate(this.position.x, this.position.y);
            ctx.scale(2, 2);
        
        ctx.rotate(this.rotation);

        this.animation.Draw(ctx);

        ctx.restore();

        ctx.imageSmoothingEnabled = true;
    }
    

    Die()
    {        
        this.active = false;
        world.DestroyBody(this.body);
    }


}
