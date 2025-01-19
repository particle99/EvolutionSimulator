import { Canvas, createCanvas } from "canvas";

class Draw {
    public width: number;
    public height: number;

    public canvas: Canvas;

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;

        this.canvas = createCanvas(width, height);
    }
} 

export { Draw };