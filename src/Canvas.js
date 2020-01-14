import React, { Component } from 'react';


class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
  }

  componentDidMount() {

      const canvas = this.canvasRef.current;
      const ctx = canvas.getContext('2d');
      ctx.beginPath();
      ctx.beginPath();
      ctx.moveTo(125, 125);
      ctx.lineTo(125, 45);
      ctx.lineTo(45, 125);
      ctx.closePath();
      ctx.stroke();


    // the fill color
    ctx.fillStyle = "#e8e8e8";
    ctx.fill()
   }

  render() {
    return <canvas width="640" height="1000" ref={this.canvasRef} />;
  }
}

export default Canvas;
