import { getAllNodes, getNeighbors, getManhattanDistance } from '../algorithms/helper-functions';

export function greedySearch(grid, startNode, finishNode) {
    const visitedNodesInOrder = [];
    const unvisitedNodes = getAllNodes(grid);

    startNode.distance = getManhattanDistance(startNode, finishNode);

    while (unvisitedNodes.length > 0) {
        // sort nodes by distance, closest to front of array
        unvisitedNodes.sort((a, b) => a.distance - b.distance);
        const closestNode = unvisitedNodes.shift();

        // if trapped by walls exit/return
        if (closestNode.distance === Infinity) return visitedNodesInOrder;

        closestNode.isVisited = true;
        visitedNodesInOrder.push(closestNode);
        if (closestNode === finishNode) return visitedNodesInOrder;
        updateUnvisitedNeighbors(closestNode, grid, finishNode);
    }
}

function updateUnvisitedNeighbors(node, grid, finishNode) {    
    const neighbors = getNeighbors(node, grid);
    const unvisitedNeighbors = neighbors.filter(neighbor => !neighbor.isVisited);
    for (const neighbor of unvisitedNeighbors) {
        neighbor.distance = getManhattanDistance(neighbor, finishNode);
        neighbor.previousNode = node;
    }
}