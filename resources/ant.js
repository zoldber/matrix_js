class Ant {

    constructor(nodeGraph, alpha, beta, avgDist) {

        // consider a more elegant solution than this
        this.graph = nodeGraph;

        this.alpha = alpha;

        this.beta = beta;

        // start position shouldn't be set in constructor, as it'll be reset multiple times in an epoch
        this.pos = -1;

        // store and update locally
        this.avgDist = avgDist;

        // running sum of travel distance
        this.tourDist;

        // list of visited edges, stored in order of tour
        this.tourPath = [];

        // list of unvisisted nodes, used in tandem with prob. distribution for each choice
        this.choices = [];

    }

    chooseNode(edgeMatrix) {

        // array of probabilities correpsonding to valid edge choices at current node
        let probs = [];
        var p = 0;
        var s = 0;

        const n = this.choices.length;

        for (var c = 0; c < n; c++) {

            console.log("A: " + this.alpha);
            console.log("B: " + this.beta);
            console.log("D: " + this.avgDist);
            console.log("p: " + this.pos);
            console.log("c: " + c);

            console.log("PISS: " + edgeMatrix[this.pos][c]);

            p = edgeMatrix[this.pos][c].weight(this.alpha, this.beta, this.avgDist);
            s += p;
            probs.push(p);

        }

        // normalize probabilities of valid edge choices
        for (var c = 0; c < n; c++) {

            probs[c] /= s;

        }

        console.log("PRB: " + probs);

        // javascript doesn't have native support for random normal Gaussian selection
        //  given a weighted list, found this on StackOverflow
        let r = Math.random();

        s = 0;

        let cumulative = probs.map(x => s += x);

        console.log("CUM: " + cumulative);

        // remove node from choices after selecting it probabilistically

    }

    initAtNodeIndex(idx) {

        console.log("- - ant spawned ant at index: " + idx);

        // start at idx
        this.pos = idx;

        // reset tour distance
        this.tourDist = 0;

        // reset tour
        this.tourPath = [idx];

        // (re)create list of valid choices (i.e. un-visited nodes)
        for (var i = 0; i < this.graph.nodes.length; i++) {

            if (i != idx) this.choices.push(i);

        }

    }

    traverseGraph() {

        var next;

        while (this.choices.length > 0) {

            next = this.chooseNode(this.edgeMatrix);

        }

    }

}