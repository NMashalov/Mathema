import { P5CanvasInstance, ReactP5Wrapper } from "@p5-wrapper/react";
import { useState } from "react";

function sketch(p5: P5CanvasInstance) {
    let angle : number;
    const sat = 30

    p5.setup = () => {
        p5.createCanvas(1920, 1080);
        p5.background(220);
        p5.colorMode(p5.HSB, 360, 150, 100, 1);
    }
    p5.updateWithProps = (props: { angle: number }) => {
        if (props.angle) {
            angle = props.angle;
        }

    };

    p5.mousePressed = () => {
        p5.clear();
        p5.background(220);
    }

    p5.draw = () => {
        p5.translate(p5.width / 2, p5.height / 2);
        
        for (let i = 0; i < angle; i++) {
            p5.rotate(angle)
            p5.strokeWeight(5);
            p5.stroke(p5.mouseX, p5.mouseX, p5.mouseX, 0.5);
            p5.line(p5.mouseX, p5.mouseY, p5.pmouseX, p5.pmouseY);
        }
  }
}


export function Caleido(){

    const [angle]= useState(100)

    return <ReactP5Wrapper
        fallback={<h1>No sketch selected yet.</h1>}
        sketch={sketch}
        angle={angle} 
      />
}



