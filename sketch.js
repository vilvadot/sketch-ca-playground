import { SVG } from "https://cdn.skypack.dev/@svgdotjs/svg.js";
import { Grid } from './grid.js'
import { CANVAS_SIZE, GRID_SIZE, COLORS, FPS } from './config.js'
import { Neighbourhood } from "./Graph.js";

const svg = SVG()
  .addTo("#sketch")
  .size(CANVAS_SIZE, CANVAS_SIZE)
  .viewbox(0, 0, CANVAS_SIZE, CANVAS_SIZE)
svg.node.style.background = COLORS.BACKGROUND
document.querySelector('body').style.background = COLORS.BACKGROUND

const graph = new Grid(GRID_SIZE, svg).graph


function mainLoop() {
  graph.nodes.forEach((node) => {
    const neighbourhood = new Neighbourhood(graph.getConnections(node.id))

    node.evolve(neighbourhood)
  })

  graph.nodes.forEach((node) => {
    node.update()
  })
  setTimeout(() => {
    requestAnimationFrame(mainLoop);
  }, 1000 / FPS);
}

mainLoop()

