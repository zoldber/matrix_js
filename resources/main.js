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


    if (nodeRstButton && nodeGenButton && evalACOButton) {
        
        nodeRstButton.addEventListener("click", resetGraph);
        nodeGenButton.addEventListener("click", addNode);
        evalACOButton.addEventListener("click", simulate);

    } else {

        console.log("Missing expected config button(s)");

        return;

    }

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



    model.evaluate(0, 0, 0, 3, 3);

}

