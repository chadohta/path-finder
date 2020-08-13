export function greedySearch(grid, startNode, finishNode) {
    const visitedNodesInOrder = [];
    const unvisitedNodes = getAllNodes(grid);

    startNode.distance = getManhattanDistance(startNode, finishNode);

    while (unvisitedNodes.length > 0) {
        // sort nodes by distance, closest to front of array
        unvisitedNodes.sort((a, b) => a.distance - b.distance);
        const closestNode = unvisitedNodes.shift();

        // skip node if it's a wall
        if (closestNode.isWall) continue;
        // if trapped by walls exit/return
        if (closestNode.distance === Infinity) return visitedNodesInOrder;

        closestNode.isVisited = true;
        visitedNodesInOrder.push(closestNode);
        if (closestNode === finishNode) return visitedNodesInOrder;
        updateUnvisitedNeighbors(closestNode, grid, finishNode);
    }
}

function getAllNodes(grid) {
    const nodes = [];
    for (const row of grid) {
        for (const node of row) {
            nodes.push(node);
        }
    }
    return nodes;
}

function getManhattanDistance(currentNode, finishNode) { 
    const dx = Math.abs(currentNode.col - finishNode.col);
    const dy = Math.abs(currentNode.row - finishNode.row);
    return (dx + dy);
}

function updateUnvisitedNeighbors(node, grid, finishNode) {    
    const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
    for (const neighbor of unvisitedNeighbors) {
        neighbor.distance = getManhattanDistance(neighbor, finishNode);
        neighbor.previousNode = node;
    }
}

export function getUnvisitedNeighbors(node, grid) {
    const neighbors = [];
    const { col, row } = node;
    if (row > 0) neighbors.push(grid[row - 1][col]); //up one
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]); // down one
    if (col > 0) neighbors.push(grid[row][col - 1]); // left one
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]); // right one
    return neighbors.filter(neighbor => !neighbor.isVisited); // make sure the nodes haven't already been visited
}

