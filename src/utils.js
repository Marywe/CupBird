const PI2 = Math.PI * 2;

function CheckCollisionCircle(point, circle)
{
    // returns true if "point" is inside "circle"
    //return DistanceBetweenPoints(point, circle.position) < circle.radius;
    return SquaredDistanceBetweenPoints(point, circle.position) < circle.radius2;
}

function CheckCollisionRect(point, rectangle)
{
    // returns true if "point" is inside "rectangle"
    return point.x >= (rectangle.x) &&
           point.x <= (rectangle.x + rectangle.width) &&
           point.y >= (rectangle.y) &&
           point.y <= (rectangle.y + rectangle.height);
}

function DistanceBetweenPoints(A, B)
{
    return Math.sqrt(SquaredDistanceBetweenPoints(A, B));
}

function SquaredDistanceBetweenPoints(A, B)
{
    let distX = (A.x - B.x),
        distY = (A.y - B.y);
    return (distX * distX) + (distY * distY);
}

function NormalizeVector(vector)
{
    let x2 = vector.x * vector.x;
    let y2 = vector.y * vector.y;
    let length = Math.sqrt(x2 + y2);

    vector.x = vector.x / length;
    vector.y = vector.y / length;
}

function getRandomColor()
{
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}