window.onload = initSpace;

let cnv = null, plt = null;

let graph = null, chart = null;

let nodeCounter = null;

function initSpace() {

    console.log("initializing...");

    // initialize controls
    nodeCounter = document.getElementById("nodeCounter");

    var nodeGenButton = document.getElementById("nodeGenButton");
    var evalACOButton = document.getElementById("evalACOButton");
    var nodeRstButton = document.getElementById("nodeRstButton");
    var clrPlotButton = document.getElementById("clrPlotButton");
    
    if (nodeRstButton && nodeGenButton && evalACOButton) {

        nodeGenButton.addEventListener("click", addNode);
        evalACOButton.addEventListener("click", simulate);
        nodeRstButton.addEventListener("click", resetGraph);
        clrPlotButton.addEventListener("click", clearPlot);

    } else {

        console.log("Missing expected config button(s)");

        return;

    }

    // initialize graph
    cnv = document.getElementById("nodeGraphCanvas");
    cnv.height = 512;
    cnv.width = 512;

    // args are canvas reference, maxNodes
    graph = new NodeGraph(cnv, 20);

    // initialize graph
    plt = document.getElementById("acoResultPlot");
    plt.height = 128;
    plt.width = 512;

    chart = new Chart(plt);

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

function clearPlot () {

    plt.height = 128;
    plt.width = 512;

}

function simulate() {

    if (graph.nodes.length < 4) {

        console.log("Generate at least 4 nodes before computing");

        return;

    }
    
    const model = new ACOModel(graph);

    model.evaluate(1.0, 1.0, 0.1, 200, 8);

    let optimalPath = model.bestPath;

    let performance = model.perfLog;

    var A, B, i;

    for (i = 0; i < optimalPath.length; i++) {

        A = optimalPath[i].n1;
        B = optimalPath[i].n2;

        A.drawEdge(B, "Aqua", 3);

    }

    for (i = 0; i < optimalPath.length; i++) {
        
        // optimalPath[i].n1.labelNode(i);

        optimalPath[i].n1.drawNode("Orange");

        optimalPath[i].n1.circleNode("Aqua");

    }

    chart.feed(performance);

    chart.display();

}

