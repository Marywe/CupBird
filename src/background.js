
class Background {
    constructor()
    {
        this.layers = new Array();
        this.layers.push(graphicAssets.background1.image);
        this.layers.push(graphicAssets.clouds.image);
        this.layers.push(graphicAssets.clouds.image);
        this.layers.push(graphicAssets.trees.image);
        this.layers.push(graphicAssets.trees.image);
        this.Scale = 1.5;
        this.xClouds = canvasHalfWidth - 385;
        this.xClouds2 = canvasHalfWidth*2;
        this.xTrees = 0;
        this.xTrees2 = 1146*1.5;
        this.cloudSpeed= 40;
        this.treesSpeed= 150;
    }

    Update(deltaTime)
    {
        //Parallax
        this.xClouds -= deltaTime * this.cloudSpeed;
        this.xClouds2 -= deltaTime * this.cloudSpeed;

        this.xTrees -= deltaTime * this.treesSpeed;
        this.xTrees2 -= deltaTime * this.treesSpeed;

        if(this.xClouds <= 0 - 385*2)
            this.xClouds = canvasHalfWidth*2;
        else if(this.xClouds2 <= 0 - 385*2)
            this.xClouds2 = canvasHalfWidth*2;

        if(this.xTrees <= 0 - 1142*this.Scale)
            this.xTrees = this.xTrees2 + 1142 * this.Scale;
        else if(this.xTrees2 <= 0 - 1142*this.Scale)
            this.xTrees2 = this.xTrees + 1142 * this.Scale;


    }

    Draw(ctx)
    {
        ctx.drawImage(this.layers[0], 0, 0);
        ctx.drawImage(this.layers[1], this.xClouds, 0);
        ctx.drawImage(this.layers[2], this.xClouds2, 0);
        ctx.drawImage(this.layers[3], this.xTrees, canvasHalfHeight*2 - (this.Scale *122), 
            this.Scale * 1146, this.Scale * 122);
        ctx.drawImage(this.layers[4], this.xTrees2, canvasHalfHeight*2 - (this.Scale *122), 
            this.Scale * 1146, this.Scale * 122);
    }
}