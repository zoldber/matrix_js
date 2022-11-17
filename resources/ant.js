class Ant {

    constructor(nodeGraph) {

        // consider a more elegant solution than this
        this.graph = nodeGraph;

        // start position shouldn't be set in constructor, as it'll be reset multiple times in an epoch
        this.pos = -1;

        // running sum of travel distance
        this.tourDist;

        // list of visited edges, stored in order of tour
        this.tourPath = [];

        // list of unvisisted nodes, used in tandem with prob. distribution for each choice
        this.choices = [];

    }

    initAtNodeIndex(idx) {

        // start at idx
        this.pos = idx;

        // reset tour distance
        this.tourDist = 0;

        // reset tour
        this.tourPath = []; // <- changed after path storage was updated to edges instead of node indices

        // (re)create list of valid choices (i.e. un-visited nodes)
        for (var i = 0; i < this.graph.nodes.length; i++) {

            if (i != idx) this.choices.push(i);

        }

    }

    updateTourPheromones(strength) {

        for (var e = 0; e < this.tourPath.length; e++) {

            let addedPheromone = strength / this.tourDist;

            this.tourPath[e].phero += addedPheromone;

        }

    }

}