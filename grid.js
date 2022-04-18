import { Graph } from './Graph.js'
import { Cell } from './Cell.js'
import { CANVAS_SIZE, GRID_SIZE, CELL_RADIUS } from './config.js'

export class Grid {
    constructor(size, svg) {
        this.graph = new Graph()
        this.size = size
        this.addNodes(svg)
        this.addEdges()
    }

    addNodes(svg) {
        const SPACING = CANVAS_SIZE / GRID_SIZE

        for (let col = 0; col < this.size; col++) {
            for (let row = 0; row < this.size; row++) {
                const x = col + (SPACING * col)
                const y = row + (SPACING * row)
                const graphic = svg
                    .circle(CELL_RADIUS)
                    .fill('black')
                    .move(x, y)
                    .addClass("vertex")

                const cell = Cell.withRandomState(graphic, this._cellId(col, row), x, y)

                this.graph.addNode(cell)
            }
        }
    }

    addEdges() {
        for (let col = 0; col < this.size; col++) {
            for (let row = 0; row < this.size; row++) {
                const current = this._cellId(col, row)
                this._connect(current, col + 1, row) // right
                this._connect(current, col - 1, row) // left
                this._connect(current, col, row + 1) // bottom
                this._connect(current, col, row - 1) // top
                this._connect(current, col + 1, row + 1) // bottom-right
                this._connect(current, col + 1, row - 1) // top-right 
                this._connect(current, col - 1, row + 1) // bottom-left
                this._connect(current, col - 1, row - 1) // top-left
            }
        }
    }

    _cellId(y, x) {
        const startingIndex = 65
        const letter = String.fromCharCode(y + startingIndex)
        return `${letter}${x}`
    }

    _connect(node, y, x) {
        this.graph.connect(node, this._cellId(y, x))
    }
}