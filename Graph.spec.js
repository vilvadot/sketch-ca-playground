// This test suite comes from the implementation of the Graph I did independently. So you will have to hook it up to a test runner manually. Serves as documentation here.

import { Graph } from './Graph.js'

export class TestNode {
    constructor(id, x = 0, y = 0){
        this.id = id
        this.x = x
        this.y = y
    }
}

describe('Graph', () => {
    it("contains multiple nodes", () => {
        const graph = new Graph()

        graph.addNode(new TestNode("A"))
        graph.addNode(new TestNode("B"))

        expect(graph.size).toEqual(2)
        expect(graph.getNode('A')).toBeDefined()
        expect(graph.getNode('B')).toBeDefined()
    })

    it("connects multiple nodes", () => {
        const graph = new Graph()
        graph.addNode(new TestNode("A"))
        graph.addNode(new TestNode("B"))
        graph.addNode(new TestNode("C"))
        
        graph.connect("A", "B")
        graph.connect("A", "C")

        const connections = graph.getConnections('A')
        const [first, second] = connections
        expect(connections.length).toEqual(2)
        expect(first.id).toEqual("B")
        expect(second.id).toEqual("C")
    })

    it("does not duplicate connections", () => {
        const graph = new Graph()
        graph.addNode(new TestNode("A"))
        graph.addNode(new TestNode("B"))
        graph.addNode(new TestNode("C"))

        graph.connect("A", "B")
        graph.connect("A", "B")

        const connections = graph.getConnections('A')
        const [first] = connections
        expect(connections.length).toEqual(1)
        expect(first.id).toEqual("B")
    })

    it("returns graph in literal notation", () => {
        const graph = new Graph()
        graph.addNode(new TestNode("A"))
        graph.addNode(new TestNode("B"))
        graph.addNode(new TestNode("C"))
        graph.connect("A", "B")
        graph.connect("A", "C")
        graph.connect("C", "B")

        const result = graph.render()

        expect(result).toEqual(`A -> B,C\nC -> B\n`)
    })
})