/*

    Holds node objects / utilities

*/

function functTest() {

    document.getElementById("nodeGraphCanvas").style.color = "red";

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