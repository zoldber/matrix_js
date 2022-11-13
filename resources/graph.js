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

    constructor(cnv, maxNodes) {

        this.ctx = cnv.getContext("2d");

        this.w = cnv.width;
        this.h = cnv.height;

        this.maxNodes = maxNodes;
        this.nodes = [];

        this.distMatrix = [];

        this.ants = [];

    }

    #nodeDistance(nodeA, nodeB) {

        return Math.sqrt(Math.pow(nodeA.x - nodeB.x, 2) + Math.pow(nodeA.y - nodeB.y, 2));

    }


    #nodeOverlap(node, k) {

        for (var i = 0; i < this.nodes.length; i++) {

            if (this.#nodeDistance(node.x, node.y, this.nodes[i]) < k) return true;

        }

        return false;

    }

    // generates an x or y within a window based on a w or h, and a margin percentage
    #boundRandom(dim, p) {

        p = (0 < p <= 1) ? p : 0.8;

        let margin = (1 - p) / 2;

        return (p * Math.random() * dim) + (margin * dim);

    }

    // selects 
    #chooseNextNode(currNode, a, b, dMean) {

    }

    // places a non-overlapping node within page canvas and appends it to node list
    // note: while it's tempting to fill the distance matrix here because dist. is
    // calculated anyway, don't. This would require dynamic [n x n] sizing of the
    // matrix and have little positive impact on runtime since it's computed once
    genNewRandomized() {

        let x = this.#boundRandom(this.w, 0.8);
        let y = this.#boundRandom(this.h, 0.8);

        let node = new NodeStruct(x, y, 8);

        // if overlap detected, update coordinates until valid
        while (this.#nodeOverlap(node, 64)) {

            node.x = this.#boundRandom(this.w, 0.8);
            node.y = this.#boundRandom(this.h, 0.8);    

        }

        this.nodes.push(node);

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

    // see above
    fillDistMatrix() {

        //tmp row buffer
        let row = [];

        for (var i = 0; i < this.nodes.length; i++) {

            for (var j = 0; j < this.nodes.length; j++) {

                // use of ternary to force a 0 is probably overkill, but need exact
                // zero value when executing ACO to avoid divergence (avoid flp errors)
                row.push((i == j) ? 0 : this.#nodeDistance(this.nodes[i], this.nodes[j]));

            }

            this.distMatrix.push(row);

            console.log(row);

            row = [];

        }

    }

    executeACO(alpha, beta, rho, numEpochs, numAnts) {

        // 'ants' stores indices corresponding to this.nodes
        let ants = [];
        let bestPath = null;

    }

}