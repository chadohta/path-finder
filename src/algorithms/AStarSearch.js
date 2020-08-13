export function aStarSearch(grid, startNode, finishNode) {
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

        updateNeighbors(currentNode, grid, startNode, finishNode, pQueue);
    }
    return visitedNodesInOrder; // trapped by walls, no path available
}

function getManhattanDistance(nodeA, nodeB) {
    const dx = Math.abs(nodeA.col - nodeB.col);
    const dy = Math.abs(nodeA.row - nodeB.row);
    return (dx + dy);
}

function updateNeighbors(node, grid, startNode, finishNode, pQueue) {
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

export function getNeighbors(node, grid) {
    const neighbors = [];
    const { col, row } = node;
    if (row > 0) neighbors.push(grid[row - 1][col]); //up one
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]); // down one
    if (col > 0) neighbors.push(grid[row][col - 1]); // left one
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]); // right one
    return neighbors.filter(neighbor => !neighbor.isWall); // filter out walls
}
