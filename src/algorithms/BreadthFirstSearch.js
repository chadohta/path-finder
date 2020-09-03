import { getNeighbors } from '../algorithms/helper-functions';

export function bfs(grid, startNode, finishNode) {
    let queue = [];
    queue.push(startNode);
    startNode.isVisited = true;

    const visitedNodesInOrder = [];

    while (queue.length > 0) {
        const currentNode = queue.shift();
        
        visitedNodesInOrder.push(currentNode);
        if (currentNode === finishNode) return visitedNodesInOrder;

        const neighbors = getNeighbors(currentNode, grid);
        const unvisitedNeighbors = neighbors.filter(neighbor => !neighbor.isVisited);
        for (const neighbor of unvisitedNeighbors) {
            neighbor.isVisited = true;
            neighbor.previousNode = currentNode;
            queue.push(neighbor);
        }
    }
    // finish node was not found and therefore we must be trapped by walls
    return visitedNodesInOrder;
}