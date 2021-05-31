
class UIButton
{
    constructor(position, pivot, width, height, text, bgColor, strokeColor, textStyle, textColor)
    {
        this.position = position;
        this.pivot = pivot;
        this.width = width;
        this.height = height;

        this.text = text;

        this.bgColor = bgColor;
        this.strokeColor = strokeColor;
        this.textStyle = textStyle;
        this.textColor = textColor;
    }

    Draw(ctx)
    {
        ctx.fillStyle = this.bgColor;
        ctx.strokeStyle = this.strokeColor;
        ctx.fillRect(this.position.x - this.pivot.x, this.position.y - this.pivot.y, this.width, this.height);
        ctx.strokeRect(this.position.x - this.pivot.x, this.position.y - this.pivot.y, this.width, this.height);
        ctx.font = this.textStyle;
        ctx.textAlign = "center";
        ctx.fillStyle = this.textColor;
        ctx.fillText(this.text, this.position.x, this.position.y + 10);
    }

    IsPointInside(x, y)
    {
        return (x >= this.position.x - this.pivot.x && x <= (this.position.x - this.pivot.x + this.width) &&
                y >= this.position.y - this.pivot.y && y <= (this.position.y - this.pivot.y + this.height));
    }
}