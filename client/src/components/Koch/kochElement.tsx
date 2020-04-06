import React from "react";
import {Koch} from "./koch";
import {Coordinate} from "../coordinate";
import {Button} from "react-bootstrap";
import "./koch.css"
import 'bootstrap/dist/css/bootstrap.min.css';


export class KochElement extends React.Component {

    
  _latestLines: Koch[] = [];
  _breakAnimation: boolean = false;

    constructor(props: any) {
        super(props);
        this.updateKochLines = this.updateKochLines.bind(this);
        this.resetCanvas = this.resetCanvas.bind(this);
    }

    defaultLatestLines(canvas: HTMLCanvasElement) {
        return [new Koch(new Coordinate(canvas.width*0.3, canvas.height/3), new Coordinate(canvas.width*0.7, canvas.height/3)),
            new Koch(new Coordinate(canvas.width*0.7, canvas.height/3), new Coordinate(canvas.width*0.5, (canvas.height/3 + (canvas.width*0.4)/Math.sqrt(2)))),
            new Koch(new Coordinate(canvas.width*0.5, (canvas.height/3 + (canvas.width*0.4)/Math.sqrt(2))), new Coordinate(canvas.width*0.3, canvas.height/3 ))
        ];
    }

    speedSliderValue() {
        let speedSlider = document.getElementById("customRange1") as HTMLInputElement;
        return Number(speedSlider.value);
    }

    updateKochLines() {
        this._breakAnimation = false;
        let canvas = document.getElementById("fractalCanvas") as HTMLCanvasElement;
        let ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
        let tempLatestLines: Koch[] = [];
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        this._latestLines.forEach(kochLine => {
            for (let pointPos: number = 0; pointPos < kochLine.allKochPoints().length - 1; pointPos++) {   
                console.log(this._breakAnimation); 
                if (!this._breakAnimation) {
                    tempLatestLines.push(new Koch(kochLine.allKochPoints()[pointPos], kochLine.allKochPoints()[pointPos + 1 ]));
                    setTimeout(()=>{this.drawKochCruve(new Koch(kochLine.allKochPoints()[pointPos], kochLine.allKochPoints()[pointPos + 1 ]), ctx);}, 100*(1/this.speedSliderValue()));
                }
            }
        });
        this._latestLines = tempLatestLines;  
    }


    drawKochCruve(kochLine: Koch, ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.strokeStyle = "#FFFFFF";
        ctx.moveTo(kochLine.pointA().x(), kochLine.pointA().y());
        ctx.lineTo(kochLine.pointB().x(), kochLine.pointB().y());
        ctx.lineTo(kochLine.pointC().x(), kochLine.pointC().y());
        ctx.lineTo(kochLine.pointD().x(), kochLine.pointD().y());
        ctx.lineTo(kochLine.pointE().x(), kochLine.pointE().y());
        ctx.stroke();
    }

    resetCanvas() {
        let canvas = document.getElementById("fractalCanvas") as HTMLCanvasElement;
        let ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        this._latestLines = this. defaultLatestLines(canvas);
        this._breakAnimation = true;
    }


    componentDidMount() {
        let canvas = document.getElementById("fractalCanvas") as HTMLCanvasElement;
        let ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
        canvas.height = window.innerHeight;
        canvas.width = window.innerWidth;
        this._latestLines = this.defaultLatestLines(canvas);
    }


    render() {
        return (
            <div>
                <div id="canvasRow">
                    <canvas id="fractalCanvas"></canvas>
                </div>
                <Button variant="dark" id="generateKochCurveButton" onClick={this.updateKochLines}>Generate curve</Button>
                <input type="range" className="custom-range" id="customRange1" defaultValue="50" min="25" max="100" />
                <Button variant="dark" id="resetButton" onClick={this.resetCanvas}>Reset canvas</Button>
            </div>
        );
    }
}