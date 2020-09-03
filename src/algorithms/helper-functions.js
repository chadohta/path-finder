export function getAllNodes(grid) {
    const nodes = [];
    for (const row of grid) {
        for (const node of row) {
            nodes.push(node);
        }
    }
    return nodes;
}

export function getNeighbors(node, grid) {
    const neighbors = [];
    const { col, row } = node;
    if (col > 0) neighbors.push(grid[row][col - 1]); // left one
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]); // down one
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]); // right one
    if (row > 0) neighbors.push(grid[row - 1][col]); // up one
    return neighbors.filter(neighbor => !neighbor.isWall); // filter out walls
    // return neighbors.filter(neighbor => !neighbor.isVisited); // make sure the nodes haven't already been visited
}

// backtracks from the finishNode to construct the path that was found
export function getNodesInPathOrder(finishNode) {
    const nodesInPathOrder = [];
    let currentNode = finishNode;
    while (currentNode !== null) {
        nodesInPathOrder.unshift(currentNode);
        currentNode = currentNode.previousNode;
    }
    return nodesInPathOrder;
}

export function getManhattanDistance(nodeA, nodeB) {
    const dx = Math.abs(nodeA.col - nodeB.col);
    const dy = Math.abs(nodeA.row - nodeB.row);
    return (dx + dy);
}