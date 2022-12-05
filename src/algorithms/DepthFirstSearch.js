import { getNeighbors } from '../algorithms/helper-functions';

export const dfs = (grid, startNode, finishNode) => {
    const stack = [];
    const visitedNodesInOrder = [];

    stack.push(startNode);

    while (stack.length > 0) {
        const currentNode = stack.pop();

        currentNode.isVisited = true;
        visitedNodesInOrder.push(currentNode);
        if (currentNode === finishNode) return visitedNodesInOrder;

        const neighbors = getNeighbors(currentNode, grid);
        const unvisitedNeighbors = neighbors.filter(neighbor => !neighbor.isVisited);
        for (const neighbor of unvisitedNeighbors) { 
            neighbor.previousNode = currentNode;
            stack.push(neighbor);
        }
    }
    // finish node was not found and therefore we must be trapped by walls
    return visitedNodesInOrder;
}