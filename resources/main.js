window.onload = initSpace;

window.MIN_NODE_NUM = 5;
window.MAX_NODE_NUM = 32;

let cnv = null, plt = null;

let graph = null, chart = null;

let nodeCounter = null;

let params = null;

function initSpace() {

    console.log("initializing...");

    // initialize controls
    nodeCounter = document.getElementById("nodeCounter");

    document.getElementById("nodeGenButton").addEventListener("click", addNode);
    document.getElementById("evalACOButton").addEventListener("click", simulate);
    document.getElementById("nodeRstButton").addEventListener("click", resetGraph);
    document.getElementById("clrPlotButton").addEventListener("click", resetPlot);

    // initialize graph
    cnv = document.getElementById("nodeGraphCanvas");
    cnv.height = 512;
    cnv.width = 512;

    graph = new NodeGraph(cnv);
    
    // graph should init. with 5 nodes to keep things interesting / eliminate confusion
    for (var i = 0; i < 5; i++) this.addNode();

    // initialize graph
    plt = document.getElementById("acoResultPlot");
    plt.height = 128;
    plt.width = 512;

    chart = new Chart(plt);

    // initialize params
    params = new Params(graph);
    params.update();

}

function addNode() {

    if (graph.nodes.length < graph.maxNodes) {

        graph.clearDisp();

        graph.genNewRandomized();

        graph.drawAll();

        nodeCounter.innerHTML = "Nodes: " + graph.nodes.length;

    }

}

function resetGraph() {

    while(graph.nodes.length > 0) graph.nodes.pop();

    graph.clearDisp();

    for (var i = 0; i < 5; i++) addNode();

    nodeCounter.innerHTML = "Nodes: " + graph.nodes.length;

}

function resetPlot () {

    plt.height = 128;
    plt.width = 512;

}

function simulate() {

    const model = new ACOModel(graph);

    graph.clearDisp();

    params.update();

    model.evaluate(params);

    //model.evaluate(params.alpha, params.beta, params.rho, params.numEpochs, params.numAnts);

    console.log("Completed " + params.numEpochs + " epochs with " + params.numAnts + " ants.");

    let optimalPath = model.bestPath;

    let performance = model.perfLog;

    graph.drawAll();

    optimalPath.forEach(edge => { edge.n1.drawEdge(edge.n2, "MediumAquamarine", 3); });

    optimalPath.forEach(edge => {

        edge.n1.drawNode("Orange");
        
        edge.n1.circleNode("MediumAquamarine");

    });

    chart.feed(performance);

    chart.display();

}

