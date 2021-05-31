
class Background {
    constructor()
    {
        this.layers = new Array();
        this.layers.push(graphicAssets.background1.image);
    }

    Update(deltaTime)
    {

    }

    Draw(ctx)
    {
        this.layers.forEach(layer => ctx.drawImage(layer, 0, 0));
    }
}