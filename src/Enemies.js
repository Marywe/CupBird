
class Enemies extends GameObject {

    constructor(position, rotation)
    {
        super(position, rotation);

        this.sprite = new Sprite(graphicAssets.helicopter.image, new Vector2(graphicAssets.helicopter.image.width / 2, graphicAssets.helicopter.image.height / 2));

        // physic body
        this.body = null;

        // force movement
        this.forceMovement = 50;

        // maximun displacement velocity
        this.maxVelocity = 2.5;

        this.shootCadency = 03;
        this.shootCadencyAux = this.shootCadency;
        this.bulletSpawnPoint = new Vector2(0, 0);
        this.bullets = [];
    }

    Start(scene)
    {
        super.Start(scene);

        this.body = CreateBox(world, this.position.x / scale, this.position.y / scale, 0.6, 0.3, {fixedRotation: true, restitution: 0.5, linearDamping: 8});
    }

    Update(deltaTime)
    {
        super.Update(deltaTime);

        this.shootCadencyAux += deltaTime;

        // left-right movement
        let movementVector = new b2Vec2(0, 0);
        if (Input.IsKeyPressed(KEY_LEFT) || Input.IsKeyPressed(KEY_A))
            movementVector.x -= 1;
        if (Input.IsKeyPressed(KEY_RIGHT) || Input.IsKeyPressed(KEY_D))
            movementVector.x += 1;
        if (Input.IsKeyPressed(KEY_UP) || Input.IsKeyPressed(KEY_W))
            movementVector.y += 1;
        if (Input.IsKeyPressed(KEY_DOWN) || Input.IsKeyPressed(KEY_S))
            movementVector.y -= 1;

        movementVector.Normalize();
        movementVector.Multiply(this.forceMovement);

        this.body.ApplyForce(movementVector, new b2Vec2(0, 0));

        // movement velocity cap
        let movementVelocity = this.body.GetLinearVelocity();
        if (movementVelocity.Length() > this.maxVelocity)
        {
            movementVelocity.Normalize();
            movementVelocity.Multiply(this.maxVelocity);
            this.body.SetLinearVelocity(movementVelocity);
        }

        if (this.movingLeft && movementVelocity.x > 1.5)
            this.movingLeft = false;
        else if (!this.movingLeft && movementVelocity.x < -1.5)
            this.movingLeft = true;

        // update the position
        let bodyPosition = this.body.GetPosition();
        this.position.x = bodyPosition.x * scale;
        this.position.y = Math.abs((bodyPosition.y * scale) - ctx.canvas.height);

        if (Input.IsMousePressed() && this.shootCadencyAux > this.shootCadency)
        {
            let newBullet = null;
            if (!this.movingLeft)
            {
                newBullet = CreateBall(world, this.position.x / scale + this.bulletSpawnPoint.x, (canvas.height - this.position.y) / scale, 0.05, {isSensor: true});

                newBullet.ApplyImpulse(new b2Vec2(0.02, 0), new b2Vec2(0, 0));
            }
            else
            {
                newBullet = CreateBall(world, this.position.x / scale - this.bulletSpawnPoint.x, (canvas.height - this.position.y) / scale, 0.05, {isSensor: true});

                newBullet.ApplyImpulse(new b2Vec2(-0.02, 0), new b2Vec2(0, 0));
            }
            
            this.bullets.push(newBullet);

            this.shootCadencyAux = 0;
        }

        // make the player lose life because of yes
        //this.life -= 1.25; 

        if (this.life <= 0.0)
            this.scene.PlayerHasDie();
    }

    Draw(ctx)
    {
        // remove the image filtering
        ctx.imageSmoothingEnabled = false;

        ctx.save();

        if (this.movingLeft)
        {
            ctx.translate(this.position.x, this.position.y);
            ctx.scale(-0.5, 0.5);
        }
        else
        {
            ctx.translate(this.position.x, this.position.y);
            ctx.scale(0.5, 0.5);
        }
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
}
