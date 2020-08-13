import { getUnvisitedNeighbors } from './Dijkstras';

export function bfs(grid, startNode, finishNode) {
    let queue = [];
    queue.push(startNode);
    startNode.isVisited = true;

    const visitedNodesInOrder = [];

    while (queue.length > 0) {
        let currentNode = queue.shift();

        // skip node if it's a wall
        if (currentNode.isWall) continue;
        
        visitedNodesInOrder.push(currentNode);
        if (currentNode === finishNode) return visitedNodesInOrder;
        const unvisitedNeighbors = getUnvisitedNeighbors(currentNode, grid);
        for (const neighbor of unvisitedNeighbors) {
            neighbor.isVisited = true;
            neighbor.previousNode = currentNode;
            queue.push(neighbor);
        }
    }
    // finish node was not found and therefore we must be trapped by walls
    return visitedNodesInOrder;
}