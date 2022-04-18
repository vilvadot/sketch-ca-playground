export class Graph {
    EMPTY_CONNECTIONS = new Set();

    constructor() {
        this.nodes = [];
        this.connectionIndex = {};
    }

    get size() {
        return this.nodes.length;
    }

    addNode(node) {
        this.nodes.push(node);
    }

    getNode(id) {
        return this.nodes.find((node) => node.id === id);
    }

    connect(parentId, childId) {
        const currentConnections = this.getConnections(parentId);
        if (!currentConnections.length)
            this._initializeConnections(parentId);

        const child = this.getNode(childId);
        if (!child) return;

        this.connectionIndex[parentId].add(child);
    }

    getConnections(nodeId) {
        const connections = this.connectionIndex[nodeId] || this.EMPTY_CONNECTIONS;
        return [...connections]
    }

    render() {
        let result = ``;
        for (const [nodeId, connections] of Object.entries(this.connectionIndex)) {
            result += `${nodeId} -> ${this._serialize(connections)}\n`;
        }
        return result;
    }

    _initializeConnections(node) {
        this.connectionIndex[node] = new Set();
    }

    _serialize(connections) {
        return [...connections].map((node) => node.id).toString();
    }
}

export class Neighbourhood {
  constructor(cells) {
    this.cells = cells
  }

  aliveCount() {
    return this.cells.reduce((acc, cell) => {
      if (cell.isAlive()) acc++
      return acc
    }, 0)
  }
}