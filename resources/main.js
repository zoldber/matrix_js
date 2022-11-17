window.onload = initSpace;

let cnv = null, plt = null;

let graph = null;

let nodeCounter = null;

function initSpace() {

    console.log("initializing...");

    // initialize controls
    nodeCounter = document.getElementById("nodeCounter");

    var nodeRstButton = document.getElementById("nodeRstButton");
    var nodeGenButton = document.getElementById("nodeGenButton");
    var evalACOButton = document.getElementById("evalACOButton");
    
    if (nodeRstButton && nodeGenButton && evalACOButton) {

        nodeRstButton.addEventListener("click", resetGraph);
        nodeGenButton.addEventListener("click", addNode);
        evalACOButton.addEventListener("click", simulate);

    } else {

        console.log("Missing expected config button(s)");

        return;

    }

    // initialize graph
    cnv = document.getElementById("nodeGraphCanvas");
    cnv.height = 512;
    cnv.width = 512;

    // args are canvas reference, maxNodes
    graph = new NodeGraph(cnv, 16);

    // initialize graph
    plt = document.getElementById("acoResultPlot");
    plt.height = 128;
    plt.width = 512;



}

function addNode() {

    if (graph.nodes.length < graph.maxNodes) {

        graph.genNewRandomized();

        graph.drawAll();

        nodeCounter.innerHTML = "Nodes: " + graph.nodes.length;

    }

}

function resetGraph() {

    while(graph.nodes.length > 0) graph.nodes.pop();

    graph.clearDisp();

    nodeCounter.innerHTML = "Nodes: " + graph.nodes.length;

}

function simulate() {

    if (graph.nodes.length < 4) {

        console.log("Generate at least 4 nodes before computing");

        return;

    }

    const model = new ACOModel(graph);

    // TODO: change last arg! This is purely for debugging and it (ant count) must be less than node count
    model.evaluate(1.0, 1.0, 0.1, 200, 8);

}

