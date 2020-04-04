import React, {Component} from 'react';
import {Koch} from "./components/koch";
import {Coordinate} from "./components/koch"
import './App.css';

class App extends Component {

  _latestLines: Koch[] = [];

  constructor(props: any) {
    super(props);
    this.updateKochLines = this.updateKochLines.bind(this);
  }

  drawCircle(x: number, y: number, dia: number, ctx: CanvasRenderingContext2D) {
    
    // begin curve
    ctx.beginPath();
    ctx.strokeStyle = "#FFFFFF";
    ctx.arc(x, y, dia, 0, Math.PI*2, true);
    ctx.stroke();
    if (dia > 10) {
      setTimeout(() => {this.drawCircle(x - dia, y, dia/2.0, ctx);}, 60);
      setTimeout(() => {this.drawCircle(x + dia, y, dia/2.0, ctx);}, 60);
      // this.drawCircle(x, y, dia/2.0, ctx);
      // this.drawCircle(x, y, dia/2.0, ctx);
    }
  }


  drawTriangle(p1: number, p2: number, p3: number, ctx: CanvasRenderingContext2D) {

    // begin curve
    ctx.beginPath();
    ctx.strokeStyle = "#FFFFFF";
    ctx.moveTo(p1, p2);
    ctx.lineTo(p2, p3);
    ctx.lineTo(p3, p1);
    ctx.closePath();
    ctx.stroke();
    if (p1 > 4 && p2 > 4 && p3 > 4) {
      setTimeout(() => {this.drawTriangle(p1, p2/1.1, p3, ctx);}, 35);
      // setTimeout(() => {this.drawTriangle((p1+p2)/2, (p2+p3)/2, (p3+p1)/2, ctx);}, 35);
      // this.drawTriangle(p1/2, p2, p3, ctx);
    }
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

  updateKochLines() {
    let canvas = document.getElementById("fractalCanvas") as HTMLCanvasElement;
    let ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    let tempLatestLines: Koch[] = [];
    console.log(this);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this._latestLines.forEach(kochLine => {
      for (let pointPos: number = 0; pointPos < kochLine.allKochPoints().length - 1; pointPos++) {
        tempLatestLines.push(new Koch(kochLine.allKochPoints()[pointPos], kochLine.allKochPoints()[pointPos + 1 ]));
        this.drawKochCruve(new Koch(kochLine.allKochPoints()[pointPos], kochLine.allKochPoints()[pointPos + 1 ]), ctx);
      }
    });
    this._latestLines = tempLatestLines;  
  }

  componentDidMount() {
    let canvas = document.getElementById("fractalCanvas") as HTMLCanvasElement;
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    this._latestLines = [new Koch(new Coordinate(canvas.width*0.1, canvas.height/2), new Coordinate(canvas.width*0.9, canvas.height/2))];
    // this.drawCircle(canvas.width/2, canvas.height/2, 350, ctx);
    // this.drawTriangle(300, 600, 300, ctx);
  }

  render() {
    return (
      <div>
        <canvas id="fractalCanvas" onClick={this.updateKochLines}></canvas>
      </div>
    );
  }
}

export default App;
