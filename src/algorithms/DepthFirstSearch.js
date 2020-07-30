import { getUnvisitedNeighbors } from './Dijkstras';

export function dfs(grid, startNode, finishNode) {
    let stack = [];
    stack.push(startNode);

    const visitedNodesInOrder = [];

    while (stack.length > 0) {
        let currentNode = stack.pop();
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
}