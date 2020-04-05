import React, {Component} from 'react';
import {Koch} from "./components/koch";
import {Coordinate} from "./components/coordinate";
import {Tree} from "./components/tree";
import './App.css';

class App extends Component {

  _latestLines: Koch[] = [];
  _latestTreeLines: Tree[] = [];
  _treeAngle = 45;
  _treeThickness = 10;

  constructor(props: any) {
    super(props);
    this.updateKochLines = this.updateKochLines.bind(this);
    this.updateTreeLength = this.updateTreeLength.bind(this);
    this.updateTreeAngle = this.updateTreeAngle.bind(this);
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
        setTimeout(()=>{this.drawKochCruve(new Koch(kochLine.allKochPoints()[pointPos], kochLine.allKochPoints()[pointPos + 1 ]), ctx);}, 30);
      }
    });
    this._latestLines = tempLatestLines;  
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

  componentDidMount() {
    let canvas = document.getElementById("fractalCanvas") as HTMLCanvasElement;
    let ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    this._latestTreeLines = [new Tree(new Coordinate(canvas.width/2, canvas.height), new Coordinate(canvas.width/2, canvas.height*(3/4)), 45)];
    // this.drawTree(new Tree(new Coordinate(canvas.width/2, canvas.height), new Coordinate(canvas.width/2, canvas.height*(3/4))), ctx, 0);
    // this._latestLines = [new Koch(new Coordinate(canvas.width*0.3, canvas.height/3), new Coordinate(canvas.width*0.7, canvas.height/3)),
    //   new Koch(new Coordinate(canvas.width*0.7, canvas.height/3), new Coordinate(canvas.width*0.5, (canvas.height/3 + (canvas.width*0.4)/Math.sqrt(2)))),
    //   new Koch(new Coordinate(canvas.width*0.5, (canvas.height/3 + (canvas.width*0.4)/Math.sqrt(2))), new Coordinate(canvas.width*0.3, canvas.height/3 ))
    // ];
    // this.drawCircle(canvas.width/2, canvas.height/2, 350, ctx);
    // this.drawTriangle(300, 600, 300, canvas.getContext("2d") as CanvasRenderingContext2D);
  }

  render() {
    return (
      <div>
        <div id="canvasRow">
          <canvas id="fractalCanvas" /*onClick={this.updateKochLines}*/></canvas>
          <input type="range" className="custom-range" min="-90" max="90" step="15" id="customVertRange" defaultValue="-90" onChange={this.updateTreeAngle}></input>
        </div>
        {/* <label for="customRange3">Example range</label> */}
      <input type="range" className="custom-range" min="-90" max="90" step="15" id="customRange" defaultValue="-90" onChange={this.updateTreeLength}></input>
      </div>
    );
  }
}

export default App;
