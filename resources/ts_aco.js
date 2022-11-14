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

        this.nodes = graph.nodes;
        
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

    evaluate(alpha, beta, rho, numTours, numAnts) {

        // 0. arg checks
        if (numAnts >= this.nodes.length) {

            console.log("ant limit exceeded, initialize fewer ants than nodes");

            validConfig = false;

        }

        let startPoints = [...Array(this.nodes.length).keys()];

        var i, j;

        var start;

        // 1. create ants, clear edge render first for demo
        graph.clearDisp();

        for (i = 0; i < this.nodes.length; i++) this.nodes[i].drawNode("orange");

        for (i = 0; i < numAnts; i++) {

            j = Math.floor(Math.random() * startPoints.length);

            start = startPoints[j];

            startPoints.splice(j, 1);   // remove 1 element at index j

            this.nodes[j].drawNode("aqua");  // indicate starting pos

            this.ants.push(new Ant(start, graph));

        }

        // run desired number of tours
        for (var tour = 0; tour < numTours; tour++) {



        }

    }

}