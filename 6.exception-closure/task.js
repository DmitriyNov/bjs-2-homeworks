function parseCount(value) {
    let parsed = Number.parseInt(value);
    if (Number.isNaN(parsed)) {
        throw new Error("Невалидное значение");
    }
    return parsed;
}
function validateCount(value) {
    try {
        return parseCount(value);
    } catch(error) {
        return error;
    }
}

class Triangle {
    constructor(a, b, c) {
        this.a = a;
        this.b = b;
        this.c = c;
        if (this.a + this.b < this.c || this.a + this.c < this.b || this.b + this.c < this.a) {
            throw new Error("Треугольник с такими сторонами не существует");
        } 
    }
    getPerimeter() {
        return this.a + this.b + this.c;
    }
    getArea() {
        let p = this.getPerimeter() / 2;
        return +Math.sqrt(p * (p - this.a) * (p - this.b) * (p - this.c)).toFixed(3);
    }
}

function getTriangle(a, b, c) {
    try {
        return new Triangle(a, b, c);
    } catch {
        return {
            getPerimeter() {
                return "Ошибка! Треугольник не существует";
            },
            getArea() {
                return "Ошибка! Треугольник не существует";
            }
        }
    }
}