import {Coordinate} from "./coordinate"

export class Tree {
    _root: Coordinate;
    _secondPoint: Coordinate;
    _angle: number;

    constructor(root: Coordinate, secPoint: Coordinate, angle: number) {
        this._root = root;
        this._secondPoint = secPoint;
        this._angle = angle;
    }

    root() {
        return this._root;
    }

    secondPoint() {
        return this._secondPoint;
    }

    pointLeft() {
        let xVal = this.secondPoint().x() + (this.mainBranchLength()/1.4)*Math.cos(this.angleOfMainBranch() + (this._angle*(Math.PI/180)));
        let yVal = this.secondPoint().y() - (this.mainBranchLength()/1.4)*Math.sin(this.angleOfMainBranch() + (this._angle*(Math.PI/180)));
        return new Coordinate(xVal, yVal);
    }

    pointRight() {
        console.log(this.angleOfMainBranch()*(180/Math.PI));
        let xVal = this.secondPoint().x() + (this.mainBranchLength()/1.4)*Math.cos(this.angleOfMainBranch() - (this._angle*(Math.PI/180)));
        let yVal = this.secondPoint().y() - (this.mainBranchLength()/1.4)*Math.sin(this.angleOfMainBranch() - (this._angle*(Math.PI/180)));
        return new Coordinate(xVal, yVal);
    }

    mainBranchLength() {
        return Math.sqrt((this.root().x() - this.secondPoint().x())**2 + (this.root().y() - this.secondPoint().y())**2);
    }

    angleOfMainBranch() {
        return Math.acos((this.secondPoint().x() - this.root().x())/ this.mainBranchLength());
    }
}
