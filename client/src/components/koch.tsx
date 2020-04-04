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


export class Koch {
    _start: Coordinate;
    _end: Coordinate;

    constructor(start: Coordinate, end: Coordinate) {
        this._start = start;
        this._end = end;
    }

    pointA() { return this._start; }

    pointB () {
        let xVal = this._start.x() + (this._end.x() - this._start.x())/3;
        let yVal = this._start.y() + (this._end.y() - this._start.y())/3;
        return new Coordinate(xVal, yVal);
    }

    pointC() {
        let xVal = this.pointB().x() + ((this.lineLength()/3)*Math.cos(Math.PI/3 - this.lineHasPositiveSlope()*Math.acos((this._end.x() - this._start.x())/ (this.lineLength()))));
        // console.log(Math.cos(Math.PI/3 + Math.acos((this._end.x() - this._start.x())/ (this.lineLength()))));
        let yVal = this.pointB().y() - ((this.lineLength()/3)*Math.sin(Math.PI/3 - this.lineHasPositiveSlope()*Math.acos((this._end.x() - this._start.x())/ (this.lineLength()))));
        return new Coordinate(xVal, yVal);
    }

    pointD() {
        let xVal = this._start.x() + (this._end.x() - this._start.x())*(2/3);
        let yVal = this._start.y() + (this._end.y() - this._start.y())*(2/3)
        return new Coordinate(xVal, yVal);
    }

    pointE() { return this._end; }


    allKochPoints() {
        return [this.pointA(), this.pointB(), this.pointC(), this.pointD(), this.pointE()];
    }


    lineLength() {
        return Math.sqrt((this._end.x() - this._start.x())**2 + (this._end.y() - this._start.y())**2);
    }

    lineHasPositiveSlope() {
        if ((this._end.y() - this._start.y())/ (this.lineLength()) < 0) return -1;
        return 1;
    }
}
