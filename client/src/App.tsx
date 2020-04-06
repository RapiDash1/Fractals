import React, {Component} from 'react';
import {Coordinate} from "./components/coordinate";
import {Tree} from "./components/Tree/tree";
import {Navbar} from "./components/Navbar/Navbar";
import {KochElement} from "./components/Koch/kochElement";
import {TreeElement} from "./components/Tree/treeComponent";
import './App.css';

class App extends Component {

  constructor(props: any) {
    super(props);
    this.state = {
      navBarClickElement : "",
    }
  }

  navbarCallBack = (message: string) => {
    console.log(message);
    this.setState({
      navBarClickElement: message
    });
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

  render() {
    const displayElement = (Object.values(this.state)[0] == "Koch curve")? <KochElement /> : <TreeElement />;
    return (
      <div id="App">
        <Navbar parentCallback={this.navbarCallBack}/>
        {/* <KochElement /> */}
        {/* <TreeElement /> */}
        {displayElement}
      </div>
    );
  }
}

export default App;
