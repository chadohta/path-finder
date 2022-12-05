import { getNeighbors, getManhattanDistance } from '../algorithms/helper-functions';

export const aStarSearch = (grid, startNode, finishNode) => {
    const visitedNodesInOrder = [];
    const pQueue = [];
    
    startNode.distance = 0;
    startNode.fScore = getManhattanDistance(startNode, finishNode);
    pQueue.push(startNode);

    while (pQueue.length > 0) {
        // sort nodes by distance, closest to front of queue
        pQueue.sort((a, b) => a.fScore - b.fScore);
        const currentNode = pQueue.shift();

        visitedNodesInOrder.push(currentNode);
        if (currentNode === finishNode) return visitedNodesInOrder;
        updateNeighbors(currentNode, grid, finishNode, pQueue);
    }
    return visitedNodesInOrder; // trapped by walls, no path available
}

const updateNeighbors = (node, grid, finishNode, pQueue) => {
    const neighbors = getNeighbors(node, grid);
    for (const neighbor of neighbors) { 
        const temp = node.distance + 1;
        if (temp < neighbor.distance) { 
            neighbor.previousNode = node;
            neighbor.distance = temp;
            neighbor.fScore = temp + getManhattanDistance(neighbor, finishNode);
            if (!pQueue.includes(neighbor)) {
                pQueue.push(neighbor);
            }
        }
    }
}