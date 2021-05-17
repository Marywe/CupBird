
var player = {
    x: 0,
    y: 0,
    width: 70,
    height: 30,
    rotation: 0,

    halfWidth: 0,
    halfHeight: 0,

    speed: 400,

    start: function() {
        this.halfWidth = this.width / 2;
        this.halfHeight = this.height / 2;

        this.x = canvas.width / 2;
        this.y = canvas.height / 2;
    },

    update: function(deltaTime) {
        // movement
        let dir = { x: 0, y: 0 };

        if (Input.IsKeyPressed(KEY_LEFT) || Input.IsKeyPressed(KEY_A))
            dir.x = -1;
        if (Input.IsKeyPressed(KEY_RIGHT) || Input.IsKeyPressed(KEY_D))
            dir.x = 1;
        if (Input.IsKeyPressed(KEY_UP) || Input.IsKeyPressed(KEY_W))
            dir.y = -1;
        if (Input.IsKeyPressed(KEY_DOWN) || Input.IsKeyPressed(KEY_S))
            dir.y = 1;

        if(dir.x!= 0 && dir.y != 0)
        {
            dir.x = dir.x / Math.sqrt(2);
            dir.y = dir.y / Math.sqrt(2);
        }
            
    
        this.x += dir.x * this.speed * deltaTime;
        this.y += dir.y * this.speed * deltaTime;

        //this.x = (this.x < this.halfWidth) ? this.halfWidth : (this.x > canvas.width - this.halfWidth) ? canvas.width - this.halfWidth : this.x;

        if (this.x < this.halfWidth)
            this.x = this.halfWidth;
        else
        {
            let maxX = canvas.width - this.halfWidth;
            if (this.x > maxX)
                this.x = maxX;
        }
    },

    draw: function(ctx) {
        ctx.save();

        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);

        ctx.fillStyle = "red";
        ctx.fillRect(-this.halfWidth, -this.halfHeight, this.width, this.height);

        ctx.restore();
    }
}
