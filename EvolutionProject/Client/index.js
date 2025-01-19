const cvs = document.getElementById("canvas");
const ctx = cvs.getContext("2d");

ctx.strokeStyle = "black";
ctx.strokeRect(0, 0, 800, 800);

const ws = new WebSocket("ws://localhost:8080");

ws.binaryType = "arraybuffer";

ws.onopen = () => {
    console.log("[Socket] socket connected, simulation starting...");
}

ws.onmessage = (msg) => {
    const data = JSON.parse((msg.data));

    ctx.clearRect(0, 0, 800, 800);

    data.forEach(x => {
        const color = `rgb(${x.color[0]}, ${x.color[1]}, ${x.color[2]})`
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.arc(x.x * 10, x.y * 10, 2, 0, Math.PI*2, false);
        ctx.fill();
    })
}