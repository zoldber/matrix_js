window.onload = initGraph;

let cnv = null;

let graph = null;

let nodeCounter = null;

function initGraph() {

    console.log("initializing...");

    cnv = document.getElementById("nodeGraphCanvas");
    cnv.height = 512;
    cnv.width = 512;

    // args are canvas ref, maxNodes
    graph = new NodeGraph(cnv, 10);

    nodeCounter = document.getElementById("nodeCounter");

    var nodeRstButton = document.getElementById("nodeRstButton");

    var nodeGenButton = document.getElementById("nodeGenButton");

    var evalACOButton = document.getElementById("evalACOButton");


    if (nodeGenButton) {

        nodeRstButton.addEventListener("click", resetGraph);

        nodeGenButton.addEventListener("click", addNode);

        evalACOButton.addEventListener("click", simulate);

    }

}

function addNode() {

    if (graph.nodes.length < graph.maxNodes) {

        graph.genNewRandomized();

        graph.updateDisp();

        nodeCounter.innerHTML = "Nodes: " + graph.nodes.length;

    }

}

function resetGraph() {

    while(graph.nodes.length > 0) graph.nodes.pop();

    while(graph.distMatrix.length > 0) graph.distMatrix.pop();

    // refreshes canvas
    cnv.height = 512;
    cnv.width = 512;

    nodeCounter.innerHTML = "Nodes: " + graph.nodes.length;

}

function simulate() {

    graph.fillDistMatrix();

    graph.executeACO(1, 1, 0.1, 50, 5);

}

