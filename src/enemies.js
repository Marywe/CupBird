class Enemy extends GameObject {

    constructor(position, rotation)
    {
        super(position, rotation);

        this.sprite = new Sprite(graphicAssets.lilfly.image, new Vector2(graphicAssets.lilfly.image.width / 2, graphicAssets.lilfly.image.height / 2));

        // physic body
        this.body = null;

        // force movement
        this.forceMovement = 50;

        // maximun displacement velocity
        this.maxVelocity = 2.5;

        this.shootCadency = 0.4;
        this.shootCadencyAux = this.shootCadency;
        this.bulletSpawnPoint = new Vector2(0, 0);
        this.bullets = [];
    }

    Start(scene)
    {
        super.Start(scene);

        this.body = CreateBox(world, this.position.x / scale, this.position.y / scale, 0.27, 0.2, {fixedRotation: true, restitution: 0.5, linearDamping: 8});
    }

    Update(deltaTime)
    {
        super.Update(deltaTime);

        this.shootCadencyAux += deltaTime;

        // update the position
        let bodyPosition = this.body.GetPosition();
        this.position.x = bodyPosition.x * scale;
        this.position.y = Math.abs((bodyPosition.y * scale) - ctx.canvas.height);

        //if (Input.IsMousePressed() && this.shootCadencyAux > this.shootCadency)
        //{
            //this.Shoot();
        //}

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

    GetActualProportionalLife()
    {
        return this.life / this.maxLife;
    }

    GetNumberOfBulletsInScene()
    {
        return this.bullets.length;
    }

    Shoot()
    {
        let newBullet = null;
                      
        newBullet = CreateBall(world, this.position.x / scale - this.bulletSpawnPoint.x, (canvas.height - this.position.y) / scale, 0.05, {isSensor: true});
        newBullet.ApplyImpulse(new b2Vec2(-0.01, 0), new b2Vec2(0, 0));
       
        this.shootCadencyAux = 0;
    }

    Die()
    {
        delete this;
    }


}
