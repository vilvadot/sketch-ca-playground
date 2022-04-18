import { STATES } from './Cell.js'

export class GameOfLifeRules {
    apply(cell, neighbourhood) {
        const aliveCells = neighbourhood.aliveCount()

        if (cell.isDead() && aliveCells == 3) return STATES.ALIVE
        if (cell.isAlive() && aliveCells == 2) return STATES.ALIVE
        if (cell.isAlive() && aliveCells == 3) return STATES.ALIVE

        return STATES.DEAD
    }
}

export class CustomRules {
    apply(cell, neighbourhood) {
        const aliveCells = neighbourhood.aliveCount()

        if (cell.isDead() && aliveCells == 3) return STATES.ALIVE
        if (cell.isAlive() && aliveCells == 2) return STATES.ALIVE
        if (cell.isAlive() && aliveCells == 3) return STATES.ALIVE

        if(aliveCells) return STATES.WARM;

        return STATES.DEAD
    }
}