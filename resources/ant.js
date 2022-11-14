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

}