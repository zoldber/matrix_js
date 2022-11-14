class Edge {

    // passed nodes during init instead of indices and nodeList ref
    constructor(n1, n2) {

        this.n1 = n1;
        this.n2 = n2;

        this.dist = Math.sqrt(Math.pow(this.n1.x - this.n2.x, 2) + Math.pow(this.n1.y - this.n2.y, 2));

        this.phero = 1.0;

    }

    // assigns weight to edge during next node selection in tour
    weight(alpha, beta, avgDist) {

        return Math.pow(this.phero, alpha) * Math.pow((avgDist / this.dist), beta);

    }

}

class ACOModel {

    constructor(graph) {

        this.ants = [];

        this.graph = graph;

        this.nodes = this.graph.nodes;

        this.avgDist = 0;
        this.minDist = 0;

        // initialize edge matrix, compute avg dist
        this.edgeMatrix = [];

        const n = this.nodes.length;

        // note: row is tmp 
        var i, j, k, row = [];

        // fill edge matrix, 
        for (i = 0; i < n; i++) {

            for (j = 0; j < n; j++) {

                row.push((i == j) ? null : new Edge(this.nodes[i], this.nodes[j]));

            }

            for (k = i + 1; k < n; k++) {
                
                this.avgDist += row[k].dist;

            }

            this.edgeMatrix.push(row);

            row = [];

        }

        // start off mindist at total distance of all edges
        this.minDist = this.avgDist;

        // div sum by N compared (N is number of edges in upper tri of matrix, N != n) to compute avg.
        this.avgDist /= (n * (n - 1) / 2);

        console.log("sum dist = " + this.minDist);
        console.log("avg dist = " + this.avgDist);

    }

    #calcStartPoints(n) {

        // list of valid start points
        let uniqueIndices = [...Array(this.nodes.length).keys()];

        // list of chosen start points
        let startIndices = [];

        var i, j;

        var startIndex;

        // 1. create ants, clear edge lines in canvas for demo
        graph.clearDisp();

        for (i = 0; i < this.nodes.length; i++) this.nodes[i].drawNode("orange");

        for (i = 0; i < n; i++) {

            j = Math.floor(Math.random() * uniqueIndices.length);

            startIndex = uniqueIndices[j];

            uniqueIndices.splice(j, 1);   // remove 1 element at index j

            // fix: line below used to be .nodes[j] which caused a lot
            //      of grief before realizing index j was being found
            //      as an index within a shrinking array and passed
            //      to a node array of fixed length, hence, for
            //      uniqueIndices = {1, 2, 3, 4, 5}
            //      ~ randomizer picks j = 1, removes '2'
            //      ~ ~ nodes[j].draw() = nodes[1].draw();
            //      uniqueIndices = {1, 3, 4, 5}
            //      ~ randomizer picks j = 1, removes '3'
            //      ~ ~ nodes[j].draw() = nodes[1].draw();
            //      uniqueIndices = {1, 4, 5}
            //      ~ randomizer picks j = 1, removes '4'
            //      ~ ~ nodes[j].draw() = nodes[1].draw();
            //
            //      which color highlights the same invalid starting point j='1'
            //      three times over. Because this was randomly chosen, it only
            //      happened occasionally and rarely ever >2 times in one run
            //      so (n - 1) highlighted node would *occasionally* be seen 

            startIndices.push(startIndex);

        }

        return startIndices;

    }

    #updateEdgeMatrixPheromones(rho) {

        var r, c;

        const n = this.edgeMatrix.length;

        for (r = 0; r < n; r++) {

            for (c = 0; c < n; c++) {

                this.edgeMatrix[r][c] *= (1 - rho);

            }

        }

    }

    evaluate(alpha, beta, rho, numEpochs, numAnts) {

        // 0. arg checks
        if (numAnts >= this.nodes.length) {

            console.log("ant limit exceeded, initialize fewer ants than nodes");

            validConfig = false;

        }

        // epoch index
        // ant index
        // starting points generated via even distribution for each epoch
        var epoch, ant, sp = [];

        // note: this isn't the same as initializing the ants at the start of each epoch
        
        for (ant = 0; ant < numAnts; ant++) this.ants.push(new Ant(this.graph, alpha, beta, this.avgDist));

        // run desired number of tours
        for (epoch = 0; epoch < numEpochs; epoch++) {

            sp = this.#calcStartPoints(numAnts);

            console.log("EPOCH: " + epoch);

            for (ant = 0; ant < numAnts; ant++) {

                this.nodes[sp[ant]].circleNode("aqua");
                this.ants[ant].initAtNodeIndex(sp[ant]);
                this.ants[ant].traverseGraph();

            }



        }

    }

}