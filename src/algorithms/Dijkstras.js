export function dijkstra(grid, startNode, finishNode) {
    const visitedNodesInOrder = [];
    // distance from start to all other nodes = infinity
    // set distance of start vertex from start vertex 0
    startNode.distance = 0;
    const unvisitedNodes = getAllNodes(grid);

    // While vert remain unvisited
    while (unvisitedNodes.length > 0) { 
        // short the nodes by distance
        unvisitedNodes.sort((a, b) => a.distance - b.distance);
        
        // get the first node which would be the closest
        const closestNode = unvisitedNodes.shift();

        closestNode.isVisited = true;
        visitedNodesInOrder.push(closestNode);
        if (closestNode === finishNode) return visitedNodesInOrder;
        updateUnvisitedNeighbors(closestNode, grid);
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

function updateUnvisitedNeighbors(node, grid) {
    const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
    for (const neighbor of unvisitedNeighbors) { // for each unvisited neighbor, set the distance to the current distance from start + 1
        neighbor.distance = node.distance + 1;
        neighbor.previousNode = node; // set the previous node for back tracking
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

// Backtracks from the finishNode to find the shortest path.
// Only works when called *after* the dijkstra method above.
export function getNodesInShortestPathOrder(finishNode) {
    const nodesInShortestPathOrder = [];
    let currentNode = finishNode;
    while (currentNode !== null) {
        nodesInShortestPathOrder.unshift(currentNode);
        currentNode = currentNode.previousNode;
    }
    return nodesInShortestPathOrder;
}