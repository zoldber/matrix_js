window.onload = initGraph;

let cnv = null;

let graph = null;

let nodeCounter = null;

function initGraph() {

    console.log("initializing...");

    cnv = document.getElementById("nodeGraphCanvas");
    cnv.height = 512;
    cnv.width = 512;

    // generate with canvas reference instead of derived 2d context for now
    graph = new NodeGraph(cnv);

    nodeCounter = document.getElementById("nodeCounter");

    var nodeRstButton = document.getElementById("nodeRstButton");

    var nodeGenButton = document.getElementById("nodeGenButton");

    var evalACOButton = document.getElementById("evalACOButton");


    if (nodeGenButton) {

        nodeRstButton.addEventListener("click", resetGraph);

        nodeGenButton.addEventListener("click", addNode);



    }

}

function addNode() {

    if (graph.nodes.length < 10) {

        graph.genNewRandom();

        graph.updateDisp();

        nodeCounter.innerHTML = "Nodes: " + graph.nodes.length;

    }

}

function resetGraph() {

    while(graph.nodes.length > 0) graph.nodes.pop();

    // refreshes canvas
    cnv.height = 512;
    cnv.width = 512;

    nodeCounter.innerHTML = "Nodes: " + graph.nodes.length;

}

