export function aStarSearch(grid, startNode, finishNode) {
    const visitedNodesInOrder = [];
    const pQueue = [];

    const gScore = getGScoreForAllNodes(grid);
    gScore[startNode] = 0;
    console.log(gScore);
    
    startNode.distance = 0 + getManhattanDistance(startNode, finishNode);
    pQueue.push(startNode);

    while (pQueue.length > 0) {
        // sort nodes by distance, closest to front of queue
        pQueue.sort((a, b) => a.distance - b.distance);
        const closestNode = pQueue.shift();

        // skip node if it's a wall
        // if (closestNode.isWall) continue;

        // if trapped by walls exit/return
        // if (closestNode.distance === Infinity) return visitedNodesInOrder;

        visitedNodesInOrder.push(closestNode);
        if (closestNode === finishNode) return visitedNodesInOrder;
        updateNeighbors(closestNode, grid, startNode, finishNode, pQueue);
    }
    return visitedNodesInOrder;
}

function getGScoreForAllNodes(grid) {
    const gScore = new Map();
    for (const row of grid) {
        for (const node of row) {
            gScore.set(node, Infinity);
        }
    }
    return gScore;
}

function getManhattanDistance(nodeA, nodeB) {
    const dx = Math.abs(nodeA.col - nodeB.col);
    const dy = Math.abs(nodeA.row - nodeB.row);
    return (dx + dy);
}

function updateNeighbors(node, grid, startNode, finishNode, pQueue) {
    const neighbors = getNeighbors(node, grid);
    for (const neighbor of neighbors) { 
        const temp = (getManhattanDistance(startNode, node) + 1 + getManhattanDistance(neighbor, finishNode));
        if (temp < neighbor.distance) { 
            neighbor.previousNode = node;
            neighbor.distance = temp;
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
    return neighbors.filter(neighbor => !neighbor.isWall);
    // return neighbors; 
}
