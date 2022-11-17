/*

    Holds nodes and plotting methods *only*

    This should be as sparse as possible, and should be passed to an ACOModel
    class that will facilitate actual computation and parameter storage. Only
    exception is nodeDistance() which is used for avoiding overlap during gen

*/

// currently this class is purely graphical, re-evaluate its implementation
class NodeStruct {

    constructor(x, y, r, ctx) {

        this.x = x;
        this.y = y;
        this.r = r;
        this.ctx = ctx;

    }

    drawNode(color) {

        this.ctx.beginPath();

        this.ctx.arc(this.x, this.y, this.r, 0, 2.0 * Math.PI, false);
        
        this.ctx.fillStyle = color;
    
        this.ctx.fill();

    }

    circleNode(color) {

        this.ctx.beginPath();

        this.ctx.arc(this.x, this.y, 2.0 * this.r, 0, 2.0 * Math.PI, false);
        
        this.ctx.strokeWidth = 1;

        this.ctx.strokeStyle = color;
    
        this.ctx.stroke();

    }

    labelNode(text) {

        this.ctx.fillStyle = "aqua";

        this.ctx.font = "12px Arial";

        this.ctx.fillText(text, this.x + 8, this.y + 8);

    }

    drawEdge(nextNode, color, width) {

        this.ctx.beginPath();

        this.ctx.moveTo(this.x, this.y);
    
        this.ctx.lineWidth = width;
    
        this.ctx.strokeStyle = color;
    
        this. ctx.lineTo(nextNode.x, nextNode.y);

        this.ctx.stroke();

    }

}

class NodeGraph {

    constructor(cnv, maxNodes) {

        this.ctx = cnv.getContext("2d");

        this.w = cnv.width;
        this.h = cnv.height;
 
        this.maxNodes = maxNodes;
        this.nodes = [];
        
    }

    #nodeDistance(nodeA, nodeB) {

        let dist = Math.sqrt(Math.pow(nodeA.x - nodeB.x, 2) + Math.pow(nodeA.y - nodeB.y, 2));

        return dist;

    }

    #nodeOverlap(node, k) {

        for (var i = 0; i < this.nodes.length; i++) {

            if (this.#nodeDistance(node, this.nodes[i]) < k) return true;

        }

        return false;

    }

    // generates an x or y within a window based on a w or h, and a margin percentage
    #boundRandom(dim, p) {

        p = (0 < p <= 1) ? p : 0.8;

        let margin = (1 - p) / 2;

        return (p * Math.random() * dim) + (margin * dim);

    }

    // places a non-overlapping node within page canvas and appends it to node list
    // note: while it's tempting to fill the distance matrix here because dist. is
    // calculated anyway, don't. This would require dynamic [n x n] sizing of the
    // matrix and have little positive impact on runtime since it's computed once
    genNewRandomized() {

        let x = this.#boundRandom(this.w, 0.8);
        let y = this.#boundRandom(this.h, 0.8);

        let node = new NodeStruct(x, y, 8, this.ctx);

        // if overlap detected, update coordinates until valid
        while (this.#nodeOverlap(node, 32)) {

            node.x = this.#boundRandom(this.w, 0.8);
            node.y = this.#boundRandom(this.h, 0.8);    

        }

        this.nodes.push(node);

    }

    // note: loops are split up on purpose, as edge color won't be the same
    // and nodes will have to be generated in one sweep after all edges are
    drawAll() {

        var i, j;

        for (i = 0; i < this.nodes.length; i++) {

            // connect to all previous nodes drawn in graph
            for (j = 0; j < i; j++) {

                this.nodes[i].drawEdge(this.nodes[j], "purple", 1);

            }

        }

        for (i = 0; i < this.nodes.length; i++) {

            this.nodes[i].drawNode("orange");

        }

    }

    // refreshes canvas
    clearDisp() {

        cnv.height = 512;
        cnv.width = 512;

    }

}