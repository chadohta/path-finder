import { getUnvisitedNeighbors } from './Dijkstras';

export function dfs(grid, startNode, finishNode) {
    let stack = [];
    stack.push(startNode);
    const visitedNodesInOrder = [];

    while (stack.length > 0) {
        let currentNode = stack.pop();

        // skip node if it's a wall
        if (currentNode.isWall) continue;

        currentNode.isVisited = true;
        visitedNodesInOrder.push(currentNode);

        const unvisitedNeighbors = getUnvisitedNeighbors(currentNode, grid);
        for (const neighbor of unvisitedNeighbors) { 
            if (neighbor === finishNode) {
                visitedNodesInOrder.push(neighbor);
                return visitedNodesInOrder;
            } else {
                stack.push(neighbor);
            }
        }
    }
    // finish node was not found and therefore we must be trapped by walls
    return visitedNodesInOrder;
}