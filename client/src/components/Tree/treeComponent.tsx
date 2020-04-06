import React from "react";
import {Tree} from "./tree";
import {Coordinate} from "../coordinate";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button} from "react-bootstrap";
import "./tree.css";

export class TreeElement extends React.Component {

    _latestTreeLines: Tree[] = [];
    _treeAngle = this.defaultAngle();
    _treeThickness = this.defaultTreeThickness();

    constructor(props: any) {
        super(props);
        this.updateTreeLength = this.updateTreeLength.bind(this);
        this.updateTreeAngle = this.updateTreeAngle.bind(this);
        this.resetCanvas = this.resetCanvas.bind(this);
    }

    defaultLatestLines(canvas: HTMLCanvasElement) {
        return [new Tree(new Coordinate(canvas.width/2, canvas.height), new Coordinate(canvas.width/2, canvas.height*(3/4)), 45)];
    }

    defaultTreeThickness() {
        return 10;
    }

    defaultAngle() {
        return 45;
    }

    defaultSliderValue() {
        return "-90";
    }

    drawTree(baseTree: Tree, ctx: CanvasRenderingContext2D, lineWidth: number) {
        ctx.beginPath();
        ctx.strokeStyle = "#FFFFFF";
        ctx.lineWidth = lineWidth;
        ctx.moveTo(baseTree.root().x(), baseTree.root().y());
        ctx.lineTo(baseTree.secondPoint().x(), baseTree.secondPoint().y());
        ctx.lineTo(baseTree.pointLeft().x(), baseTree.pointLeft().y());
        ctx.moveTo(baseTree.secondPoint().x(), baseTree.secondPoint().y());
        ctx.lineTo(baseTree.pointRight().x(), baseTree.pointRight().y());
        ctx.stroke();
    }
    
      updateTreeLength() {
        let canvas = document.getElementById("fractalCanvas") as HTMLCanvasElement;
        let ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
        let tempLatestTreeLines: Tree[] = [];
        this._treeThickness *= 0.8;
        this._latestTreeLines.forEach(treeLine=> {
          tempLatestTreeLines.push(new Tree(treeLine.secondPoint(), treeLine.pointRight(), this._treeAngle));
          tempLatestTreeLines.push(new Tree(treeLine.secondPoint(), treeLine.pointLeft(), this._treeAngle));
          this.drawTree(new Tree(treeLine.root(), treeLine.secondPoint(), this._treeAngle), ctx, this._treeThickness);
          this.drawTree(new Tree(treeLine.secondPoint(), treeLine.pointRight(), this._treeAngle), ctx, this._treeThickness);
          this.drawTree(new Tree(treeLine.secondPoint(), treeLine.pointLeft(), this._treeAngle), ctx, this._treeThickness);
        });
        this._latestTreeLines = tempLatestTreeLines;
    }
    
    
      updateTreeAngle() {
        let inputSlider = document.getElementById("customVertRange") as HTMLInputElement;
        this._treeAngle = Number(inputSlider.value);
        console.log(this._treeAngle);
    }

    resetCanvas() {
        let canvas = document.getElementById("fractalCanvas") as HTMLCanvasElement;
        let ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        this._latestTreeLines = this.defaultLatestLines(canvas);
        this._treeThickness = this.defaultTreeThickness();
        let treeHeightSlider = document.getElementById("customRange") as HTMLInputElement;
        treeHeightSlider.value = this.defaultSliderValue();
        let treeVertSlider = document.getElementById("customVertRange") as HTMLInputElement;
        treeVertSlider.value = this.defaultSliderValue();
        this._treeAngle = this.defaultAngle();
    }

    componentDidMount() {
        let canvas = document.getElementById("fractalCanvas") as HTMLCanvasElement;
        let ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
        canvas.height = window.innerHeight;
        canvas.width = window.innerWidth;
        this._latestTreeLines = this.defaultLatestLines(canvas);
    }

    render() {
        return (
            <div>
            <div id="canvasRow">
                <canvas id="fractalCanvas"></canvas>
                <input type="range" className="custom-range" min="-90" max="90" step="15" id="customVertRange" defaultValue="-90" onChange={this.updateTreeAngle}></input>
                </div>
                <input type="range" className="custom-range" min="-90" max="90" step="15" id="customRange" defaultValue="-90" onChange={this.updateTreeLength}></input>
                <Button variant="dark" id="resetTreeButton" onClick={this.resetCanvas}>Reset canvas</Button>   
            </div>
        );
    }
}