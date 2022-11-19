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

        // these parameters are set via evaluate() method
        this.alpha = 0;
        this.beta = 0;
        this.rho = 0;

        this.ants = [];

        this.graph = graph;

        this.nodes = this.graph.nodes;

        this.avgDist = 0;
        this.minDist = 0;

        this.perfLog = [];

        this.bestPath = null;

        // initialize edge matrix, compute avg dist
        this.edgeMatrix = [];

        const n = this.nodes.length;

        // note: row is tmp 
        var i, j, k, row = [];

        // fill edge matrix, 
        for (i = 0; i < n; i++) {

            for (j = 0; j < n; j++) {

                // TODO: REPLACE ME!!! 
                // updated to fix general-case scaling for pheromones, where null would be accessed
                // row.push((i == j) ? null : new Edge(this.nodes[i], this.nodes[j]));
                row.push(new Edge(this.nodes[i], this.nodes[j]));

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

    }

    // given an ant class, and using this.edgeMatrix, calculate weights for all valid edges,
    // choose an edge from the resultant weighted prob array, and return index of next node
    #chooseNext(ant) {
        // array of probabilities correpsonding to valid edge choices at current node
        let probs = [];
        var p = 0;
        var s = 0;

        const n = ant.choices.length;

        for (var c = 0; c < n; c++) {

            p = this.edgeMatrix[ant.pos][ant.choices[c]].weight(this.alpha, this.beta, this.avgDist);
            s += p;
            probs.push(p);

        }

        // normalize probabilities of valid edge choices
        for (var c = 0; c < n; c++) {

            probs[c] /= s;

        }

        // javascript doesn't have native support for random normal Gaussian selection
        //  given a weighted list, found this on StackOverflow
        let r = Math.random();

        s = 0;

        // cumulative weights
        let cw = probs.map(x => s += x);

        for (var i = 0; i < n; i++) {

            if (cw[i] > r) return i;

        }

        return 0;   // fault condition

    }

    // returns random list of N unique indices to start ants at (generated for each epoch)
    #genStartPoints(n) {

        // list of valid start points
        let uniqueIndices = [...Array(this.nodes.length).keys()];

        // list of chosen start points
        let startIndices = [];

        var i, j;

        var startIndex;

        for (i = 0; i < n; i++) {

            j = Math.floor(Math.random() * uniqueIndices.length);

            startIndex = uniqueIndices[j];

            uniqueIndices.splice(j, 1);   // remove 1 element at index j

            startIndices.push(startIndex);

        }

        return startIndices;

    }

    // global update (decay) of pheromones
    #updateEdgeMatrixPheromones(rho) {

        var r, c;

        const n = this.edgeMatrix.length;

        for (r = 0; r < n; r++) {

            for (c = 0; c < n; c++) {

                this.edgeMatrix[r][c].phero *= (1.0 - rho);
                this.edgeMatrix[c][r].phero *= (1.0 - rho);

            }

        }

    }

    // WARNING! DIFFERENCE BETWEEN C AND CHOICE IN CODE BLOCK BELOW:
    // C is a sub-index guarenteed to fall within a shrinking ant.choices[]
    // IT SHOULDN'T BE USE FOR ANYTHING BUT FETCHING ant.choices[c], which
    // is the true index of the node in question

    evaluate(params) {

        this.numAnts = params.numAnts;
        this.numEpochs = params.numEpochs;
        this.alpha = params.alpha;
        this.beta = params.beta;
        this.rho = params.rho;

        // epoch index
        // ant index
        // starting points generated via even distribution for each epoch
        var epoch, a;

        // note: this isn't the same as initializing the ants at the start of each epoch
        for (a = 0; a < this.numAnts; a++) this.ants.push(new Ant(this.graph));

        // run desired number of tours
        for (epoch = 0; epoch < this.numEpochs; epoch++) {

            let sp = this.#genStartPoints(this.numAnts);

            this.nodes.forEach(node => { node.drawNode("Orange"); });

            // BEGIN ONE PASS {
            for (a = 0; a < this.numAnts; a++) {
                                
                this.ants[a].initAtNodeIndex(sp[a]);
                
                // while the ant has a nonzero destination list (choices[]),
                //  - choose from weighted edges in aforementioned dest. list
                //  - goTo(choice)
                //  - - update ant.pos to choice
                //  - - add choice to visited list
                //  - - remove choice from dest. list
                //  - - add distance of edge traversal to ant.tourDist
                //  - 
                while(this.ants[a].choices.length > 0) {

                    // chooseNext() is a function of alpha and beta, but they're assumed to
                    // be static members of edgeMatrix, and hence are pulled from its scope
                    let c = this.#chooseNext(this.ants[a]);

                    let choice = this.ants[a].choices[c];

                    let chosenEdge = this.edgeMatrix[this.ants[a].pos][choice];

                    // add traversed node index to path, set .pos to it, remove it from ant's choices
                    this.ants[a].tourPath.push(chosenEdge);
                    this.ants[a].choices.splice(c, 1);
                    this.ants[a].tourDist += chosenEdge.dist;

                    // TODO: THIS IS WHERE ANTS DRAW LINES
                    //this.graph.nodes[this.ants[a].pos].drawEdge(this.graph.nodes[choice], "gray", 1);
                    
                    this.ants[a].pos = choice;
                    
                }

                //AFTER LOOPING, DO ONE FINAL EDGE TRAVERSAL TO GO BACK TO START NODE
                let chosenEdge = this.edgeMatrix[this.ants[a].pos][sp[a]];
                this.ants[a].tourPath.push(chosenEdge);
                this.ants[a].tourDist += chosenEdge.dist;
            
            }
            // } END ONE PASS

            this.#updateEdgeMatrixPheromones(this.rho);

            for (a = 0; a < this.numAnts; a++) {

                this.ants[a].updateTourPheromones(this.minDist / this.numAnts);

                if (this.ants[a].tourDist < this.minDist) {

                    this.minDist = this.ants[a].tourDist;

                    this.bestPath = this.ants[a].tourPath;

                    this.perfLog.push(new Point(((epoch * this.numAnts) + a), this.minDist));

                }

            }

        }

    }

}