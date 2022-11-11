const canvas = document.getElementById("sceneCanvas");

const ctx = canvas.getContext("2d");

const nodeGraph = new NodeGraph(4);

nodeGraph.draw(ctx);