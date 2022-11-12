/*

    Holds node objects / utilities

*/

class NodeStruct {

    constructor(x, y, r) {

        this.x = x;
        this.y = y;
        this.r = r;

    }

    drawNode(ctx) {

        ctx.beginPath();

        ctx.arc(this.x, this.y, this.r, 0, 2.0 * Math.PI, false);
        
        ctx.fillStyle = "orange";
    
        ctx.fill();

    }

    drawEdge(nextNode, ctx) {

        ctx.beginPath();

        ctx.moveTo(this.x, this.y);
    
        ctx.lineWidth = 1;
    
        ctx.strokeStyle = "purple";
    
        ctx.lineTo(nextNode.x, nextNode.y);

        ctx.stroke();

    }

}

class NodeGraph {

    constructor(cnv) {

        this.ctx = cnv.getContext("2d");

        this.w = cnv.width;
        this.h = cnv.height;

        this.maxNodes = 5;
        this.nodes = [];

    }

    genNewRandom() {

        // padding defined as percentage, change later:
        let x = (0.8 * Math.random() * this.w) + (0.1 * this.w);
        let y = (0.8 * Math.random() * this.h) + (0.1 * this.h);

        this.nodes.push(new NodeStruct(x, y, 8));

    }

    // note: loops are split up on purpose, as edge color won't be the same
    // and nodes will have to be generated in one sweep after all edges are
    updateDisp() {

        var i, j;

        for (i = 0; i < this.nodes.length; i++) {

            // connect to all previous nodes drawn in graph
            for (j = 0; j < i; j++) {

                this.nodes[i].drawEdge(this.nodes[j], this.ctx);

            }

        }

        for (i = 0; i < this.nodes.length; i++) {

            this.nodes[i].drawNode(this.ctx);

        }

    }

}