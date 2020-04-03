import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props: any) {
    super(props);
  }


  drawCircle(x: number, y: number, dia: number, ctx: CanvasRenderingContext2D) {
    
    // begin curve
    ctx.beginPath();
    ctx.arc(x, y, dia, 0, Math.PI*2, true);
    ctx.stroke();
    if (dia > 10) {
      this.drawCircle(x - dia, y, dia/2.0, ctx);
      this.drawCircle(x + dia, y, dia/2.0, ctx);
      // this.drawCircle(x, y, dia/2.0, ctx);
      // this.drawCircle(x, y, dia/2.0, ctx);
    }
  }


  drawTriangle(p1: number, p2: number, p3: number, ctx: CanvasRenderingContext2D) {

    // begin curve
    ctx.beginPath();
    ctx.moveTo(p1, p2);
    ctx.lineTo(p2, p3);
    ctx.lineTo(p3, p1);
    ctx.closePath();
    ctx.stroke();
    if (p1 > 4 && p2 > 4 && p3 > 4) {
      setTimeout(() => {this.drawTriangle(p1, p2/1.1, p3, ctx);}, 35)
      // this.drawTriangle(p1/2, p2, p3, ctx);
    }
  }

  componentDidMount() {
    let canvas = document.getElementById("fractalCanvas") as HTMLCanvasElement;
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    let ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    // this.drawCircle(700, 350, 350, ctx);
    this.drawTriangle(300, 600, 300, ctx);
  }

  render() {
    return (
      <div>
        <canvas id="fractalCanvas"></canvas>
      </div>
    );
  }
}

export default App;
