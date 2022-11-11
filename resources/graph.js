/*

    Holds node objects / utilities

*/

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

    ctx.strokeStyle = "orange";

    ctx.fill();

    ctx.stroke();

}

class NodeStruct {

    constructor(x, y, r) {

        this.x = x;
        this.y = y;
        this.r = r;

    }

    draw(ctx) {

        ctx.beginPath();

        ctx.arc(this.x, this.y, this.r, 0, 2.0 * Math.PI, false);
    
        ctx.lineWidth = 2;
    
        ctx.strokStyle = "orange";
    
        ctx.stroke();

        ctx.fill();

    }

}

class NodeGraph {

    constructor(n) {

        this.nodes = [];

        xRand = 128;
        yRand = 128;
        radius = 64;

        let node = new Node(xRand, yRand, radius);

        for (var i = 0; i < n; i++) {

            this.nodes.push(node);

        }

    }

    draw(ctx) {

        for (node in this.nodes) {

            node.draw(ctx);

        }

    }

}