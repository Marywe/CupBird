
class Player extends GameObject {

    constructor(position, rotation)
    {
        super(position, rotation);

        this.maxLife = 100;
        this.life = 100;

        //this.sprite = new Sprite(graphicAssets.braid.image, new Vector2(graphicAssets.braid.image.width / 2, graphicAssets.braid.image.height / 2));

        //idle
        //this.animation = new SSAnimation(graphicAssets.braid.image, 83, 140, [12, 11, 9, 9, 8], 1 / 12);
        this.animation = new SSAnimation(
            graphicAssets.knight.image,
            79, // frameWidth
            63, // frameHeight
            [14, 13, 14, 10, 2, 5, 6, 4, 4, 6, 4, 2, 8], // frameCount
            1/12
        );
        this.animation.PlayAnimationLoop(12);

        // physic body
        this.body = null;

        // force movement
        this.forceMovement = 50;

        // maximun displacement velocity
        this.maxVelocity = 2.5;

        // movement flags
        this.movingLeft = false;
    }

    Start(scene)
    {
        super.Start(scene);

        this.body = CreateBox(world, this.position.x / scale, this.position.y / scale, 0.6, 0.8, {fixedRotation: true, restitution: 0});
    }

    Update(deltaTime)
    {
        super.Update(deltaTime);

        // update the animation
        this.animation.Update(deltaTime);

        // left-right movement
        if (Input.IsKeyPressed(KEY_LEFT) || Input.IsKeyPressed(KEY_A))
        {
            this.body.ApplyForce(new b2Vec2(-this.forceMovement, 0), new b2Vec2(0, 0));
        }
        if (Input.IsKeyPressed(KEY_RIGHT) || Input.IsKeyPressed(KEY_D))
        {
            this.body.ApplyForce(new b2Vec2(this.forceMovement, 0), new b2Vec2(0, 0));
        }

        // movement velocity cap
        let movement = this.body.GetLinearVelocity();
        if (movement.x > this.maxVelocity)
            this.body.SetLinearVelocity(new b2Vec2(this.maxVelocity, movement.y));
        else if (movement.x < -this.maxVelocity)
            this.body.SetLinearVelocity(new b2Vec2(-this.maxVelocity, movement.y));

        if (this.movingLeft && movement.x > 0)
            this.movingLeft = false;
        else if (!this.movingLeft && movement.x < 0)
            this.movingLeft = true;

        // update the position
        let bodyPosition = this.body.GetPosition();
        this.position.x = bodyPosition.x * scale;
        this.position.y = Math.abs((bodyPosition.y * scale) - ctx.canvas.height);

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
            ctx.translate(this.position.x -10, this.position.y - 16);
            ctx.scale(-3, 3);
        }
        else
        {
            ctx.translate(this.position.x + 30, this.position.y - 16);
            ctx.scale(3, 3);
        }
        ctx.rotate(this.rotation);

        //this.sprite.Draw(ctx);
        this.animation.Draw(ctx);

        ctx.restore();

        ctx.imageSmoothingEnabled = true;
    }

    GetActualProportionalLife()
    {
        return this.life / this.maxLife;
    }
}
