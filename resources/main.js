function initGraph() {

    const c = document.getElementById("nodeGraphCanvas");

    const ctx = c.getContext("2d");

    c.height = 512;
    c.width = 512;

    r = 10;

    x = 2*r + Math.random() * (c.width - 2*r);
    y = 2*r + Math.random() * (c.height - 2*r);

    ctx.beginPath();

    ctx.arc(x, y, r, 0, 2.0 * Math.PI, false);

    ctx.fillStyle = "red";

    ctx.lineWidth = 1;

    ctx.strokeStyle = "aqua";

    ctx.fill();

    ctx.stroke();

}