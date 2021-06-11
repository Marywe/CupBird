class Keeper extends GameObject {

    constructor(position, rotation)
    {
        super(position, rotation);

        this.sprite = new Sprite(graphicAssets.keeper.image, new Vector2(graphicAssets.keeper.image.width / 2, graphicAssets.keeper.image.height / 2));

        // physic body
        this.body = null;

        this.shootCadency = 0.4;
        this.shootCadencyAux = this.shootCadency;
        this.bulletSpawnPoint = new Vector2(0, 0);
        this.bullets = [];
        this.startPos = new b2Vec2(0, 0)
        this.startSin = 0;
        this.startCos = 0;

        this.vel = -1;
        this.life = 4;
    }

    Start(scene)
    {
        super.Start(scene);
      
        this.body = CreateBox(world,this.position.x / scale , this.position.y / scale, 0.3, 0.4, 
            {fixedRotation: true, restitution: 0.5, linearDamping: 8}, this);
        this.body.SetUserData('fly');

    }

    Update(deltaTime)
    {
        super.Update(deltaTime);
        this.shootCadencyAux += deltaTime;


        // update the position
        this.startSin +=deltaTime;
        this.startCos +=deltaTime;
        
        let movementVector = new b2Vec2((-Math.cos(this.startCos * 3.5) - 0.5)*this.vel, this.vel*Math.sin(this.startSin * 2.5));

        this.body.ApplyForce(movementVector, new b2Vec2(0, 0));
        
        let bodyPosition = this.body.GetPosition();
        this.position.x = bodyPosition.x * scale;
        this.position.y = Math.abs((bodyPosition.y * scale) - ctx.canvas.height);

        //if (this.shootCadencyAux > this.shootCadency)
        //{
            //this.Shoot();
        //}
        
        if(this.position.x < 200) this.vel = -1;
        if (this.position.X > 900) this.vel = 1;

        if(this.life <= 0)          this.Die();

    }

    Draw(ctx)
    {
        // remove the image filtering
        ctx.imageSmoothingEnabled = false;

        ctx.save();

        
            ctx.translate(this.position.x, this.position.y - 160);
            ctx.scale(1.3, 1.3);
        
        ctx.rotate(this.rotation);
        this.sprite.Draw(ctx);

        ctx.restore();

        for (let i = 0; i < this.bullets.length; i++)
        {
            const bulletPosition = this.bullets[i].GetPosition();

            ctx.save();
            ctx.translate(bulletPosition.x * scale, canvas.height - (bulletPosition.y * scale));
            ctx.scale(0.02, 0.02);

            ctx.drawImage(graphicAssets.pokeball.image, -432, -432);

            ctx.restore();
        }

        ctx.imageSmoothingEnabled = true;
    }

    Shoot()
    {
        let newBullet = null;
                      
        newBullet = CreateBall(world, this.position.x / scale - this.bulletSpawnPoint.x, (canvas.height - this.position.y) / scale, 0.05, {isSensor: true});
        newBullet.ApplyImpulse(new b2Vec2(-0.01, 0), new b2Vec2(0, 0));
       this.bullets.push(newBullet);
        this.shootCadencyAux = 0;
    }
    

    Die()
    {
        
        this.active = false;
        world.DestroyBody(this.body);
    }


}
