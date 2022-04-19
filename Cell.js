import { COLORS } from './config.js'
import { CustomRules } from './rules.js'

export const STATES = {
    ALIVE: "ALIVE",
    DEAD: "DEAD",
    WARM: "WARM"
}

export class Cell {
    static withRandomState(graphic, id, x, y) {
        return new Cell(graphic, id, x, y, this._generateRandomState())
    }

    static _generateRandomState() {
        const roll = parseInt(Math.random() * 10)
        return roll > 4 ? STATES.DEAD : STATES.ALIVE
    }

    constructor(graphic, id, x, y, initialState = STATES.DEAD, rules = new CustomRules()) {
        this.id = id
        this.x = x
        this.y = y
        this.state = initialState
        this.nextState = initialState
        this.rules = rules;
        this.graphic = graphic
    }

    evolve(neighbourhood) {
        this.nextState = this.rules.apply(this, neighbourhood)
    }

    update() {
        this.state = this.nextState
        const color = COLORS[this.state]
        this.graphic.fill(color)
        this.graphic.y(this.y + Math.abs((Math.random() * 3)))
        this.graphic.x(this.x + Math.abs((Math.random() * 3)))
    }

    isAlive() {
        return this.state === STATES.ALIVE
    }

    isDead() {
        return this.state === STATES.DEAD || this.state === STATES.WARM
    }
}