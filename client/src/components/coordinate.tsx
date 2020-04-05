export class Coordinate {
    _x: number;
    _y: number;

    constructor(x: number, y: number) {
        this._x = x;
        this._y = y;
    }

    x() { return this._x; }

    y() { return this._y; }

}

