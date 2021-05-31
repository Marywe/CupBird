
class Sprite {

    constructor(image, pivot)
    {
        this.image = image;
        this.pivot = pivot;
    }

    Start()
    {
        
    }

    Draw(ctx)
    {
        ctx.drawImage(this.image, -this.pivot.x, -this.pivot.y);
    }
}