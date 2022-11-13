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



    #nodeOverlap(x, y, k) {

        let dist = 0;

        for (var i = 0; i < this.nodes.length; i++) {

            dist = Math.sqrt(Math.pow(x - this.nodes[i].x, 2) + Math.pow(y - this.nodes[i].y, 2));

            console.log(dist);

            if (dist < k) return true;

        }

        return false;

    }

    //s = scale (e.g. the window dimension that the value must exist within), p = margin percentage
    #boundRandom(dim, p) {

        p = (0 < p <= 1) ? p : 0.8;

        let margin = (1 - p) / 2;

        return (p * Math.random() * dim) + (margin * dim);

    }

    genNewRandomized() {

        let x = this.#boundRandom(this.w, 0.8);
        let y = this.#boundRandom(this.h, 0.8);

        while (this.#nodeOverlap(x, y, 30)) {

            x = this.#boundRandom(this.w, 0.8);
            y = this.#boundRandom(this.h, 0.8);    

        }

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