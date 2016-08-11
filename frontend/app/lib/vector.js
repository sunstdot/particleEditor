export default class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    getMagnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    multiply(scaleFactor) {
        this.x *= scaleFactor;
        this.y *= scaleFactor;
    }

    add(vector) {
        this.x += vector.x;
        this.y += vector.y;
    }

    vectorTo(vector) {
        return new Vector(vector.x - this.x, vector.y - this.y);
    }

    withinBounds(point, size) {
        let radius = ~~(size / 2) + 1;
        return this.x >= point.x - radius &&
            this.x <= point.x + radius &&
            this.y >= point.y - radius &&
            this.y <= point.y + radius;
    }
    //根据象限获取点到圆点的线与x正向轴所成的角度
    getAngle() {
        let offset = 0;
        let ratio = 0;
        if (this.x > 0) {
            if (this.y > 0) {
                offset = 0;
                ratio = this.y / this.x;
            } else {
                offset = 3 * Math.PI / 2;
                ratio = this.x / this.y;
            }
        } else {
            if (this.y > 0) {
                offset = Math.PI / 2;
                ratio = this.x / this.y;
            } else {
                offset = Math.PI;
                ratio = this.y / this.x;
            }
        }
        return Math.atan(Math.abs(ratio)) + offset;
    }

    getAngleDegrees() {
        return this.getAngle() * 180 / Math.PI;
    }

    jitter(jitterAmount) {
        return new Vector(this.x + this.x * jitterAmount * Math.random(),
            this.y + this.y * jitterAmount * Math.random())
    }

    toString() {
        return this.x.toFixed(3).replace(/\.?0+$/, '') + ',' + this.y.toFixed(3).replace(/\.?0+$/, '');
    }
}
Vector.fromAngle = (angle, magnitude)=> {
    return new Vector(magnitude * Math.cos(angle), magnitude * Math.sin(angle));
}
Vector.fromString = (str)=> {
    let parts = str.split(",");
    return new Vector(parts[0], parts[1]);
}
