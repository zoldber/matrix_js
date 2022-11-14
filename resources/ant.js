class Ant {

    // note: pass startIdx instead of computing in constructor
    //       Each start index should be unique, hence this must
    //       be checked in ACO class upon execution
    constructor(startIdx, nodeGraph) {

        // consider a more elegant solution than this
        this.graph = nodeGraph;

        // start index
        this.pos = startIdx;

        // store and update locally
        this.avgDist = this.graph.avgDist;

        // running sum of travel distance
        this.tourDist = 0;

        // list of visited edges, stored in order of tour
        this.tourPath = [this.pos];

        // list of unvisisted nodes, used in tandem with prob. distribution for each choice
        this.choices = [];

        for (var i = 0; i < this.graph.nodes.length; i++) {

            if (i != this.pos) this.choices.push(i);

        }

    }

}