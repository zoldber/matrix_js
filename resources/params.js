// This entire file reflects my lack of experience with
// input validation in JavaScript. Hopefully this mess
// will soon be replaced with something more elegant

class Params {

    constructor(graph) {

        this.antCountPE = document.getElementById("antCountPE");
        this.epochCountPE = document.getElementById("epochCountPE");
        this.alphaPE = document.getElementById("alphaPE");
        this.betaPE = document.getElementById("betaPE");
        this.rhoPE = document.getElementById("rhoPE");

        this.graph = graph;

        // don't set defaults here, just call .update() after init.

    }

    #bound(val, bMin, bMax) {

        return Math.max(bMin, Math.min(val, bMax));

    }

    #updateEntryFields() {

        this.antCountPE.value = this.numAnts;
        this.epochCountPE.value = this.numEpochs;
        this.alphaPE.value = this.alpha;
        this.betaPE.value = this.beta;
        this.rhoPE.value = this.rho;

    }

    // expects numNodes because numAnts is bound by this
    update() {

        this.numAnts = parseInt(this.antCountPE.value);
        this.numEpochs = parseInt(this.epochCountPE.value);
        this.alpha = parseFloat(this.alphaPE.value);
        this.beta = parseFloat(this.betaPE.value);
        this.rho = parseFloat(this.rhoPE.value);

        if (isNaN(this.numAnts)) {
            this.numAnts = 4;
        } else {
            this.numAnts = this.#bound(this.numAnts, 1, this.graph.nodes.length);
        }

        if (isNaN(this.numEpochs)) {
            this.numEpochs = 200;
        } else {
            this.numEpochs = this.#bound(this.numEpochs, 1, 300);
        }

        if (isNaN(this.alpha)) {
            this.alpha = 1.0;
        } else {
            this.alpha = this.#bound(this.alpha, 0.00001, 10);
        }

        if (isNaN(this.beta)) {
            this.beta = 1.0;
        } else {
            this.beta = this.#bound(this.beta, 0.00001, 10);
        }

        if(isNaN(this.rho)) {
            this.rho = 0.075;
        } else {
            this.rho = this.#bound(this.rho, 0.00001, 10);
        }

        this.#updateEntryFields();

    }
    

}